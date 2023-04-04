import React, { useEffect } from "react";
import CategoryCard from "./categoryCard";

//  Redux
import { loadCategories } from "../store/misc";
import { loadProductByCategory } from "../store/products";
import { connect } from "react-redux";

function CategoryGrid({ getMisc, loadCategories, loadProductByCategory }) {
  useEffect(() => {
    loadCategories(() => {});
  }, []);

  const filterProductByCategory = (id) => {
    console.log("filter!!");
    loadProductByCategory({ catId: id }, () => {});
  };

  return (
    <div className="d-flex mt-4">
      {getMisc.loading ? (
        <h2>Loading...</h2>
      ) : (
        getMisc.categoryList?.map((cat, index) => (
          <CategoryCard
            key={cat._id}
            category={cat}
            filterProductByCategory={filterProductByCategory}
          />
        ))
      )}
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
    loadCategories: (callback) => dispatch(loadCategories(callback)),
    loadProductByCategory: (params, callback) =>
      dispatch(loadProductByCategory(params, callback)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryGrid);
