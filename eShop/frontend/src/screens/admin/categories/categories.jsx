import React, { useRef, useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { connect } from "react-redux";
import { loadCategories, deleteCategory } from "../../../store/misc";

import Header from "../../../components/header";
import { Button, Card } from "react-bootstrap";
import AddCatModal from "./addCatModal";

import Alert from "../../../components/alert";

function Categories({ loadCategories, getMisc, deleteCategory }) {
  const loadingRef = useRef(null);

  const [showAddCatModal, setShowAddCatModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    loadCategories(() => {});
  }, []);

  const toggleAddCategory = (e) => {
    if (e) e.preventDefault();
    setShowAddCatModal(!showAddCatModal);
  };

  const handleDelete = (e) => {
    setLoading(true);
    deleteCategory({ cId: deleteId }, (res) => {
      if (res.status === 200) {
        setShowAlert(false);
        loadCategories(() => {});
      }
      setLoading(false);
    });
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
            <>
              <Card className="col-3 mx-3 my-5">
                <Card.Img
                  variant="top"
                  src={
                    process.env.REACT_APP_IMAGE_URL + "categories/" + cat.cImage
                  }
                />
                <Card.Body>
                  <Card.Title>{cat.cName}</Card.Title>
                  <Card.Text>{cat.cDescription}</Card.Text>
                </Card.Body>{" "}
                <Card.Footer>
                  <Button variant="primary" className="mx-2">
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setDeleteId(cat._id);
                      setShowAlert(true);
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
      <Alert
        showModal={showAlert}
        toggleModal={() => {
          setShowAlert(!showAlert);
        }}
        message="Are you sure you want to delete this category?"
        confirmButtonName="Delete"
        handleSubmit={handleDelete}
        loading={loading}
      />
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
    deleteCategory: (data, callback) =>
      dispatch(deleteCategory(data, callback)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Categories);
