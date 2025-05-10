import React from "react";

export default function Configuracion() {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-primary-100 via-blue-100 to-gray-100 animate-fade-in py-10">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-3xl shadow-soft p-8 border border-primary-100">
        <h1 className="text-4xl font-display font-bold text-primary-600 mb-6 drop-shadow">Configuración</h1>
        <p className="mb-4 text-lg text-primary-700">Personaliza las preferencias de tu sistema, notificaciones y más.</p>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4 border border-primary-50">
          <div>
            <label className="block text-primary-700 font-semibold mb-1">Tema</label>
            <select className="w-full border border-primary-200 rounded px-3 py-2 bg-primary-50/40">
              <option>Claro</option>
              <option>Oscuro</option>
            </select>
          </div>
          <div>
            <label className="block text-primary-700 font-semibold mb-1">Notificaciones</label>
            <input type="checkbox" className="mr-2 accent-primary-500" defaultChecked />
            <span>Recibir notificaciones por email</span>
          </div>
          <div>
            <button className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600 transition font-semibold">Guardar cambios</button>
          </div>
        </div>
      </div>
    </section>
  );
}
