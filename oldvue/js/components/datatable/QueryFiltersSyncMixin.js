/* NOT USED AT THE MOMENT, REPLACED WITH VUEX PAGINATION MODULE */

export default {
  data() {
    filters: { }
  },
  computed: {
    activeFilters() {
      return _.omitBy(this.filters, _.isNil);
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        const queryFilters = _.pick(route.query, Object.keys(this.filters));

        const nulledProps = Object.keys(this.filters).filter(f => _.isNil(queryFilters[f]));

        for (let prop of nulledProps) {
          queryFilters[prop] = null;
        }

        if (!_.isEqual(queryFilters, this.activeFilters)) {
          this.filters = {
            ...this.filters,
            ...queryFilters,
          };
        }
      }
    },
    filters: {
      immediate: true,
      handler(filters) {
        const queryFilters = _.pick(this.$route.query, Object.keys(filters));

        if (!_.isEqual(queryFilters, this.activeFilters)) {
          const newQuery = _.omitBy(
            { ...this.$route.query, ...this.filters },
            _.isNil
          );
          this.$router.replace({
            ...this.$route,
            query: newQuery
          });

        }
      }
    }
  },
}