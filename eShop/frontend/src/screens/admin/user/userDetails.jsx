import React, { useRef } from "react";
import LoadingBar from "react-top-loading-bar";

//  Components
import Header from "../../../components/header";
import { connect } from "react-redux";

function UserDetails({ getUser }) {
  const loadingRef = useRef(null);
  const { userDetails } = getUser;
  return (
    <div className="container">
      <LoadingBar color="#f11946" height={8} ref={loadingRef} />
      <Header />
      <div className="my-5">
        <h4>Name: {userDetails?.name}</h4>
        <h4>Email: {userDetails?.email}</h4>
        <h4>Phone: {userDetails?.phoneNumber}</h4>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    getUser: state.user,
  };
};

export default connect(mapStateToProps, null)(UserDetails);
