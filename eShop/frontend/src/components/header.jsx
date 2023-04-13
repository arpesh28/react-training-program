import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { loadUser } from "../store/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faCartShopping,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

//  Components
import RegisterModal from "./onboarding/registerModal";
import LoginModal from "./onboarding/loginModal";

function Header({ loadUser }) {
  const navigate = useNavigate();

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const toggleLogin = (e) => {
    if (e) e.preventDefault();
    setShowLogin(!showLogin);
  };
  const toggleRegister = (e) => {
    if (e) e.preventDefault();
    setShowRegister(!showRegister);
  };
  useEffect(() => {
    if (localStorage.getItem("x-auth-token") && localStorage.getItem("user")) {
      const params = {
        uId: JSON.parse(localStorage.getItem("user"))?._id,
      };
      loadUser(params, () => {});
    }
  }, []);
  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand href="/">Eshop</Navbar.Brand>
          <Nav className="me-auto w-100 position-relative">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#features">Products</Nav.Link>
            <div className="d-flex align-items-center position-absolute nav-btn-container">
              <FontAwesomeIcon
                className="heart-header hover "
                icon={faHeart}
                onClick={(e) => navigate("/wish-list")}
              />{" "}
              <FontAwesomeIcon
                className="heart-header hover mx-5"
                icon={faShoppingCart}
                onClick={(e) => navigate("/cart")}
              />
              {!localStorage.getItem("x-auth-token") && (
                <button className="btn btn-primary" onClick={toggleLogin}>
                  Login
                </button>
              )}
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  Admin Panel
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/user-details">User</Dropdown.Item>
                  <Dropdown.Item href="/products">Products</Dropdown.Item>
                  <Dropdown.Item href="/categories">Categories</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Orders</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Nav>
        </Container>
      </Navbar>
      <LoginModal
        showModal={showLogin}
        toggleModal={toggleLogin}
        toggleRegister={toggleRegister}
      />
      <RegisterModal
        showModal={showRegister}
        toggleModal={toggleRegister}
        toggleLogin={toggleLogin}
      />
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadUser: (params, callback) => dispatch(loadUser(params, callback)),
  };
};

export default connect(null, mapDispatchToProps)(Header);
