import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import Joi, { callStack } from "joi-browser";
import { connect } from "react-redux";
import { login } from "store/auth";

import { handleSubmit } from "utils/validations";

function LoginModal({ showModal, toggleModal, login, toggleRegister }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState(null);

  const schema = {
    email: Joi.string()
      .email()
      .required()
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.email": {
              if (!err.context.value) err.message = "Email is required";
              else err.message = "Email is invalid";
              break;
            }
            case "any.empty": {
              err.message = "Email is required";
              break;
            }
          }
        });
        return errors;
      }),
    password: Joi.string()
      .min(6)
      .required()
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "any.empty": {
              err.message = "Password is required";
              break;
            }
            case "string.min": {
              if (!err.context.value) err.message = "Password is required";
              else err.message = "Password must be at least 6 characters long";
              break;
            }
          }
        });
        return errors;
      }),
  };

  const onChange = (event) => {
    const newData = structuredClone(data);
    const newErrors = structuredClone(errors) || {};
    newData[event.target.name] = event.target.value;
    delete newErrors[event.target.name];
    setErrors(newErrors);
    setData(newData);
  };
  const onSubmit = () => {
    login(data, (res) => {
      if (res.status === 200) {
        toggleModal();
      }
    });
  };
  console.log("Login rendered!!");
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
              value={data?.email}
              onChange={onChange}
            />
            {errors?.email && (
              <Form.Text className="text-muted error">
                {errors?.email}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <div className="position-relative">
              <Form.Control
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                value={data?.password}
                onChange={onChange}
              />
              <FontAwesomeIcon
                icon={showPass ? faEyeSlash : faEye}
                className="position-absolute pass-icon hover"
                onClick={(e) => setShowPass(!showPass)}
              />
            </div>
            {errors?.password && (
              <Form.Text className="text-muted error">
                {errors?.password}
              </Form.Text>
            )}
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(data, schema, setErrors, onSubmit);
            }}
          >
            Submit
          </Button>
          <div>
            Don't have an account?{" "}
            <Button
              variant="link"
              onClick={(e) => {
                toggleRegister(e);
                toggleModal(e);
              }}
            >
              Register
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data, callStack) => dispatch(login(data, callStack)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
