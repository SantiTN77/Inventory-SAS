import React from "react";

export default function Perfil() {
  return (
    <div className="max-w-xl mx-auto py-10 px-4 animate-fade-in">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Mi Perfil</h1>
      <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Nombre de usuario</label>
          <input type="text" className="w-full border border-blue-200 rounded px-3 py-2" value="Usuario Demo" disabled />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Correo electrónico</label>
          <input type="email" className="w-full border border-blue-200 rounded px-3 py-2" value="demo@email.com" disabled />
        </div>
        <div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Editar perfil</button>
        </div>
      </div>
    </div>
  );
}
