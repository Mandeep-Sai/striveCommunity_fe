import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <Navbar className="nav">
      <Navbar.Brand href="/">
        <img src="https://strive.school/assets/strive_white.png" alt="" />
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link className="active" href="/ ">
          Community
        </Nav.Link>
        <Nav.Link>
          <Link to="/joinCommunity">Join</Link>
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
