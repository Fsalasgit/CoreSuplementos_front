import { useState, useEffect } from "react";

const CART_TTL_MS = 60 * 60 * 1000; // 1 hora

let globalCart = JSON.parse(localStorage.getItem("cart") || "[]");
let listeners = [];

function isCartExpired() {
  if (!globalCart.length) return false;
  const firstItem = globalCart[0];
  return !firstItem.timestamp || Date.now() - firstItem.timestamp > CART_TTL_MS;
}

export function useCart() {
  // Si el carrito expiró → lo limpiamos
  if (isCartExpired()) {
    globalCart = [];
    localStorage.removeItem("cart");
  }

  const [cart, setCart] = useState(globalCart);

  useEffect(() => {
    const update = (newCart) => setCart(newCart);
    listeners.push(update);
    return () => {
      listeners = listeners.filter((l) => l !== update);
    };
  }, []);

  const notify = (newCart) => {
    globalCart = newCart;
    localStorage.setItem("cart", JSON.stringify(newCart));
    listeners.forEach((l) => l(newCart));
  };

  const addToCart = (id, quantity, price,nombre,imagen) => {
    const timestamp = Date.now();
    const existing = globalCart.find((item) => item.id === id);
    let newCart;
    if (existing) {
      newCart = globalCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + quantity, timestamp }
          : item
      );
    } else {
      newCart = [...globalCart, { id, quantity, price, timestamp, nombre,imagen}];
    }
    notify(newCart);
  };

  const removeFromCart = (id) => {
    const newCart = globalCart.filter((item) => item.id !== id);
    notify(newCart);
  };

  const clearCart = () => {
    globalCart = [];
    localStorage.removeItem("cart");
    notify([]);
  };

  return { cart, addToCart, removeFromCart, clearCart };
}
