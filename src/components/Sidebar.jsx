import React from "react";

export default function Sidebar({
  searchTerm,
  setSearchTerm,
  category,
  setCategory,
  categories,
  sortOrder,
  setSortOrder,
}) {
  return (
    <aside className="p-3 border-end" style={{ minWidth: "250px", height: "100vh" }}>
      <h5 className="mb-3">Filtros</h5>

      <div className="mb-3">
        <label className="form-label fw-bold">Buscar</label>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar producto o categoría..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Categoría</label>
        <select
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Todas</option>
          {categories.sort().map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Ordenar</label>
        <select
          className="form-select"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="desc">Precio: alto a bajo</option>
          <option value="asc">Precio: bajo a alto</option>
        </select>
      </div>
    </aside>
  );
}
