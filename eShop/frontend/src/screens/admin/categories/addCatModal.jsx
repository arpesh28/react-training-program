import React, { useEffect, useState } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { addCategory, loadCategories } from "../../../store/misc";
import Joi from "joi-browser";
import { handleSubmit } from "../../../utils/validations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { Modal, Form, Button } from "react-bootstrap";

function AddCatModal({ showModal, toggleModal, addCategory, loadCategories }) {
  const [data, setData] = useState({
    cName: "",
    cDescription: "",
    cStatus: {},
    cImage: null,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!showModal) {
      clearData();
    }
  }, [showModal]);

  const onChange = (e) => {
    const newData = structuredClone(data);
    const newErrors = structuredClone(errors) ?? {};
    newData[e.target.name] = e.target.value;
    delete newErrors[e.target.name];
    setErrors(newErrors);
    setData(newData);
  };
  const onChangeSelect = (e) => {
    const newErrors = structuredClone(errors) ?? {};
    delete newErrors[e.name];
    setErrors(newErrors);
    setData({ ...data, [e.name]: e.newVal });
  };

  const clearData = () => {
    setData({ cName: "", cDescription: "", cStatus: {}, cImage: null });
    setErrors({});
  };

  const schema = {
    cName: Joi.string()
      .required()
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "any.empty": {
              err.message = "Name is required";
              break;
            }
          }
        });
        return errors;
      }),
    cDescription: Joi.string()
      .required()
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "any.empty": {
              err.message = "Description is required";
              break;
            }
          }
        });
        return errors;
      }),
    cStatus: Joi.object({
      label: Joi.string().allow(""),
      value: Joi.string()
        .required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case "any.required": {
                err.message = "Status is required";
              }
            }
          });
          return errors;
        }),
    }),
    cImage: Joi.object()
      .required()
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "object.base": {
              err.message = "Image is required";
            }
          }
        });
        return errors;
      }),
  };

  const onSubmit = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("cImage", data.cImage);
    formData.append("cName", data.cName);
    formData.append("cDescription", data.cDescription);
    formData.append("cStatus", data.cStatus?.value);
    addCategory(formData, (res) => {
      if (res.status === 200) {
        loadCategories(() => {});
        toggleModal();
      }
      setLoading(false);
    });
  };

  return (
    <Modal show={showModal} onHide={toggleModal} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="cName"
              placeholder="Enter the category name"
              value={data.cName}
              onChange={onChange}
            />
            {errors?.cName && (
              <Form.Text className="text-muted error">
                {errors?.cName}
              </Form.Text>
            )}
          </Form.Group>{" "}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="cDescription"
              as="textarea"
              placeholder="Enter the description"
              value={data.cDescription}
              onChange={onChange}
            />
            {errors?.cDescription && (
              <Form.Text className="text-muted error">
                {errors?.cDescription}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Status</Form.Label>
            <Select
              name="cStatus"
              options={[
                { value: "Active", label: "Active" },
                { value: "Disabled", label: "Disabled" },
              ]}
              classNamePrefix="select"
              onChange={(e) => {
                onChangeSelect({ newVal: e, name: "cStatus" });
              }}
              value={data.cStatus}
              className={errors?.cStatus && "error-select"}
            />
            {errors?.cStatus && (
              <Form.Text className="text-muted error">
                {errors?.cStatus}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="cImage"
              onChange={(e) => {
                const newErrors = structuredClone(errors) ?? {};
                delete newErrors.cImage;
                setErrors(newErrors);
                setData({ ...data, cImage: e.target.files[0] });
              }}
            />
            {errors?.cImage && (
              <Form.Text className="text-muted error">
                {errors?.cImage}
              </Form.Text>
            )}
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(data, schema, setErrors, onSubmit);
            }}
          >
            {loading ? (
              <FontAwesomeIcon className="fa-spin" icon={faSpinner} />
            ) : (
              "Submit"
            )}
          </Button>
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
    addCategory: (data, callback) => dispatch(addCategory(data, callback)),
    loadCategories: (callback) => dispatch(loadCategories(callback)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCatModal);
