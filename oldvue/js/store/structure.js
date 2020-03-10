const structure = window.structure;

export default {
  state() {
    return {
      ...structure,
      base_path: structure.base_path,
      resources: structure.resources
    };
  },
  getters: {
    resources(state, getters) {
      return state.resources;
    },
    resourceIndexRoute: state => resource => {
      return {
        path: state.base_path + "/" + resource.path,
        name: resource.name + ".index",
        props: {
          resource
        }
      };
    },
    resourceCreateRoute: state => resource => {
      return {
        path: state.base_path + "/" + resource.path + "/create",
        name: resource.name + ".create",
        props: {
          resource
        }
      };
    },
    resourceEditRoute: state => resource => {
      return {
        path: state.base_path + "/" + resource.path + "/:id/edit",
        name: resource.name + ".edit",
        props: {
          resource
        }
      };
    },

    routes(state, getters) {
      return {
        index: getters.resources.map(resource =>
          getters.resourceIndexRoute(resource)
        ),
        create: getters.resources.map(resource =>
          getters.resourceCreateRoute(resource)
        ),
        edit: getters.resources.map(resource =>
          getters.resourceEditRoute(resource)
        )
      };
    }
  },
  namespaced: true
};
