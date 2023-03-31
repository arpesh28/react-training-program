import React, { useState } from "react";

import { Navbar, Nav, Container } from "react-bootstrap";

//  Components
import LoginModal from "./onboarding/loginModal";

function Header() {
  const [showLogin, setShowLogin] = useState(false);

  const toggleLogin = (e) => {
    if (e) e.preventDefault();
    setShowLogin(!showLogin);
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
      <LoginModal showModal={showLogin} toggleModal={toggleLogin} />
    </>
  );
}

export default Header;
