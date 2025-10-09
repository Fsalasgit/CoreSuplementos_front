import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import posts from "../textBlog/indexBlog"; // asegúrate que esta ruta esté correcta
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
        {filteredPosts.map((post) => {
          // 🎥 Asegura que el link de YouTube sea formato embed
          const embedUrl = post.videoUrl?.includes("watch?v=")
            ? post.videoUrl.replace("watch?v=", "embed/")
            : post.videoUrl;

          return (
            <Link
              to={`/blog/${post.id}`}
              key={post.id}
              className="feed-item"
            >
              <div className="feed-video-container">
                <iframe
                  src={embedUrl}
                  title={post.title}
                  allowFullScreen
                  className="feed-thumbnail"
                ></iframe>
              </div>

              <div className="feed-info">
                <h3 className="feed-title-item">{post.title}</h3>
                <p className="feed-summary">{post.summary}</p>
                <small className="feed-meta">
                  {post.author} •{" "}
                  {new Date(post.date).toLocaleDateString("es-AR")}
                </small>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
