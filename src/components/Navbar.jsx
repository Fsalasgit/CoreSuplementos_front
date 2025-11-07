// Navbar.jsx
import React, { useState, useEffect } from "react"; // 👈 sumamos useEffect
import {
  Navbar as BSNavbar,
  Container,
  Nav,
  Button,
  Modal,
  Badge,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import Cart from "./Cart";

export default function Navbar() {
  const { cart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false); // 👈 nuevo estado

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // 👇 Detecta scroll para achicar/agregar sombra
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <BSNavbar
        bg="dark"
        variant="dark"
        expand="lg"
        expanded={expanded}
        fixed="top"                              // 👈 queda fijo
        className={`main-navbar ${scrolled ? "nav-scrolled" : ""}`}  // 👈 clase en scroll
      >
        <Container fluid className="d-flex align-items-center justify-content-between">
          <BSNavbar.Brand
            as={Link}
            to="/"
            className="brand-container d-flex align-items-center gap-2"
          >
            <img src="/Logo.png" alt="Logo Core" className="brand-logo" />
            <span className="brand-text">Core Suplementos</span>
          </BSNavbar.Brand>

          <BSNavbar.Toggle
            aria-controls="navbarResponsive"
            onClick={() => setExpanded(expanded ? false : "expanded")}
          />

          <BSNavbar.Collapse id="navbarResponsive">
            <Nav className="ms-auto d-flex align-items-center gap-3 mt-2 mt-lg-0">
              <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)} className="nav-item-link">
                Inicio
              </Nav.Link>
              <Nav.Link as={Link} to="/blog" onClick={() => setExpanded(false)} className="nav-item-link">
                Blog
              </Nav.Link>
              <Nav.Link as={Link} to="/tienda" onClick={() => setExpanded(false)} className="nav-item-link">
                Tienda
              </Nav.Link>

              <Button
                variant="outline-light"
                onClick={() => { setShowModal(true); setExpanded(false); }}
                className="ms-lg-2"
              >
                🛒 <Badge bg="light" text="dark">{totalItems}</Badge>
              </Button>
            </Nav>
          </BSNavbar.Collapse>
        </Container>
      </BSNavbar>

      {/* 👇 Espaciador para que el contenido no quede debajo del navbar fijo */}
      <div className="navbar-spacer" />

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
