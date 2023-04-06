import React, { useEffect, useRef, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { connect } from "react-redux";
import { loadProducts, deleteProduct } from "store/products";

//  Components
import { Button, Card } from "react-bootstrap";
import Header from "components/header";
import AddProductModal from "./addProductModal";
import Alert from "components/alert";

function ProductListing({ loadProducts, getProducts, deleteProduct }) {
  const loadingRef = useRef(null);

  //  States
  const [deleteId, setDeleteId] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    loadProducts(() => {});
  }, []);

  useEffect(() => {
    if (editData) {
      toggleAddModal();
    }
  }, editData);

  useEffect(() => {
    if (getProducts.loading) {
      loadingRef.current.continuousStart();
    } else {
      loadingRef.current.complete();
    }
  }, [getProducts.loading]);

  const toggleAddModal = (e) => {
    if (e) e.preventDefault();
    setShowAddModal(!showAddModal);
  };

  const toggleDeleteModal = (e) => {
    if (e) e.preventDefault();
    setDeleteModal(!showDeleteModal);
  };

  const handleDelete = (e) => {
    if (e) e.preventDefault();
    setLoadingDelete(true);
    deleteProduct({ pId: deleteId }, (res) => {
      setLoadingDelete(false);
      if (res.status === 200) {
        toggleDeleteModal();
        loadProducts(() => {});
      }
    });
  };

  return (
    <>
      <div className="container">
        <LoadingBar color="#f11946" height={8} ref={loadingRef} />
        <Header />
        <div className="d-flex align-items-center">
          <h3 className="my-5">Products</h3>
          <div style={{ maxHeight: 30 }}>
            <Button variant="primary" onClick={toggleAddModal}>
              Add Product
            </Button>
          </div>
        </div>
        <div className="row">
          {getProducts?.productList?.map((product, index) => (
            <>
              <Card className="col-3 mx-3 my-5">
                <Card.Img
                  variant="top"
                  src={
                    process.env.REACT_APP_IMAGE_URL +
                    "products/" +
                    product.pImages[0]
                  }
                />
                <Card.Body>
                  <Card.Title>{product.pName}</Card.Title>
                  <Card.Text>{product.pDescription}</Card.Text>
                </Card.Body>{" "}
                <Card.Footer>
                  <Button
                    variant="primary"
                    className="mx-2"
                    onClick={(e) => {
                      e.preventDefault();
                      setEditData(product);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={(e) => {
                      setDeleteId(product._id);
                      toggleDeleteModal(e);
                    }}
                  >
                    Delete
                  </Button>
                </Card.Footer>
              </Card>
            </>
          ))}
        </div>
      </div>
      <AddProductModal
        showModal={showAddModal}
        toggleModal={toggleAddModal}
        loadProducts={loadProducts}
        editData={editData}
      />
      <Alert
        toggleModal={toggleDeleteModal}
        showModal={showDeleteModal}
        message="Are you sure you want to delete this product?"
        confirmButtonName="Delete"
        handleSubmit={handleDelete}
        loading={loadingDelete}
      />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    getProducts: state.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadProducts: (callback) => dispatch(loadProducts(callback)),
    deleteProduct: (data, callback) => dispatch(deleteProduct(data, callback)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductListing);
