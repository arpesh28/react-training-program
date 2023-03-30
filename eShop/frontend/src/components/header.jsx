import React from "react";

import { Navbar, Nav, Container } from "react-bootstrap";

function Header() {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="#home">Eshop</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Products</Nav.Link>
          {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
