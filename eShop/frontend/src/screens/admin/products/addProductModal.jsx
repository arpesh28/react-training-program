import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Joi from "joi-browser";
import { handleSubmit } from "utils/validations";
import { connect } from "react-redux";

import { addProduct, editProduct } from "store/products";
import { loadCategories } from "store/misc";

function AddProductModal({
  showModal,
  toggleModal,
  addProduct,
  loadProducts,
  loadCategories,
  getMisc,
  editProduct,
  editData,
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    pName: "",
    pDescription: "",
    pStatus: {},
    pCategory: {},
    pQuantity: "",
    pPrice: "",
    pOffer: "",
    pImage1: null,
    pImage2: null,
  });
  const [errors, setErrors] = useState({});
  const onChange = (e) => {
    const newErrors = structuredClone(errors);
    delete newErrors[e.target.name];
    setErrors(newErrors);
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const onChangeSelect = (e) => {
    const newErrors = structuredClone(errors);
    delete newErrors[e.name];
    setErrors(newErrors);
    setData({ ...data, [e.name]: e.newVal });
  };
  const onChangeImage = (e) => {
    const newErrors = structuredClone(errors);
    delete newErrors[e.target.name];
    setErrors(newErrors);
    setData({ ...data, [e.target.name]: e.target.files[0] });
  };

  const schema = {
    pName: Joi.string()
      .required()
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "any.empty": {
              err.message = "Name is required";
            }
          }
        });
        return errors;
      }),
    pDescription: Joi.string()
      .required()
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "any.empty": {
              err.message = "Description is required";
            }
          }
        });
        return errors;
      }),
    pStatus: Joi.object({
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
    pCategory: Joi.object({
      label: Joi.string().allow(""),
      value: Joi.string()
        .required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case "any.required": {
                err.message = "Category is required";
              }
            }
          });
          return errors;
        }),
    }),
    pQuantity: Joi.string()
      .required()
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "any.empty": {
              err.message = "Quantity is required";
            }
          }
        });
        return errors;
      }),
    pPrice: Joi.string()
      .required()
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "any.empty": {
              err.message = "Price is required";
            }
          }
        });
        return errors;
      }),
    pOffer: Joi.string()
      .required()
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "any.empty": {
              err.message = "Offer is required";
            }
          }
        });
        return errors;
      }),
    pImage1: Joi.object()
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
    pImage2: Joi.object()
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
    formData.append("pName", data.pName);
    formData.append("pDescription", data.pDescription);
    formData.append("pQuantity", parseInt(data.pQuantity));
    formData.append("pPrice", parseInt(data.pPrice));
    formData.append("pOffer", parseInt(data.pOffer));
    formData.append("pStatus", data.pStatus?.value);
    formData.append("pCategory", data.pCategory?.value);
    if (editData) {
      formData.append("pImages", data.pImage1 + "," + data.pImage2);
      formData.append("pId", editData.pId);
      editProduct(formData, (res) => {
        setLoading(false);
        if (res.status === 200) {
          loadProducts();
          toggleModal();
        }
      });
    } else {
      formData.append("pImage", data.pImage1);
      formData.append("pImage", data.pImage2);
      addProduct(formData, (res) => {
        setLoading(false);
        if (res.status === 200) {
          loadProducts();
          toggleModal();
        }
      });
    }
  };
  useEffect(() => {
    if (showModal) {
      loadCategories(() => {});
    }
  }, [showModal]);
  useEffect(() => {
    if (editData) {
      setData({
        pName: editData.pName,
        pDescription: editData.pDescription,
        pStatus: {
          value: editData.pStatus,
          label: editData.pStatus,
        },
        pCategory: {
          value: editData.pCategory?._id,
          label: editData.pCategory?.cName,
        },
        pQuantity: `${editData.pQuantity}`,
        pPrice: `${editData.pPrice}`,
        pOffer: editData.pOffer,
        pImage1: { imageUrl: editData.pImages[0] },
        pImage2: { imageUrl: editData.pImages[1] },
      });
    }
  }, [editData]);

  return (
    <Modal show={showModal} onHide={toggleModal} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="pName"
              placeholder="Enter the product name"
              value={data.pName}
              onChange={onChange}
            />
            {errors?.pName && (
              <Form.Text className="text-muted error">
                {errors?.pName}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="pDescription"
              as="textarea"
              placeholder="Enter the description"
              value={data.pDescription}
              onChange={onChange}
            />
            {errors?.pDescription && (
              <Form.Text className="text-muted error">
                {errors?.pDescription}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Status</Form.Label>
            <Select
              name="pStatus"
              options={[
                { value: "Active", label: "Active" },
                { value: "Disabled", label: "Disabled" },
              ]}
              classNamePrefix="select"
              onChange={(e) => {
                onChangeSelect({ newVal: e, name: "pStatus" });
              }}
              value={data.pStatus}
              className={errors?.pStatus && "error-select"}
            />
            {errors?.pStatus && (
              <Form.Text className="text-muted error">
                {errors?.pStatus}
              </Form.Text>
            )}
          </Form.Group>{" "}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Category</Form.Label>
            <Select
              name="pCategory"
              options={getMisc?.categoryList?.map((cat) => ({
                value: cat._id,
                label: cat.cName,
              }))}
              classNamePrefix="select"
              onChange={(e) => {
                onChangeSelect({ newVal: e, name: "pCategory" });
              }}
              //   value={data.cStatus}
              className={errors?.pCategory && "error-select"}
            />
            {errors?.pCategory && (
              <Form.Text className="text-muted error">
                {errors?.pCategory}
              </Form.Text>
            )}
          </Form.Group>{" "}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="pQuantity"
              placeholder="Enter the quantity"
              value={data.pQuantity}
              onChange={onChange}
            />
            {errors?.pQuantity && (
              <Form.Text className="text-muted error">
                {errors?.pQuantity}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="pPrice"
              placeholder="Enter the quantity"
              value={data.pPrice}
              onChange={onChange}
            />
            {errors?.pPrice && (
              <Form.Text className="text-muted error">
                {errors?.pPrice}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Offer</Form.Label>
            <Form.Control
              type="number"
              name="pOffer"
              placeholder="Enter the quantity"
              value={data.pOffer}
              onChange={onChange}
            />
            {errors?.pOffer && (
              <Form.Text className="text-muted error">
                {errors?.pOffer}
              </Form.Text>
            )}
          </Form.Group>
          <div className="d-flex justify-space-between">
            {" "}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Image 1</Form.Label>
              {!editData && (
                <Form.Control
                  type="file"
                  name="pImage1"
                  onChange={onChangeImage}
                />
              )}
              {errors?.pImage1 && (
                <Form.Text className="text-muted error">
                  {errors?.pImage1}
                </Form.Text>
              )}
              {data.pImage1 &&
                (editData ? (
                  <img
                    className="add-product-img"
                    src={
                      process.env.REACT_APP_IMAGE_URL +
                      "products/" +
                      data.pImage1.imageUrl
                    }
                    alt=""
                  />
                ) : (
                  <img
                    className="add-product-img"
                    src={URL.createObjectURL(data.pImage1)}
                    alt=""
                  />
                ))}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Image 2</Form.Label>
              {!editData && (
                <Form.Control
                  type="file"
                  name="pImage2"
                  onChange={onChangeImage}
                />
              )}
              {errors?.pImage2 && (
                <Form.Text className="text-muted error">
                  {errors?.pImage2}
                </Form.Text>
              )}
              {data.pImage2 &&
                (editData ? (
                  <img
                    className="add-product-img"
                    src={
                      process.env.REACT_APP_IMAGE_URL +
                      "products/" +
                      data.pImage2.imageUrl
                    }
                    alt=""
                  />
                ) : (
                  <img
                    className="add-product-img"
                    src={URL.createObjectURL(data.pImage2)}
                    alt=""
                  />
                ))}
            </Form.Group>
          </div>
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
  return {
    getMisc: state.misc,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (data, callback) => dispatch(addProduct(data, callback)),
    loadCategories: (callback) => dispatch(loadCategories(callback)),
    editProduct: (data, callback) => dispatch(editProduct(data, callback)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProductModal);
