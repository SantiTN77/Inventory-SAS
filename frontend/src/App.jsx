import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Inventario from "./pages/Inventario";
import Contabilidad from "./pages/Contabilidad";
import Roles from "./pages/Roles";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="max-w-4xl mx-auto mt-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inventario" element={<Inventario />} />
            <Route path="/contabilidad" element={<Contabilidad />} />
            <Route path="/roles" element={<Roles />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
