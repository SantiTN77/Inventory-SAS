import React from "react";

export default function Notificaciones() {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4 animate-fade-in">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Notificaciones</h1>
      <p className="mb-4 text-lg text-gray-700">Aquí verás alertas importantes, avisos de inventario y mensajes del sistema.</p>
      <div className="bg-yellow-50 rounded-lg p-6 text-yellow-700 border border-yellow-200">
        <p className="text-center">No hay notificaciones nuevas.</p>
      </div>
    </div>
  );
}
