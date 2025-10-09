import React from "react";
import { useParams, Link } from "react-router-dom";
import posts from "../textBlog/indexBlog";
import "../styles/Blog.css";

export default function BlogDetail() {
  const { id } = useParams();
  const post = posts.find((p) => p.id === Number(id));

  if (!post) return <p>Artículo no encontrado</p>;

  const embedUrl = post.videoUrl?.includes("watch?v=")
    ? post.videoUrl.replace("watch?v=", "embed/")
    : post.videoUrl;

  return (
    <div className="blog-detail">
      <Link to="/blog" className="btn btn-outline-secondary mb-3">
        ← Volver al Blog
      </Link>

      <h2 className="detail-title">{post.title}</h2>
      <small className="text-muted">
        {post.author} • {new Date(post.date).toLocaleDateString("es-AR")}
      </small>

      {post.videoUrl && (
        <div className="video-wrapper">
          <iframe
            src={embedUrl}
            title={post.title}
            allowFullScreen
          ></iframe>
        </div>
      )}

      <div className="detail-content">
        <p className="detail-summary">{post.summary}</p>
        <pre className="detail-text">{post.content}</pre>
      </div>
    </div>
  );
}
