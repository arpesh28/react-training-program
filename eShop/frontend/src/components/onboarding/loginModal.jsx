import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

function LoginModal({ showModal, toggleModal }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);

  const onChange = (event) => {
    const newData = structuredClone(data);
    newData[event.target.name] = event.target.value;
    setData(newData);
  };
  console.log("data:", data);
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
              value={data.email}
              onChange={onChange}
            />
            {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <div className="position-relative">
              <Form.Control
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                value={data.password}
                onChange={onChange}
              />
              <FontAwesomeIcon
                icon={showPass ? faEyeSlash : faEye}
                className="position-absolute pass-icon hover"
                onClick={(e) => setShowPass(!showPass)}
              />
            </div>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
