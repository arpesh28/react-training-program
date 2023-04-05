import React, { useEffect, useRef, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { connect } from "react-redux";
import { loadProducts } from "store/products";

//  Components
import { Button, Card } from "react-bootstrap";
import Header from "components/header";
import AddProductModal from "./addProductModal";

function ProductListing({ loadProducts, getProducts }) {
  const loadingRef = useRef(null);

  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    loadingRef.current.continuousStart();
    loadProducts(() => {
      loadingRef.current.complete();
    });
  }, []);

  const toggleAddModal = (e) => {
    if (e) e.preventDefault();
    setShowAddModal(!showAddModal);
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
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      //   setShowAlert(true);
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
      <AddProductModal showModal={showAddModal} toggleModal={toggleAddModal} />
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductListing);
