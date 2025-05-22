// NOTA: Cuando se implemente el CRUD real de roles y usuarios:
// - Proteger los endpoints en backend con JWT.
// - Aplicar el patrón de manejo de sesión y feedback de errores como en Inventario, Categorías y Contabilidad.
// - Redirigir a login si el token es inválido o expiró.
import { useState, useRef } from "react";
import { UserGroupIcon, PlusIcon, TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import Modal from "../components/Modal";
import Notification from "../components/Notification";

export default function Roles() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [notif, setNotif] = useState({ open: false, message: "", type: "info" });
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [tooltip, setTooltip] = useState({ text: "", x: 0, y: 0, show: false });
  const tooltipRef = useRef();

  const handleAdd = () => setModalOpen(true);
  const handleSave = () => {
    setModalOpen(false);
    setNotif({ open: true, message: "Usuario creado", type: "success" });
  };
  const handleEdit = () => {
    setEditOpen(false);
    setNotif({ open: true, message: "Usuario editado", type: "success" });
  };
  const handleDelete = () => {
    setConfirmOpen(false);
    setNotif({ open: true, message: "Usuario eliminado", type: "success" });
  };
  const showTooltip = (text, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      text,
      x: rect.left + rect.width / 2,
      y: rect.top,
      show: true,
    });
  };
  const hideTooltip = () => setTooltip({ ...tooltip, show: false });

  return (
    <section className="p-6 animate-fade-in bg-gradient-to-br from-accent-100 via-orange-100 to-gray-100 min-h-[80vh] flex flex-col items-center justify-center">
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
      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Editar usuario">
        <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); handleEdit(); }}>
          <input className="border rounded px-3 py-2" placeholder="Nombre" required />
          <input className="border rounded px-3 py-2" placeholder="Correo" type="email" required />
          <select className="border rounded px-3 py-2" required>
            <option value="">Rol</option>
            <option value="Administrador">Administrador</option>
            <option value="Usuario">Usuario</option>
          </select>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-4 py-2 rounded-lg shadow transition" type="submit">Guardar cambios</button>
        </form>
      </Modal>
      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title="¿Eliminar usuario?">
        <div className="flex flex-col gap-4">
          <p className="text-gray-700">¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.</p>
          <div className="flex gap-2 justify-end">
            <button className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300" onClick={() => setConfirmOpen(false)} type="button">Cancelar</button>
            <button className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700" onClick={handleDelete} type="button">Eliminar</button>
          </div>
        </div>
      </Modal>
      <div className="flex items-center gap-3 mb-6">
        <UserGroupIcon className="h-8 w-8 text-yellow-500" />
        <h2 className="text-3xl font-extrabold text-yellow-600">Roles y Usuarios</h2>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 border border-yellow-100">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-lg text-yellow-900">Usuarios</span>
          <button className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-4 py-2 rounded-lg shadow transition" onClick={handleAdd} title="Agregar nuevo usuario">
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
                <td className="px-4 py-2 flex gap-2 items-center relative">
                  <button
                    className="text-yellow-700 hover:underline flex items-center gap-1"
                    onMouseEnter={e => showTooltip('Editar', e)}
                    onMouseLeave={hideTooltip}
                    onClick={() => setEditOpen(true)}
                  >
                    <PencilSquareIcon className="h-5 w-5" />
                  </button>
                  <button
                    className="text-red-500 hover:underline flex items-center gap-1"
                    onClick={() => setConfirmOpen(true)}
                    onMouseEnter={e => showTooltip('Eliminar', e)}
                    onMouseLeave={hideTooltip}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                  {/* Tooltip flotante absoluto */}
                  {tooltip.show && (
                    <span
                      ref={tooltipRef}
                      className="pointer-events-none fixed z-50 px-2 py-1 bg-black text-white text-xs rounded shadow animate-fade-in"
                      style={{ left: tooltip.x, top: tooltip.y - 32, transform: 'translate(-50%, -100%)' }}
                    >
                      {tooltip.text}
                    </span>
                  )}
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
