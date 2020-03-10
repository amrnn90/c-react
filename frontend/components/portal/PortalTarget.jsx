import React, { useContext } from "react";
import { PortalContext } from "./PortalProvider";

const render = ({ refs }) => (
  <>
    {refs.map((ref, index) => (
      <div ref={ref} key={index} />
    ))}
  </>
);

const PortalTarget = ({ name }) => {
  /** STATE */
  const { getTargetRefs } = useContext(PortalContext);
  const refs = getTargetRefs(name);

  /** METHODS */

  /** HANDLERS */

  /** EFFECTS */

  return render({ refs });
};

export default PortalTarget;
