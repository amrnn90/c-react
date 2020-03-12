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
    // exitTransitionDelay={0.05}
  >
    <motion.div
      key="modal"
      className="modal"
      css={styles}
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
    open: {
      opacity: 1,
      translateY: 0,
      transition: { delay: 0.2 }
    },
    close: {
      opacity: 0,
      translateY: -80
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
