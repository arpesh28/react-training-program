import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function Alert({
  showModal,
  toggleModal,
  handleDelete,
  loading,
}) {
  return (
    <Modal className="modal fade" show={showModal} onHide={toggleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Alert!!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this blog?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleDelete} disabled={loading}>
          {loading ? "Loading..." : "Delete"}
        </Button>
        <Button variant="secondary" onClick={toggleModal}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
