import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as faHeart2,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

import { addToWishlist, loadWishlist } from "store/misc";
import { connect } from "react-redux";

//  Images

function ProductCard({ product, addToWishlist }) {
  const navigate = useNavigate();
  return (
    <div className="product-card mt-3 ">
      <div className="prod-img-container position-relative">
        <img
          src={
            process.env.REACT_APP_IMAGE_URL + "products/" + product.pImages[0]
          }
          alt=""
          className="hover"
          onClick={(e) => {
            navigate(`/product/${product._id}`);
          }}
        />
        <div className="position-absolute  d-flex align-items-center icons-container">
          <FontAwesomeIcon
            className=" hover"
            icon={faHeart}
            onClick={(e) => {
              const payLoad = {
                uId: JSON.parse(localStorage.getItem("user"))._id,
                pId: product._id,
              };
              addToWishlist(payLoad, (res) => {
                alert("Your product is added to wishlist");
              });
            }}
          />{" "}
          <FontAwesomeIcon className="mx-4 hover" icon={faShoppingCart} />
        </div>
      </div>

      <div className="product-content ">
        <h3
          className="hover"
          onClick={(e) => {
            navigate(`/product/${product._id}`);
          }}
        >
          {product.pName}
        </h3>
        <p>{product.pDescription}</p>
        <h4>
          ${product.pPrice} <span>({product.pOffer}%)</span>{" "}
        </h4>
        <h4>In Stock: {product.pQuantity}</h4>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToWishlist: (data, callback) => dispatch(addToWishlist(data, callback)),
  };
};

export default connect(null, mapDispatchToProps)(ProductCard);
