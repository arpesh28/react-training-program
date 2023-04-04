import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import Joi, { callStack } from "joi-browser";
import { connect } from "react-redux";
import { register } from "../../store/auth";

import { handleSubmit } from "../../utils/validations";

function RegisterModal({ showModal, toggleModal, register, toggleLogin }) {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState(null);

  const schema = {
    name: Joi.string()
      .required()
      .error((errors) => {
        errors.forEach((err) => {
          switch (err?.type) {
            case "any.empty": {
              err.message = "Name is required";
              break;
            }
          }
        });
        return errors;
      }),
    email: Joi.string()
      .email()
      .required()
      .error((errors) => {
        errors.forEach((err) => {
          switch (err?.type) {
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
          switch (err?.type) {
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
    cPassword: Joi.valid(Joi.ref("password")).error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case "any.allowOnly":
            err.message = "Password does not match";
            break;
          default:
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
    register(data, (res) => {
      if (res.status === 200) {
        toggleLogin();
        toggleModal();
      } else {
        console.log("error:", res);
      }
    });
  };
  return (
    <Modal show={showModal} onHide={toggleModal} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {" "}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter your name"
              value={data?.name}
              onChange={onChange}
            />
            {errors?.name && (
              <Form.Text className="text-muted error">{errors?.name}</Form.Text>
            )}
          </Form.Group>
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
          </Form.Group>{" "}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <div className="position-relative">
              <Form.Control
                type={showPass ? "text" : "password"}
                name="cPassword"
                placeholder="Enter Password Again"
                value={data?.cPassword}
                onChange={onChange}
              />
              <FontAwesomeIcon
                icon={showPass ? faEyeSlash : faEye}
                className="position-absolute pass-icon hover"
                onClick={(e) => setShowPass(!showPass)}
              />
            </div>
            {errors?.cPassword && (
              <Form.Text className="text-muted error">
                {errors?.cPassword}
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
          </Button>{" "}
          <div>
            Already have an account?{" "}
            <Button
              variant="link"
              onClick={(e) => {
                toggleLogin(e);
                toggleModal(e);
              }}
            >
              Login
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
    register: (data, callback) => dispatch(register(data, callback)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);
