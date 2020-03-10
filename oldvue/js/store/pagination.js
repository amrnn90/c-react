import router from '@/router';
import { axiosOneRequest } from '@/utils';

const defaultOptions = {
  filters: {},
  syncFiltersWithRouteParams: false,
  routeParamsPrefix: null,
  namespaced: true
};

export default (url, opts = {}) => {
  const axiosInstance = axiosOneRequest();
  const options = { ...defaultOptions, ...opts };
  let initialFilters = { ...options.filters, page: null };
  let removeRouteGuard = null;
  let moduleRunning = null;

  return {
    state() {
      return {
        pageData: null,
        isLoading: false,
        error: null,
        filters: {},
        oldFilters: {},

        /* WATCH THIS TO KNOW IF THE LAST LOADED PAGE HAS DIFFERENT FILTERS FROM PREVIOUS ONE */
        isNewPage: null,
      }
    },
    getters: {
      currentPage(state) {
        return _.get(state, 'pageData.current_page', 1);
      },
      lastPage(state) {
        return _.get(state, 'pageData.last_page', 1);
      },
      totalPages(state, getters) {
        return getters.lastPage;
      },
      isFirstPage(state, getters) {
        return getters.currentPage == 1;
      },
      isLastPage(state, getters) {
        return getters.currentPage == getters.lastPage;
      },
      isLoading(state) {
        return state.isLoading;
      },
      error(state) {
        return state.error;
      },
      pageData(state) {
        return _.get(state, 'pageData');
      },
      items(state) {
        return _.get(state, 'pageData.data', []);
      },
      filters(state) {
        return state.filters;
      },
      normalizedFilters(state, getters) {
        const filters = getters.filters;
        function walker(obj) {
          let res = null;
          switch (typeof obj) {
            case 'object':
              if (!obj) {
                res = obj;
              } else {
                res = {};
                for (let key in obj) if (obj.hasOwnProperty(key)) {
                  res[key] = walker(obj[key]);
                }
              }
              break;
            case 'number':
              res = obj.toString();
              break;
            default:
              res = obj;
          }
          return res;
        }
        return walker(filters)
      },
      nonEmptyFilters(state, getters) {

        return _.omitBy(getters.normalizedFilters, _.isEmpty);
      },
      filtersPage(state, getters) {
        return getters.filters.page;
      },
      isNewPage(state, getters) {
        return state.isNewPage;
      }
    },
    mutations: {
      LOAD_PAGE_INIT(state) {
        state.isLoading = true;
        state.isNewPage = null;
        state.error = null;
      },
      LOAD_PAGE_SUCCESS(state, pageData) {
        state.pageData = { ...pageData };
        state.isLoading = false;
        state.error = null;

        if (_.isEqual(state.filters, state.oldFilters)) {
          state.isNewPage = false;
        } else {
          state.isNewPage = true;
        }

        state.oldFilters = { ...state.filters };
      },
      LOAD_PAGE_ERROR(state, error) {
        state.isLoading = false;
        state.error = error;
      },
      UPDATE_FILTERS(state, newFilters) {
        state.oldFilters = { ...state.filters };
        state.filters = { ...newFilters };
      },
    },
    actions: {
      /* DISPATCHED WHEN REGISTERING DYNAMIC MODULE */
      init(context) {
        let filters = initialFilters;
        moduleRunning = true;

        if (options.syncFiltersWithRouteParams) {
          filters = getInitialFiltersFromRouteParams(initialFilters, options.routeParamsPrefix);

          removeRouteGuard = router.afterEach((to, from) => {

            /* GIVE A CHANCE FOR COMPONENTS destroyed() HOOK TO RUN AND UNREGISTER MODULE  */
            setTimeout(() => {   
              if (!moduleRunning) return;        
  
              /* IF NOT EQUAL, THEN WE HAVE A NEW PAGE AND WE SHALL RESET FILTERS AND INITIALIZE THEM FROM ROUTE PARAMS */
              if (!_.isEqual(context.getters.nonEmptyFilters, getFiltersFromQueryParams(context.getters.filters, options.routeParamsPrefix))) {
                filters = getInitialFiltersFromRouteParams(initialFilters, options.routeParamsPrefix);
                context.dispatch('updateFilters', filters);
              }
            });

          });
        }

        context.dispatch('updateFilters', filters);
      },
      /* DISPATCHED WHEN UNREGISTERING DYNAMIC MODULE */
      destroy(context) {
        if (options.syncFiltersWithRouteParams) {
          removeRouteGuard();
        }
        moduleRunning = false;
      },

      load: function ({ commit, dispatch, state, getters }) {
        commit('LOAD_PAGE_INIT');
        return axiosInstance
          .get(url, { params: { ...getters.nonEmptyFilters } })
          .then(({ data }) => {
            /* MODULE COULD BE UNREGISTERED BEFORE PROMISE IS RESOLVED */
            if (!moduleRunning) return;

            commit('LOAD_PAGE_SUCCESS', data);

            if (getters.currentPage > getters.lastPage) {
              return dispatch('updateFilters', { page: getters.lastPage });
            }
          })
          .catch(error => {
            if (!moduleRunning) return;
            if (axios.isCancel(error)) return;
            commit('LOAD_PAGE_ERROR', error);
          });
      },

      refresh({ dispatch, getters }) {
        return dispatch('load');
      },

      updateFilters({ commit, dispatch, state, getters }, filters) {
        const page = parseInt(filters.page);
        const newFilters = {
          ...state.filters,
          ...filters,
          page: page > 0 ? page : null,
        };

        const oldFilters = state.filters;

        if (!_.isEqual(newFilters, oldFilters)) {
          commit('UPDATE_FILTERS', newFilters);

          if (options.syncFiltersWithRouteParams) {
            syncFiltersWithRouteParams(getters.normalizedFilters, options.routeParamsPrefix);
          }
          return dispatch('load');
        }
      },

      clearFilters({ dispatch }) {
        return dispatch('updateFilters', {});
      },
    },
    namespaced: options.namespaced
    ,
  }
}



function applyPrefix(filters, prefix) {
  prefix = prefix ? `${prefix}_` : '';
  const result = {};

  Object.keys(filters).forEach(key => {
    result[prefix + key] = filters[key];
  });

  return result;
}

function removePrefix(filters, prefix) {
  if (!prefix) return filters;

  prefix = `${prefix}_`;
  
  const result = {};

  Object.keys(filters).filter(key => key.startsWith(prefix)).forEach(key => {
    result[key.split(prefix).slice(1).join('')] = filters[key];
  });

  return result;
}

function getFiltersFromQueryParams(filters, prefix) {
  const allQueryParams = router.currentRoute.query;
  const prefixedFilters = applyPrefix(filters, prefix);

  return removePrefix(_.pick(allQueryParams, Object.keys(prefixedFilters)), prefix);
}

function getInitialFiltersFromRouteParams(filters, prefix) {
  const unprefixedQueryParams = getFiltersFromQueryParams(filters, prefix);
  const initialFilters = { ...filters, ...unprefixedQueryParams };

  return initialFilters;
}

function syncFiltersWithRouteParams(filters, prefix) {
  const allQueryParams = router.currentRoute.query;
  const prefixedFilters = applyPrefix(filters, prefix);
  const newQueryParams = _.omitBy({ ...allQueryParams, ...prefixedFilters }, _.isEmpty);

  if (!_.isEqual(newQueryParams, allQueryParams)) {

    router.replace({
      ...router.currenRoute,
      query: newQueryParams
    });

  }
}