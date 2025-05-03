import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Inventario from "./pages/Inventario";
import Contabilidad from "./pages/Contabilidad";
import Roles from "./pages/Roles";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 flex">
        <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen((v) => !v)} />
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
          {/* Botón flotante para mostrar el sidebar si está oculto */}
          {!sidebarOpen && (
            <button
              className="fixed top-4 left-4 z-50 bg-blue-700 text-white p-2 rounded-full shadow-lg hover:bg-blue-800 transition"
              onClick={() => setSidebarOpen(true)}
              title="Mostrar menú"
              style={{ zIndex: 100 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
          <main className="max-w-4xl mx-auto mt-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/inventario" element={<Inventario />} />
              <Route path="/contabilidad" element={<Contabilidad />} />
              <Route path="/roles" element={<Roles />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
