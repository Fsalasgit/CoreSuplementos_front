import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Spinner, Alert, Button } from "react-bootstrap";
import ProductCard from "./ProductCard";
import { useCart } from "../hooks/useCart";
import Sidebar from "./Sidebar";
import "../styles/ProductList.css";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showSidebar, setShowSidebar] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const backendURL = "http://localhost:3001";
        const res = await axios.get(`${backendURL}/api/products`);
        const data = res.data;
        const headers = data[0];
        const rows = data.slice(1);
        const items = rows.map((r) =>
          Object.fromEntries(headers.map((h, i) => [h, r[i]]))
        );
        setProducts(items);
        setFiltered(items);
      } catch (err) {
        console.error("❌ Error al obtener productos:", err);
        setError("No se pudieron cargar los productos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔍 Filtrado y orden dinámico
  useEffect(() => {
    let result = [...products];
    const term = searchTerm.toLowerCase();

    if (term) {
      result = result.filter(
        (p) =>
          `${p.nom_mayorista || ""} ${p.CATEGORIA || ""}`
            .toLowerCase()
            .includes(term)
      );
    }

    if (category) {
      result = result.filter((p) => p.CATEGORIA === category);
    }

    const cleanPrice = (val) =>
      parseFloat(
        String(val || "")
          .replace(/[^\d,.-]/g, "")
          .replace(/\./g, "")
          .replace(",", ".")
      ) || 0;

    result.sort((a, b) => {
      const priceA = cleanPrice(a.PRECIO_WEB);
      const priceB = cleanPrice(b.PRECIO_WEB);
      return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
    });

    setFiltered(result);
  }, [searchTerm, category, sortOrder, products]);

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Cargando productos...</p>
      </div>
    );

  if (error)
    return (
      <Alert variant="danger" className="mt-3">
        {error}
      </Alert>
    );

  const categories = [...new Set(products.map((p) => p.CATEGORIA || ""))].filter(Boolean);

  return (
    <div className="product-page">
      {/* 🔹 Botón hamburguesa (solo móvil) */}
      <Button
        variant="secondary"
        className="sidebar-toggle d-lg-none mb-3"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? "Cerrar Filtros ✖️" : "Mostrar Filtros ☰"}
      </Button>

      {/* 🔹 Sidebar fijo o colapsable */}
      <aside className={`sidebar-container ${showSidebar ? "show" : ""}`}>
        <Sidebar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          category={category}
          setCategory={setCategory}
          categories={categories}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
      </aside>

      {/* 🔹 Grilla de productos */}
      <div className="product-grid flex-grow-1 p-3">
        <Row className="g-3">
          {filtered.map((p) => (
            <Col key={p.ID} xs={6} sm={4} md={4} lg={3}>
              <ProductCard product={p} addToCart={addToCart} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
