import React, { createContext, useMemo } from "react";

const { resources, base_path: basePath } = window.structure;

const routes = {
  index: resources.map(resource => ({
    path: basePath + "/" + resource.path,
    name: resource.name + ".index",
    props: {
      resource
    }
  })),
  create: resources.map(resource => ({
    path: basePath + "/" + resource.path + "/create",
    name: resource.name + ".create",
    props: {
      resource
    }
  })),
  edit: resources.map(resource => ({
    path: basePath + "/" + resource.path + "/:id/edit",
    name: resource.name + ".edit",
    props: {
      resource
    }
  }))
};

const render = ({ children, ctx }) => (
  <StructureContext.Provider value={ctx}>
    {typeof children === "function" ? children(ctx) : children}
  </StructureContext.Provider>
);

const StructureProvider = ({ children }) => {
  /** STATE */

  /** METHODS */

  /** HANDLERS */

  /** EFFECTS */

  /** CONTEXT */
  const ctx = useMemo(
    () => ({
      resources,
      basePath,
      routes
    }),
    []
  );

  return render({ children, ctx });
};

export const StructureContext = createContext({
  resources,
  basePath,
  routes
});

export default StructureProvider;
