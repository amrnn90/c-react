import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo
} from "react";
import { css } from "@emotion/core";
import { motion, AnimatePresence } from "framer-motion";
import { Portal } from "../portal";

const render = ({
  isOpen,
  children,
  onClick,
  backdropRef,
  animation,
  onExitComplete
}) => (
  <AnimatePresence onExitComplete={onExitComplete}>
    {isOpen && (
      <Portal name="backdrop">
        <motion.div
          className="backdrop"
          css={styles}
          ref={backdropRef}
          key="backdrop"
          // initial={{ opacity: 0 }}
          // animate={{ opacity: 1 }}
          // exit={{ opacity: 0 }}
          {...animation}
          onClick={onClick}
        >
          {children}
        </motion.div>
      </Portal>
    )}
  </AnimatePresence>
);

const Backdrop = ({ children, isOpen, onClick, onEscape, animation }) => {
  /** STATE */
  const [backdropEl, setBackdropEl] = useState(null);
  const backdropRef = useRef(el => {
    setBackdropEl(el);
  });

  animation = useMemo(
    () =>
      animation || {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 }
      },
    [animation]
  );

  /** METHODS */

  /** HANDLERS */

  const onExitComplete = useCallback(() => {
    document.body.style.removeProperty("overflow");
    document.body.style.removeProperty("padding-right");
    if (backdropEl) {
      backdropEl.style.removeProperty("padding-right");
    }
  }, [backdropEl]);

  /** EFFECTS */

  useEffect(() => {
    const escapeListener = ev => {
      if (ev.key === "Escape") onEscape();
    };

    window.addEventListener("keydown", escapeListener);

    if (isOpen && bodyIsOverflowing()) {
      /** Cleanup happens in onExitComplete AnimatePresence callback */
      const bodyScrollbarWidth = getScrollbarWidth() + "px";

      document.body.style.setProperty("overflow", "hidden");
      document.body.style.setProperty("padding-right", bodyScrollbarWidth);
      if (backdropEl) {
        backdropEl.style.setProperty("padding-right", bodyScrollbarWidth);
      }
    }

    return () => {
      window.removeEventListener("keydown", escapeListener);
    };
  }, [isOpen, backdropEl, onEscape]);

  return render({
    isOpen,
    children,
    onClick,
    backdropRef,
    animation,
    onExitComplete
  });
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
