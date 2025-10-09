import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastProvider } from "./context/ToastContext";
import Sales from "./pages/Sales";
import Landing from "./pages/Landing"; 
import "./App.css";
import Blog from "./pages/Blog";

function App() {
  return (
    <Router>
      <Navbar />
      <Container className="mt-4">
        <ToastProvider>
          <Routes>
            <Route path="/" element={<Landing />} /> {/* Página principal */}
            <Route path="/blog" element={<Blog />} /> {/* Página de ventas/blog */}
            <Route path="/tienda" element={<Sales />} /> {/* Página de ventas/blog */}
          </Routes>
        </ToastProvider>
      </Container>
    </Router>
  );
}

export default App;
