import { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { PortalContext } from "./PortalProvider";

const Portal = ({ children, name, order }) => {
  /** STATE */
  const { addTargetRef, removeTargetRef } = useContext(PortalContext);
  const [el, setEl] = useState(null);

  /** METHODS */

  /** HANDLERS */

  /** EFFECTS */
  useEffect(() => {
    let didCancel = false;

    const ref = el => {
      if (!didCancel) {
        setEl(el);
      }
    };
    addTargetRef(name, ref, order);

    return () => {
      removeTargetRef(name, ref);
      didCancel = true;
    };
  }, [name, order, addTargetRef, removeTargetRef]);

  return el ? ReactDOM.createPortal(children, el) : null;
};

export default Portal;
