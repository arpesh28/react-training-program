import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Alert({
  showModal,
  toggleModal,
  message,
  confirmButtonName,
  handleSubmit,
  loading,
}) {
  return (
    <Modal show={showModal} onHide={toggleModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Alert!</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggleModal}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? (
            <FontAwesomeIcon className="fa-spin" icon={faSpinner} />
          ) : (
            confirmButtonName
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
