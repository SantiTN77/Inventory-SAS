import React, { useState } from "react";
import Notification from "../components/Notification";

export default function Estadisticas() {
  // Patrón de feedback preparado para futuras llamadas a la API
  const [notif, setNotif] = useState({ open: false, message: "", type: "info" });
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 animate-fade-in bg-gradient-to-br from-primary-100 via-blue-100 to-gray-100 rounded-3xl shadow-2xl">
      <Notification open={notif.open} message={notif.message} type={notif.type} onClose={() => setNotif({ ...notif, open: false })} />
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Estadísticas</h1>
      <p className="mb-4 text-lg text-gray-700">Visualiza el rendimiento de tu negocio con gráficos y reportes. Próximamente podrás ver ventas, inventario y más.</p>
      <div className="bg-blue-50 rounded-lg p-8 flex items-center justify-center min-h-[200px] text-gray-400">
        [Aquí irán los gráficos e informes]
      </div>
      {/* Usar setNotif({open:true, message:'Mensaje', type:'error'|'success'}) para mostrar feedback */}
    </div>
  );
}
