import React from "react";
import { useNavigate } from "react-router-dom";

//  Images

function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
    <div className="product-card mt-3 ">
      <img
        src={process.env.REACT_APP_IMAGE_URL + "products/" + product.pImages[0]}
        alt=""
        className="hover"
        onClick={(e) => {
          navigate(`/product/${product._id}`);
        }}
      />
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

export default ProductCard;
