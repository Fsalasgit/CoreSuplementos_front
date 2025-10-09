import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import posts from "../textBlog/indexBlog";
import "../styles/blog.css";

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = posts.filter((post) => {
    const text = (
      post.title +
      post.summary +
      post.keywords.join(" ")
    ).toLowerCase();
    return text.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="blog-feed-container">
      <h1 className="feed-title">📰 Blog Core Suplementos</h1>

      {/* 🔍 Buscador */}
      <Form.Control
        type="text"
        placeholder="Buscar tema, palabra clave o título..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="feed-search"
      />

      {/* 🔄 Listado secuencial */}
      <div className="feed-list">
        {filteredPosts.map((post) => (
          <Link
            to={`/blog/${post.id}`}
            key={post.id}
            className="feed-item"
          >
            <img
              src={post.image}
              alt={post.title}
              className="feed-thumbnail"
            />
            <div className="feed-info">
              <h3>{post.title}</h3>
              <p className="feed-summary">{post.summary}</p>
              <small className="text-muted">
                {post.author} • {new Date(post.date).toLocaleDateString("es-AR")}
              </small>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
