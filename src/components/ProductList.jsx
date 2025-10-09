import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Spinner, Alert } from "react-bootstrap";
import ProductCard from "./ProductCard";
import { useCart } from "../hooks/useCart";
import Sidebar from "./Sidebar";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

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

    // Filtro por texto concatenado (nom_mayorista + categoria)
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          `${p.nom_mayorista || ""} ${p.CATEGORIA || ""}`
            .toLowerCase()
            .includes(term)
      );
    }

    // Filtro por categoría
    if (category) {
      result = result.filter((p) => p.CATEGORIA === category);
    }

    // Orden por precio
    result.sort((a, b) => {
      // 🔹 Limpia el string quitando símbolos $, puntos y comas
      const cleanPrice = (val) =>
        parseFloat(
          String(val || "")
            .replace(/[^\d,.-]/g, "") // quita todo excepto números, coma, punto, signo
            .replace(/\./g, "")       // quita separadores de miles
            .replace(",", ".")        // convierte coma decimal en punto
        ) || 0;

      const priceA = cleanPrice(a.PRECIO_INTERNO);
      const priceB = cleanPrice(b.PRECIO_INTERNO);

      return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
    });


    setFiltered(result);
  }, [searchTerm, category, sortOrder, products]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status" />
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-3">
        {error}
      </Alert>
    );
  }

  // 🧩 Sacamos las categorías únicas
  const categories = [...new Set(products.map((p) => p.CATEGORIA || ""))].filter(Boolean);

  return (
    <div className="d-flex">
      <Sidebar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        category={category}
        setCategory={setCategory}
        categories={categories}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      <div className="flex-grow-1 p-3">
        <Row>
          {filtered.map((p) => (
            <Col key={p.ID} sm={12} md={6} lg={4} className="mb-3">
              <ProductCard product={p} addToCart={addToCart} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
