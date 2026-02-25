import React, { useState } from "react";
import Notification from "../components/Notification";
import { useAuth } from "../context/AuthContext";

export default function Perfil() {
  const { user } = useAuth();
  const [notif, setNotif] = useState({ open: false, message: "", type: "info" });
  const rolNombre = user?.rol?.nombre || 'Usuario';
  return (
    <div className="max-w-xl mx-auto py-10 px-4 animate-fade-in">
      <Notification open={notif.open} message={notif.message} type={notif.type} onClose={() => setNotif({ ...notif, open: false })} />
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Mi Perfil</h1>
      <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Nombre de usuario</label>
          <input type="text" className="w-full border border-blue-200 rounded px-3 py-2" value={user?.nombre || 'Sin nombre'} disabled />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Correo electrónico</label>
          <input type="email" className="w-full border border-blue-200 rounded px-3 py-2" value={user?.email || 'Sin email'} disabled />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Rol</label>
          <input type="text" className="w-full border border-blue-200 rounded px-3 py-2" value={rolNombre.charAt(0).toUpperCase() + rolNombre.slice(1)} disabled />
        </div>
        <div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => setNotif({ open: true, message: "Funcionalidad próximamente disponible", type: "info" })}
          >Editar perfil</button>
        </div>
      </div>
      {/* Usar setNotif({open:true, message:'Mensaje', type:'error'|'success'}) para mostrar feedback */}
    </div>
  );
}
