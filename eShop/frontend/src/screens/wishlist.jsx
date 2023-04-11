import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadWishlist, removeWishlist } from "store/misc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

//  Components
import Header from "components/header";

function Wishlist({ loadWishlist, getMisc, removeWishlist }) {
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
        <div className="wishlist-item">
          <div>
            <img src="" alt="" />
            <div className="prod-content">
              <h5>{item.pId}</h5>
              <span>$24</span>
            </div>
          </div>
          <FontAwesomeIcon
            className="hover"
            icon={faTrash}
            onClick={(e) => {
              handleDelete(item._id);
            }}
          />{" "}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
