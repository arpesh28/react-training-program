import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadWishlist, removeWishlist } from "store/misc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import { addToCart } from "store/misc";

//  Components
import Header from "components/header";

function Wishlist({ loadWishlist, getMisc, removeWishlist, addToCart }) {
  useEffect(() => {
    getWishlist();
  }, []);

  const getWishlist = () => {
    const params = {
      uId: JSON.parse(localStorage.getItem("user"))._id,
    };
    loadWishlist(params, (res) => {});
  };

  const handleDelete = (id) => {
    removeWishlist({ wId: id }, (res) => {
      if (res.status === 200) {
        getWishlist();
      }
    });
  };

  return (
    <div className="container">
      <Header />
      <h3>My Wishlist</h3>
      {getMisc.wishlist?.map((item, index) => (
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
            </div>
          </div>
          <div>
            <FontAwesomeIcon
              className="hover mx-5"
              icon={faTrash}
              onClick={(e) => {
                handleDelete(item._id);
              }}
            />{" "}
            <FontAwesomeIcon
              className="mx-4 hover"
              icon={faShoppingCart}
              onClick={(e) => {
                const payLoad = {
                  uId: JSON.parse(localStorage.getItem("user"))._id,
                  pId: item?.product?._id,
                  pQuantity: 1,
                };
                addToCart(payLoad, (res) => {
                  if (res.status == 200) {
                    toast.success("Product added to cart");
                  }
                });
              }}
            />
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
    loadWishlist: (params, callback) =>
      dispatch(loadWishlist(params, callback)),
    removeWishlist: (data, callback) =>
      dispatch(removeWishlist(data, callback)),
    addToCart: (data, callback) => dispatch(addToCart(data, callback)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
