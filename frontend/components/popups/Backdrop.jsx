import React, { useEffect, useRef } from "react";
import { css } from "@emotion/core";
import { Portal } from "../portal";

const render = ({ children, onClick, backdropRef }) => (
  <Portal name="backdrop">
    {/* <transition  v-bind="transition" v-on="transitionOn" @after-leave="afterLeave"> */}
    <div ref={backdropRef} className="backdrop" css={styles} onClick={onClick}>
      {children}
    </div>
    {/* </transition> */}
  </Portal>
);

const Backdrop = ({ children, onClick, onEscape }) => {
  /** STATE */
  const backdropRef = useRef(null);

  /** METHODS */

  /** HANDLERS */

  /** EFFECTS */
  useEffect(() => {
    const escapeListener = ev => {
      if (ev.key === "Escape") onEscape();
    };

    const bodyScrollbarWidth = getScrollbarWidth() + "px";

    window.addEventListener("keydown", escapeListener);

    // need to check if there's a body overflow first
    if (bodyIsOverflowing()) {
      document.body.style.setProperty("overflow", "hidden");
      document.body.style.setProperty("padding-right", bodyScrollbarWidth);
      if (backdropRef.current) {
        backdropRef.current.style.setProperty(
          "padding-right",
          bodyScrollbarWidth
        );
      }
    }

    return () => {
      window.removeEventListener("keydown", escapeListener);
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("padding-right");
    };
  }, [onEscape]);

  return render({ children, onClick, backdropRef });
};

const styles = css`
  /* .backdrop  */
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/* https://stackoverflow.com/a/13382873 */
const getScrollbarWidth = () => {
  // Creating invisible container
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll"; // forcing scrollbar to appear
  outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement("div");
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  // Removing temporary elements from the DOM
  outer.parentNode.removeChild(outer);

  return scrollbarWidth;
};

const bodyIsOverflowing = () => {
  const windowHeight = document.documentElement.clientHeight;
  const scrollHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );

  return scrollHeight > windowHeight;
};

export default Backdrop;
