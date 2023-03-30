import React, { useEffect } from "react";
import CategoryCard from "./categoryCard";

//  Redux
import { loadCategories } from "../store/misc";
import { connect } from "react-redux";

function CategoryGrid({ getMisc, loadCategories }) {
  useEffect(() => {
    loadCategories(() => {});
  }, []);
  console.log("categoryList:", getMisc.categoryList);
  return (
    <div className="d-flex mt-4">
      {getMisc.categoryList?.map((cat, index) => (
        <CategoryCard key={cat._id} category={cat} />
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
    loadCategories: (callback) => dispatch(loadCategories(callback)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryGrid);
