import React, { useEffect, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { useCart } from "../hooks/useCart";

// 👉 función para formatear moneda estilo argentino
const formatPrice = (value) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  }).format(value || 0);

export default function Cart() {
  const { cart, removeFromCart, clearCart, addToCart } = useCart();
  const [productInfo, setProductInfo] = useState({});

  useEffect(() => {
    // Traer productos guardados en localStorage
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    const infoMap = {};
    stored.forEach((p) => {
      infoMap[p.id] = { nombre: p.nombre, imagen: p.imagen };
    });
    setProductInfo(infoMap);
  }, [cart]);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    const existing = cart.find((item) => item.id === id);
    if (!existing) return;

    const diff = newQuantity - existing.quantity;
    if (diff !== 0) {
      addToCart(id, diff, existing.price);
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0)
    return <p>No hay productos en el carrito.</p>;

  return (
    <div>
      <Table striped bordered hover responsive>
        <thead>
          <tr className="text-center align-middle">
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio unitario</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => {
            const subtotal = item.price * item.quantity;
            const info = productInfo[item.id] || {};
            return (
              <tr key={item.id} className="align-middle text-center">
                <td style={{ display: "flex", alignItems: "center" }}>
                  {info.imagen && (
                    <img
                      src={info.imagen}
                      alt={info.nombre}
                      style={{ width: "50px", height: "50px", objectFit: "cover", marginRight: "10px" }}
                    />
                  )}
                  <span>{info.nombre || item.id}</span>
                </td>
                <td style={{ width: "120px" }}>
                  <Form.Control
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, Number(e.target.value))
                    }
                  />
                </td>
                <td>{formatPrice(item.price)}</td>
                <td>{formatPrice(subtotal)}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Quitar
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <h5 className="text-end mt-3">
        Total: <b>{formatPrice(total)}</b>
      </h5>

      <div className="text-end">
        <Button variant="secondary" onClick={clearCart}>
          Vaciar carrito
        </Button>
      </div>
    </div>
  );
}
