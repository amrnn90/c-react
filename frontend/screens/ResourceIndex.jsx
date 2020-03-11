import React, { useState, useCallback } from "react";
import Modal from "../components/popups/Modal";

const render = ({ showModal, onHideModal, onButtonClick }) => (
  <div>
    <h2>Template for ResourceIndex</h2>
    <Modal isOpen={showModal} onHide={onHideModal}>
      <div>Welcome to modal</div>
    </Modal>
    <button onClick={onButtonClick}>show modal</button>
  </div>
);

const ResourceIndex = () => {
  /** STATE */
  const [showModal, setShowModal] = useState(false);

  /** METHODS */

  /** HANDLERS */
  const onHideModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const onButtonClick = useCallback(() => {
    setShowModal(true);
  }, []);

  /** EFFECTS */

  return render({ showModal, onHideModal, onButtonClick });
};

export default ResourceIndex;
