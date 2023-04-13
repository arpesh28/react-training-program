import React, { useEffect } from "react";

import { loadMyCart, deleteCartProduct } from "store/misc";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

//  Components
import Header from "components/header";

function Cart({ getMisc, loadMyCart, deleteCartProduct }) {
  useEffect(() => {
    loadMyCart(
      { uId: JSON.parse(localStorage.getItem("user"))._id },
      (res) => {}
    );
  }, []);
  const handleDelete = (cId) => {
    deleteCartProduct({ cId }, (res) => {
      if (res.status == 200) {
        loadMyCart(
          { uId: JSON.parse(localStorage.getItem("user"))._id },
          (res) => {}
        );
      }
    });
  };
  return (
    <div className="container">
      <Header />
      <h3>My Cart</h3>
      {getMisc.cart?.map((item, index) => (
        <div className="wishlist-item my-1 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img
              className="prod-image"
              src={
                process.env.REACT_APP_IMAGE_URL +
                "products/" +
                item?.product?.pImages[0]
              }
              alt=""
            />
            <div className="prod-content mx-5">
              <h5>{item?.product?.pName}</h5>
              <span>${item?.product?.pPrice}</span>
              <br />
              <span>{item?.pQuantity}</span>
            </div>
          </div>{" "}
          <div>
            <FontAwesomeIcon
              className="hover mx-5"
              icon={faTrash}
              onClick={(e) => {
                handleDelete(item._id);
              }}
            />{" "}
          </div>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    getMisc: state.misc,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadMyCart: (params, callback) => dispatch(loadMyCart(params, callback)),
    deleteCartProduct: (data, callback) =>
      dispatch(deleteCartProduct(data, callback)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
