import React, { useState, useCallback, useEffect } from "react";
import Tippy from "@tippyjs/react";

const render = ({ children, content, setTippyInstance, close, ...rest }) => (
  <Tippy
    content={content}
    className="dropdown"
    placement="bottom"
    animation="fade"
    arrow={false}
    trigger="click"
    interactive={true}
    // Need to ensure it can be tabbed to directly after with no clipping issues
    appendTo="parent"
    onCreate={setTippyInstance}
    {...rest}
  >
    {typeof children === "function" ? children({ close }) : children}
  </Tippy>
);

const Dropdown = ({ children, content }) => {
  /** STATE */
  const [tippyInstance, setTippyInstance] = useState(null);

  /** METHODS */
  const close = useCallback(() => {
    tippyInstance && tippyInstance.hide();
  }, [tippyInstance]);

  /** HANDLERS */

  /** EFFECTS */
  useEffect(() => {
    const escapeHandler = ev => {
      if (ev.key === "Escape") {
        close();
      }
    };
    window.addEventListener("keyup", escapeHandler);
    return () => {
      window.removeEventListener("keyup", escapeHandler);
    };
  }, [close]);

  return render({ children, content, setTippyInstance, close });
};

export default Dropdown;
