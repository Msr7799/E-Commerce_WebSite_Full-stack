import React from "react";
import { Modal } from "react-bootstrap";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const ImageModal = ({ imgSrc, show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body>
        <TransformWrapper>
          <TransformComponent>
            <img src={imgSrc} alt="Full Size"  style={{ width: "150%" , height: "100% " }}  />
          </TransformComponent>
        </TransformWrapper>
      </Modal.Body>
    </Modal>
  );
};

export default ImageModal;