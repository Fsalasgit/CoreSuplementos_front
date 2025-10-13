import { Link } from "react-router-dom";
import { Button, Container, Row, Col, Card } from "react-bootstrap";

export default function Landing() {
  return (
    <div className="landing-page text-center text-light">
      {/* 🔹 Hero Section */}
      <section className="hero-section d-flex flex-column align-items-center justify-content-center text-center p-5 bg-dark rounded-3 shadow-lg">
        <img src="/Logo.png" alt="Core Suplementos" className="mb-3" style={{ width: "120px" }} />
        <h1 className="fw-bold">Suplementos con Transparencia Real</h1>
        <p className="lead mt-2">
          En Core Suplementos solo pagás cuando recibís tu pedido. Sin anticipos, sin sorpresas.
        </p>
        <div className="d-flex gap-3 mt-4 justify-content-center">
          <Button as={Link} to="/tienda" variant="light" size="lg">
            🛒 Ver Tienda
          </Button>
          <Button as={Link} to="/blog" variant="outline-light" size="lg">
            📘 Ver Blog
          </Button>
        </div>
      </section>

      {/* 🔹 Cómo funciona */}
      <section className="py-5">
        <Container>
          <h2 className="fw-bold mb-4">¿Cómo funciona Core?</h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 bg-dark text-light border-light">
                <Card.Body>
                  <h4>1️⃣ Elegís tu producto</h4>
                  <p>Explorá la tienda y seleccioná lo que necesitás. Todos los precios son de referencia, con base en proveedores oficiales.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 bg-dark text-light border-light">
                <Card.Body>
                  <h4>2️⃣ Confirmamos disponibilidad</h4>
                  <p>Verificamos stock y precio en tiempo real con el mayorista más competitivo del país.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 bg-dark text-light border-light">
                <Card.Body>
                  <h4>3️⃣ Pagás al recibir</h4>
                  <p>Recibís tu pedido y abonás recién en el momento de la entrega. Sin anticipos ni letra chica.</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* 🔹 Beneficios */}
      <section className="py-5 bg-light text-dark">
        <Container>
          <h2 className="fw-bold mb-4">Por qué elegir Core</h2>
          <Row className="g-4">
            <Col md={3}><p>✅ Productos originales con respaldo oficial</p></Col>
            <Col md={3}><p>💰 Pagás solo cuando recibís tu pedido</p></Col>
            <Col md={3}><p>⚡ Comparador automático de precios</p></Col>
            <Col md={3}><p>🧠 Información real sobre nutrición y bienestar</p></Col>
          </Row>
        </Container>
      </section>

      {/* 🔹 CTA final */}
      <section className="py-5 bg-dark text-light">
        <Container>
          <h2 className="fw-bold">¿Querés tu suplemento al mejor precio?</h2>
          <p className="lead">Contactanos ahora por WhatsApp y obtené tu presupuesto sin compromiso.</p>
          <Button
            href="https://wa.me/549XXXXXXXXXX" // tu número con prefijo país
            target="_blank"
            variant="success"
            size="lg"
          >
            💬 Consultar por WhatsApp
          </Button>
        </Container>
      </section>
    </div>
  );
}
