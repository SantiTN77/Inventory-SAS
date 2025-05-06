import React from "react";

export default function Configuracion() {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4 animate-fade-in">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Configuración</h1>
      <p className="mb-4 text-lg text-gray-700">Personaliza las preferencias de tu sistema, notificaciones y más.</p>
      <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Tema</label>
          <select className="w-full border border-blue-200 rounded px-3 py-2">
            <option>Claro</option>
            <option>Oscuro</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Notificaciones</label>
          <input type="checkbox" className="mr-2" defaultChecked />
          <span>Recibir notificaciones por email</span>
        </div>
        <div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Guardar cambios</button>
        </div>
      </div>
    </div>
  );
}
