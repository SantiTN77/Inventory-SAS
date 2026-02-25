import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
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
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = !!token;
  const isLoginRoute = location.pathname === "/login";
  const isLandingRoute = location.pathname === "/";
  const isPublicRoute = isLoginRoute || isLandingRoute;

  useEffect(() => {
    if (!loading && !isLoggedIn && !isPublicRoute) {
      navigate("/login", { replace: true });
      return;
    }

    if (!loading && isLoggedIn && (isLandingRoute || isLoginRoute)) {
      navigate("/dashboard", { replace: true });
    }
  }, [loading, isLoggedIn, isPublicRoute, isLandingRoute, isLoginRoute, navigate]);

  if (loading) return null;

  const mostrarEstructuraInterna = isLoggedIn && !isLoginRoute && !isLandingRoute;

  return (
    <div className={`min-h-screen ${mostrarEstructuraInterna ? "bg-gray-100 flex" : ""}`}>
      {mostrarEstructuraInterna && (
        <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen((v) => !v)} />
      )}

      <div className={`flex-1 transition-all duration-300 ${mostrarEstructuraInterna && sidebarOpen ? "ml-64" : "ml-0"}`}>
        {mostrarEstructuraInterna && (
          <Header onSidebarToggle={() => setSidebarOpen((v) => !v)} />
        )}

        {mostrarEstructuraInterna && !sidebarOpen && (
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

        <main className={mostrarEstructuraInterna ? "max-w-4xl mx-auto mt-8" : "w-full"}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Home />} />
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
