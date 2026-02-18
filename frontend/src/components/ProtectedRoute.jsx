import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import Notification from "./Notification";
import { useState } from "react";

export default function ProtectedRoute({ children, modulo }) {
  const { user, loading } = useAuth();
  const [notif, setNotif] = useState({ open: false, message: "", type: "error" });

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  // Permiso: el rol debe tener permiso de leer el módulo
  const tienePermiso = user.rol && Array.isArray(user.rol.permisos) && user.rol.permisos.some(p => p.modulo === modulo && Array.isArray(p.acciones) && p.acciones.includes("leer"));

  if (!tienePermiso) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Notification open={true} message="Acceso denegado: no tienes permiso para ver este módulo." type="error" onClose={() => setNotif({ ...notif, open: false })} />
        <div className="text-2xl text-red-600 font-bold mt-6">Acceso denegado</div>
        <div className="text-gray-500 mt-2">No tienes permiso para acceder a este módulo.</div>
      </div>
    );
  }
  return children;
}
