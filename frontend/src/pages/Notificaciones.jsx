

import { useState } from "react";
import Notification from "../components/Notification";

export default function Notificaciones() {
  // Patrón de feedback preparado para futuras llamadas a la API
  const [notif, setNotif] = useState({ open: false, message: "", type: "info" });
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-warning-100 via-yellow-100 to-gray-100 animate-fade-in py-10">
      <Notification open={notif.open} message={notif.message} type={notif.type} onClose={() => setNotif({ ...notif, open: false })} />
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-3xl shadow-soft p-8 border border-primary-100">
        <h1 className="text-4xl font-display font-bold text-primary-600 mb-6 drop-shadow">Notificaciones</h1>
        <p className="mb-4 text-lg text-primary-700">Aquí verás alertas importantes, avisos de inventario y mensajes del sistema.</p>
        <div className="bg-accent-100 rounded-xl p-6 text-accent-500 border border-accent-300">
          <p className="text-center">No hay notificaciones nuevas.</p>
        </div>
      </div>
      {/* Usar setNotif({open:true, message:'Mensaje', type:'error'|'success'}) para mostrar feedback */}
    </section>
  );
}
