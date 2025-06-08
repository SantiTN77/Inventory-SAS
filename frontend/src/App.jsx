import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Inventario from "./pages/Inventario";
import Categorias from "./pages/Categorias";
import Contabilidad from "./pages/Contabilidad";
import Roles from "./pages/Roles";
import Tutorial from "./pages/Tutorial";
import Estadisticas from "./pages/Estadisticas";
import Notificaciones from "./pages/Notificaciones";
import Configuracion from "./pages/Configuracion";
import Perfil from "./pages/Perfil";
import Login from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </BrowserRouter>
  );
}

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { token, loading } = useAuth();
  // Si está cargando el estado de auth, no renderizar nada
  if (loading) return null;
  const isLoggedIn = !!token;
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar y header solo si está logueado y no es login */}
      {isLoggedIn && window.location.pathname !== "/login" && (
        <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen((v) => !v)} />
      )}
      <div className={`flex-1 transition-all duration-300 ${isLoggedIn && window.location.pathname !== "/login" && sidebarOpen ? 'ml-64' : 'ml-0'}`}> 
        {isLoggedIn && window.location.pathname !== "/login" && (
          <Header onSidebarToggle={() => setSidebarOpen((v) => !v)} />
        )}
        {/* Botón flotante para mostrar el sidebar si está oculto */}
        {isLoggedIn && window.location.pathname !== "/login" && !sidebarOpen && (
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
            <Route path="/tutorial" element={<Tutorial />} />
            <Route path="/inventario" element={<ProtectedRoute modulo="inventario"><Inventario /></ProtectedRoute>} />
            <Route path="/categorias" element={<ProtectedRoute modulo="categorias"><Categorias /></ProtectedRoute>} />
            <Route path="/contabilidad" element={<ProtectedRoute modulo="contabilidad"><Contabilidad /></ProtectedRoute>} />
            <Route path="/roles" element={<ProtectedRoute modulo="roles"><Roles /></ProtectedRoute>} />
            <Route path="/estadisticas" element={<Estadisticas />} />
            <Route path="/notificaciones" element={<Notificaciones />} />
            <Route path="/configuracion" element={<Configuracion />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
