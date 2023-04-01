import React, { useState } from "react";

import { Navbar, Nav, Container } from "react-bootstrap";

//  Components
import RegisterModal from "./onboarding/registerModal";
import LoginModal from "./onboarding/loginModal";

function Header() {
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
  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand href="#home">Eshop</Navbar.Brand>
          <Nav className="me-auto w-100 position-relative">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#features">Products</Nav.Link>
            <div className="position-absolute nav-btn-container">
              <button className="btn btn-primary" onClick={toggleLogin}>
                Login
              </button>
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

export default Header;
