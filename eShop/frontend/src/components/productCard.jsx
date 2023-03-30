import React from "react";

//  Images
import productImage from "../include/images/product.jpg";

function ProductCard({ product }) {
  return (
    <div className="product-card mt-3 ">
      <img
        src={process.env.REACT_APP_IMAGE_URL + "products/" + product.pImages[0]}
        alt=""
      />
      <div className="product-content ">
        <h3>{product.pName}</h3>
        <p>{product.pDescription}</p>
        <h4>
          ${product.pPrice} <span>({product.pOffer}%)</span>{" "}
        </h4>
        <h4>In Stock: {product.pQuantity}</h4>
      </div>
    </div>
  );
}

export default ProductCard;
