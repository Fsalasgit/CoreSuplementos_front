import React, { useState } from "react";
import { Navbar as BSNavbar, Container, Nav, Button, Modal, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import Cart from "./Cart";

export default function Navbar() {
  const { cart } = useCart();
  const [showModal, setShowModal] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <BSNavbar bg="dark" variant="dark" expand="lg">
        <Container>
          <BSNavbar.Brand as={Link} to="/" className="displey-flex flex-column">
            <img
              src="/Logo.png"
              alt="Logo"
              height="40"
              className="d-inline-block align-top me-2"
            />
            <span>Core Suplementos</span>
          </BSNavbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/blog">Blog</Nav.Link>
            <Nav.Link as={Link} to="/tienda">Tienda</Nav.Link>
            <Button variant="outline-light" onClick={() => setShowModal(true)}>
              🛒 Carrito <Badge bg="light" text="dark">{totalItems}</Badge>
            </Button>
          </Nav>
        </Container>
      </BSNavbar>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>🛒 Tu Carrito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Cart />
        </Modal.Body>
      </Modal>
    </>
  );
}
