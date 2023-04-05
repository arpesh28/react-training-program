import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { addProduct } from "store/products";

function AddProductModal({ showModal, toggleModal }) {
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
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const onChangeSelect = (e) => {
    setData({ ...data, [e.name]: e.newVal });
  };
  const onChangeImage = (e) => {
    setData({ ...data, [e.target.name]: e.target.files[0] });
  };
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
            {/* {errors?.cName && (
                <Form.Text className="text-muted error">
                  {errors?.cName}
                </Form.Text>
              )} */}
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
            {/* {errors?.cDescription && (
              <Form.Text className="text-muted error">
                {errors?.cDescription}
              </Form.Text>
            )} */}
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
            {/* {errors?.cStatus && (
              <Form.Text className="text-muted error">
                {errors?.cStatus}
              </Form.Text>
            )} */}
          </Form.Group>{" "}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Category</Form.Label>
            <Select
              name="pCategory"
              options={[
                { value: "Active", label: "Active" },
                { value: "Disabled", label: "Disabled" },
              ]}
              classNamePrefix="select"
              onChange={(e) => {
                onChangeSelect({ newVal: e, name: "pCategory" });
              }}
              //   value={data.cStatus}
              className={errors?.cStatus && "error-select"}
            />
            {/* {errors?.cStatus && (
              <Form.Text className="text-muted error">
                {errors?.cStatus}
              </Form.Text>
            )} */}
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
            {/* {errors?.cDescription && (
              <Form.Text className="text-muted error">
                {errors?.cDescription}
              </Form.Text>
            )} */}
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
            {/* {errors?.cDescription && (
              <Form.Text className="text-muted error">
                {errors?.cDescription}
              </Form.Text>
            )} */}
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
            {/* {errors?.cDescription && (
              <Form.Text className="text-muted error">
                {errors?.cDescription}
              </Form.Text>
            )} */}
          </Form.Group>
          <div className="d-flex justify-space-between">
            {" "}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Image 1</Form.Label>
              <Form.Control
                type="file"
                name="pImage1"
                onChange={onChangeImage}
              />
              {/* {errors?.cImage && (
                  <Form.Text className="text-muted error">
                    {errors?.cImage}
                  </Form.Text>
                )} */}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Image 2</Form.Label>
              <Form.Control
                type="file"
                name="pImage2"
                onChange={onChangeImage}
              />
              {/* {errors?.cImage && (
                  <Form.Text className="text-muted error">
                    {errors?.cImage}
                  </Form.Text>
                )} */}
            </Form.Group>
          </div>
          <Button
            variant="primary"
            type="submit"
            disabled={loading}
            // onClick={(e) => {
            //   e.preventDefault();
            //   handleSubmit(data, schema, setErrors, onSubmit);
            // }}
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

export default AddProductModal;
