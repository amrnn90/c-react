import React from "react";
import { css } from "@emotion/core";
import { useMemo, useCallback } from "react";
import Backdrop from "./Backdrop";

const render = ({
  styles,
  children,
  onModalClick,
  onBackdropClick,
  onEscape
}) => (
  <Backdrop onClick={onBackdropClick} onEscape={onEscape}>
    <div className="modal" css={styles} onClick={onModalClick}>
      {children}
    </div>
  </Backdrop>
);

const Modal = ({ children, onHide }) => {
  /** STATE */
  const styles = useMemo(() => _styles(), []);

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

  return render({ styles, children, onBackdropClick, onModalClick, onEscape });
};

const _styles = () => css`
  /* .modal */
  min-width: 600px;
  min-height: 300px;
  background: white;
`;

export default Modal;
