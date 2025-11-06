import React, { useState, useContext } from "react";
import { Card, Button, Form, Toast } from "react-bootstrap";
import { ToastContext } from "../context/ToastContext";

export default function ProductCard({ product, addToCart }) {
  const { showToast, setShowToast, toastPos, setToastPos } = useContext(ToastContext);
  const [quantity, setQuantity] = useState(1);

  // NUEVA FUNCIÓN: Formatea el número a formato de moneda ($10.000,00)
  const formatCurrency = (amount) => {
    // Asegurarse de que el monto es un número
    const numberAmount = typeof amount === "string" ? parsePrice(amount) : amount;
    
    // Usamos Intl.NumberFormat para formatear como moneda argentina (ARS), 
    // que usa '$' como símbolo y punto como separador de miles.
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS', // Usa ARS (peso argentino) o cambia a la moneda que necesites
      minimumFractionDigits: 0, // No muestra decimales si no son necesarios
      maximumFractionDigits: 2, // Muestra hasta dos decimales si existen
    }).format(numberAmount);
  };
  
  // FUNCIÓN ORIGINAL: Limpia y parsea el precio
  const parsePrice = (raw) => {
    if (!raw) return 0;
    if (typeof raw === "number") return raw;
    // La expresión limpia caracteres no numéricos, comas (,) y lo convierte a punto (.)
    // para ser leído correctamente por Number(). Se usa PRECIO_VENTA para la lógica
    const clean = raw.replace(/[^0-9,-]+/g, "").replace(",", ".");
    return Number(clean) || 0;
  };

  const handleAdd = (e) => {
    if (showToast) return; // bloquea cualquier producto mientras toast activo

    // Usamos product.PRECIO_VENTA para la lógica de añadir al carrito
    const price = parsePrice(product.PRECIO_VENTA); 
    addToCart(product.ID, quantity, price, product.NOMBRE, product.URL_IMAGEN);

    setToastPos({ top: e.clientY, left: e.clientX });
    setShowToast(true);

    setTimeout(() => setShowToast(false), 700); // ⏱ duración reducida a 0.7 segundos
  };

  // Precios parseados para mostrar en la Card
  // Nota: Asumo que el precio final es product.PRECIO_VENTA y el tachado es product.PRECIO_WEB
  const precioVenta = product.PRECIO_VENTA ? parsePrice(product.PRECIO_VENTA) : 0;
  const precioWeb = product.PRECIO_WEB ? parsePrice(product.PRECIO_WEB) : 0;
  
  // Condición para mostrar el precio web tachado: solo si existe y es mayor al precio de venta
  const showWebPrice = precioWeb > precioVenta;


  return (
    <>
      <Card className="h-100 shadow-sm">
        <Card.Img
          variant="top"
          src={product.IMG_WEB || "https://via.placeholder.com/150"}
          style={{ objectFit: "cover", height: "180px" }}
        />
        <Card.Body>
          <Card.Title>{product.NOMBRE}</Card.Title>
          <Card.Text>
            <small>{product.CATEGORIA}</small>
            <br />
            
            {/* 1. Precio Web TACHADO (solo si es mayor) */}
            {showWebPrice && (
              <span style={{ textDecoration: 'line-through', color: '#888', marginRight: '8px' }}>
                {formatCurrency(precioWeb)}
              </span>
            )}

            {/* 2. Precio de Venta Formateado */}
            <b style={{ fontSize: '1.2em' }}>
              {formatCurrency(precioVenta)}
            </b>

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

      {/* Toast global (sin cambios) */}
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