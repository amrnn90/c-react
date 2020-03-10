import React, { createContext, useState, useCallback, useMemo } from "react";

const render = ({ children, ctx }) => (
  <PortalContext.Provider value={ctx}>
    {typeof children === "function" ? children(ctx) : children}
  </PortalContext.Provider>
);

export const PortalProvider = ({ children }) => {
  /** STATE */
  const [targetRefs, setTargetRefs] = useState({});

  /** METHODS */
  const getTargetRefs = useCallback(
    name => {
      const refs = targetRefs[name] || {};
      return Object.keys(refs)
        .sort()
        .map(key => refs[key]);
    },
    [targetRefs]
  );

  const addTargetRef = useCallback((name, ref, order) => {
    setTargetRefs(oldTargetRefs => {
      const newTargetRefs = { ...oldTargetRefs };
      newTargetRefs[name] = { ...(oldTargetRefs[name] || {}) };
      order = Number.isInteger(order)
        ? order
        : Object.keys(newTargetRefs[name]).length;
      newTargetRefs[name][order] = ref;

      return newTargetRefs;
    });
  }, []);

  const removeTargetRef = useCallback((name, ref) => {
    setTargetRefs(oldTargetRefs => {
      const newTargetRefs = { ...oldTargetRefs };
      newTargetRefs[name] = { ...newTargetRefs[name] };
      const order = Object.keys(newTargetRefs[name]).find(
        order => newTargetRefs[name][order] === ref
      );
      delete newTargetRefs[name][order];

      return newTargetRefs;
    });
  }, []);

  /** HANDLERS */

  /** EFFECTS */

  /** CTX */
  const ctx = useMemo(
    () => ({
      getTargetRefs,
      addTargetRef,
      removeTargetRef,
    }),
    [getTargetRefs, addTargetRef, removeTargetRef]
  );

  return render({ children, ctx });
};

export const PortalContext = createContext({
  getTargetRefs: () => {},
  addTargetRef: () => {},
  removeTargetRef: () => {},
});

export default PortalProvider;
