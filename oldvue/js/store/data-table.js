import paginationModule from '@/store/pagination';

export default (url) => {
  return {
    state() {
      return {
        selectedRowsIds: [],
      }
    },
    getters: {
      selectedRowsIds(state) {
        return state.selectedRowsIds;
      },
      selectedRows(state, getters) {
        return getters.items.filter(item => state.selectedRowsIds.find(id => id == item.id));
      },
      isSelectedRow: (state) => (rowId) => {
        return !!state.selectedRowsIds.find(id => id == rowId);
      },
      selectedRowIndex: (state) => (rowId) => {
        return state.selectedRowsIds.findIndex(id => id == rowId);
      },
      allRowsAreSelected(state, getters) {
        const ids = getters.items.map(item => item.id);
        for (let rowId of ids) {
          if (!getters.isSelectedRow(rowId)) {
            return false;
          }
        }
        return ids.length > 0 ? true : false;
      }
    },
    mutations: {
      SET_SELECTED_ROWS(state, rowIds) {
        state.selectedRowsIds = rowIds;
      },
      SELECT_ALL_ROWS(state) {
        const ids = state.page.pageData.data.map(item => item.id);
        state.selectedRowsIds = ids;
      },
      UNSELECT_ALL_ROWS(state) {
        state.selectedRowsIds = [];
      },
    },
    actions: {
      selectRow({ state, commit, getters }, rowId) {
        if (!!getters.isSelectedRow(rowId)) return;

        return commit('SET_SELECTED_ROWS', [
          ...state.selectedRowsIds,
          rowId
        ]);
      },
      unselectRow({ state, commit, getters }, rowId) {
        const index = getters.selectedRowIndex(rowId);
        if (index < 0) return;

        return commit('SET_SELECTED_ROWS', [
          ...state.selectedRowsIds.slice(0, index),
          ...state.selectedRowsIds.slice(index + 1),
        ]);
      },
      toggleSelectRow({state, dispatch, getters}, rowId) {
        if (getters.isSelectedRow(rowId)) {
          return dispatch('unselectRow', rowId);
        }
        return dispatch('selectRow', rowId);
      },
      selectAllRows(context) {
        return context.commit('SELECT_ALL_ROWS');
      },
      unselectAllRows(context) {
        return context.commit('UNSELECT_ALL_ROWS');
      },
      toggleSelectAllRows({getters, dispatch}) {
        if (getters.allRowsAreSelected) {
          return dispatch('unselectAllRows');
        }
        return dispatch('selectAllRows');
      },
    },
    modules: {
      page: paginationModule(url, {
        syncFiltersWithRouteParams: true,
        routeParamsPrefix: "table",
        filters: { search: null, per_page: 3 },
        namespaced: false,
      }),
    },
    namespaced: true
  }
}