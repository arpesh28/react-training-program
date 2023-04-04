import React, { useRef, useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { connect } from "react-redux";
import { loadCategories } from "../../../store/misc";

import Header from "../../../components/header";
import { Button } from "react-bootstrap";
import AddCatModal from "./addCatModal";

function Categories({ loadCategories, getMisc }) {
  const loadingRef = useRef(null);

  const [showAddCatModal, setShowAddCatModal] = useState(false);

  useEffect(() => {
    loadCategories(() => {});
  }, []);

  const toggleAddCategory = (e) => {
    if (e) e.preventDefault();
    setShowAddCatModal(!showAddCatModal);
  };

  return (
    <>
      <div className="container">
        <LoadingBar color="#f11946" height={8} ref={loadingRef} />
        <Header />
        <div className="d-flex align-items-center">
          <h3 className="my-5">Categories</h3>
          <div style={{ maxHeight: 30 }}>
            <Button variant="primary" onClick={toggleAddCategory}>
              Add Category
            </Button>
          </div>
        </div>
        <div className="row">
          {getMisc?.categoryList?.map((cat, index) => (
            <div className="category-card col-2 mx-3  my-5">
              <img
                src={
                  process.env.REACT_APP_IMAGE_URL + "categories/" + cat.cImage
                }
              />
              <h4 className="mt-2">{cat.cName}</h4>
              <p>{cat.cDescription}</p>
              <Button variant="primary" className="mx-2">
                Edit
              </Button>
              <Button variant="danger">Delete</Button>
            </div>
          ))}
        </div>
      </div>

      <AddCatModal
        showModal={showAddCatModal}
        toggleModal={toggleAddCategory}
      />
    </>
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
export default connect(mapStateToProps, mapDispatchToProps)(Categories);
