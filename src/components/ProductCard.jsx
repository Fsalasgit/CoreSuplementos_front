import React, { useState, useContext } from "react";
import { Card, Button, Form, Toast } from "react-bootstrap";
import { ToastContext } from "../context/ToastContext";

export default function ProductCard({ product, addToCart }) {
  const { showToast, setShowToast, toastPos, setToastPos } = useContext(ToastContext);
  const [quantity, setQuantity] = useState(1);

  const parsePrice = (raw) => {
    if (!raw) return 0;
    if (typeof raw === "number") return raw;
    const clean = raw.replace(/[^0-9,-]+/g, "").replace(",", ".");
    return Number(clean) || 0;
  };

  const handleAdd = (e) => {
    if (showToast) return; // bloquea cualquier producto mientras toast activo

    const price = parsePrice(product.PRECIO_WEB);
    addToCart(product.ID, quantity, price, product.nom_mayorista, product.IMG);

    setToastPos({ top: e.clientY, left: e.clientX });
    setShowToast(true);

    setTimeout(() => setShowToast(false), 700); // ⏱ duración reducida a 0.7 segundos
  };

  return (
    <>
      <Card className="h-100 shadow-sm">
        <Card.Img
          variant="top"
          src={product.IMG || "https://via.placeholder.com/150"}
          style={{ objectFit: "cover", height: "180px" }}
        />
        <Card.Body>
          <Card.Title>{product.nom_mayorista}</Card.Title>
          <Card.Text>
            <small>{product.CATEGORIA}</small>
            <br />
            <b>{product.PRECIO_WEB}</b>
          </Card.Text>

          <Form.Control
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="mb-2 text-center"
            disabled={showToast}
          />

          <Button
            variant="primary"
            onClick={handleAdd}
            className="w-100"
            disabled={showToast}
          >
            {showToast ? "Procesando..." : "Agregar al carrito"}
          </Button>
        </Card.Body>
      </Card>

      {/* Toast global */}
      {showToast && (
        <div
          style={{
            position: "absolute",
            top: toastPos.top,
            left: toastPos.left,
            zIndex: 9999,
            transform: "translate(-50%, -50%)",
          }}
        >
          <Toast show={showToast} onClose={() => setShowToast(false)}>
            <Toast.Header closeButton={false}>
              <strong className="me-auto">Carrito</strong>
            </Toast.Header>
            <Toast.Body>✅ Producto añadido correctamente</Toast.Body>
          </Toast>
        </div>
      )}
    </>
  );
}
