import React from "react";

import { Modal, Form, Button } from "react-bootstrap";

function AddCatModal({ showModal, toggleModal }) {
  return (
    <Modal show={showModal} onHide={toggleModal} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              //   value={data?.email}
              //   onChange={onChange}
            />
            {/* {errors?.email && (
              <Form.Text className="text-muted error">
                {errors?.email}
              </Form.Text>
            )} */}
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            // onClick={(e) => {
            //   e.preventDefault();
            //   handleSubmit(data, schema, setErrors, onSubmit);
            // }}
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddCatModal;
