import React from "react";
import { css } from "@emotion/core";
import { useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import Backdrop from "./Backdrop";

const render = ({
  isOpen,
  styles,
  variants,
  children,
  onModalClick,
  onBackdropClick,
  onEscape
}) => (
  <Backdrop
    isOpen={isOpen}
    onClick={onBackdropClick}
    onEscape={onEscape}
    animation={{
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: {
        duration: 1
      }
    }}
  >
    <motion.div
      key="modal"
      className="modal"
      css={styles}
      initial={"hide"}
      animate={isOpen ? "show" : "hide"}
      variants={variants}
      onClick={onModalClick}
    >
      {children}
    </motion.div>
  </Backdrop>
);

const Modal = ({ children, isOpen, onHide }) => {
  /** STATE */
  const styles = useMemo(() => _styles(), []);

  const variants = {
    show: {
      translateY: 0
    },
    hide: {
      translateY: -40
    }
  };

  /** METHODS */
  const hideModal = useCallback(() => {
    if (typeof onHide === "function") {
      onHide();
    }
  }, [onHide]);

  /** HANDLERS */
  const onBackdropClick = () => {
    hideModal();
  };

  const onModalClick = ev => {
    ev.stopPropagation();
  };

  const onEscape = () => {
    hideModal();
  };

  /** EFFECTS */

  return render({
    isOpen,
    styles,
    variants,
    children,
    onBackdropClick,
    onModalClick,
    onEscape
  });
};

const _styles = () => css`
  /* .modal */
  min-width: 600px;
  min-height: 300px;
  background: white;
`;

export default Modal;
