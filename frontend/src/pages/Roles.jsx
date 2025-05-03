import { useState } from "react";
import { UserGroupIcon, PlusIcon } from "@heroicons/react/24/solid";
import Modal from "../components/Modal";
import Notification from "../components/Notification";

export default function Roles() {
  const [modalOpen, setModalOpen] = useState(false);
  const [notif, setNotif] = useState({ open: false, message: "", type: "info" });

  const handleAdd = () => setModalOpen(true);
  const handleSave = () => {
    setModalOpen(false);
    setNotif({ open: true, message: "Usuario creado", type: "success" });
  };

  return (
    <section className="p-6 animate-fade-in">
      <Notification open={notif.open} message={notif.message} type={notif.type} onClose={() => setNotif({ ...notif, open: false })} />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Nuevo usuario">
        <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); handleSave(); }}>
          <input className="border rounded px-3 py-2" placeholder="Nombre" required />
          <input className="border rounded px-3 py-2" placeholder="Correo" type="email" required />
          <select className="border rounded px-3 py-2" required>
            <option value="">Rol</option>
            <option value="Administrador">Administrador</option>
            <option value="Usuario">Usuario</option>
          </select>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-4 py-2 rounded-lg shadow transition" type="submit">Guardar</button>
        </form>
      </Modal>
      <div className="flex items-center gap-3 mb-6">
        <UserGroupIcon className="h-8 w-8 text-yellow-500" />
        <h2 className="text-3xl font-extrabold text-yellow-600">Roles y Usuarios</h2>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 border border-yellow-100">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-lg text-yellow-900">Usuarios</span>
          <button className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-4 py-2 rounded-lg shadow transition" onClick={handleAdd}>
            <PlusIcon className="h-5 w-5" /> Nuevo usuario
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="bg-yellow-50">
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Rol</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-yellow-50 transition">
                <td className="px-4 py-2">Juan Pérez</td>
                <td className="px-4 py-2">Administrador</td>
                <td className="px-4 py-2">
                  <button className="text-yellow-700 hover:underline">Editar</button>
                  <button className="ml-2 text-red-500 hover:underline">Eliminar</button>
                </td>
              </tr>
              {/* Más filas aquí */}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
