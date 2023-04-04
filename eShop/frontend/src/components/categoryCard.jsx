import React from "react";

//  Images
import catImage from "../include/images/category.jpeg";

function CategoryCard({ category, filterProductByCategory }) {
  return (
    <div
      className="category-card mx-3 hover"
      onClick={() => {
        filterProductByCategory(category._id);
      }}
    >
      <img
        src={process.env.REACT_APP_IMAGE_URL + "categories/" + category.cImage}
      />
      <h4 className="mt-2">{category.cName}</h4>
    </div>
  );
}

export default CategoryCard;
