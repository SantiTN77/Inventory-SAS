import { useState } from "react";
import { ArchiveBoxIcon, PlusIcon } from "@heroicons/react/24/solid";
import Modal from "../components/Modal";
import Notification from "../components/Notification";

export default function Inventario() {
  const [modalOpen, setModalOpen] = useState(false);
  const [notif, setNotif] = useState({ open: false, message: "", type: "info" });

  const handleAdd = () => setModalOpen(true);
  const handleSave = () => {
    setModalOpen(false);
    setNotif({ open: true, message: "Producto agregado con éxito", type: "success" });
  };

  return (
    <section className="p-6 animate-fade-in">
      <Notification open={notif.open} message={notif.message} type={notif.type} onClose={() => setNotif({ ...notif, open: false })} />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Nuevo producto">
        <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); handleSave(); }}>
          <input className="border rounded px-3 py-2" placeholder="Nombre del producto" required />
          <input className="border rounded px-3 py-2" placeholder="Stock" type="number" min="0" required />
          <input className="border rounded px-3 py-2" placeholder="Precio" type="number" min="0" step="0.01" required />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition" type="submit">Guardar</button>
        </form>
      </Modal>
      <div className="flex items-center gap-3 mb-6">
        <ArchiveBoxIcon className="h-8 w-8 text-blue-600" />
        <h2 className="text-3xl font-extrabold text-blue-700">Inventario</h2>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 border border-blue-100">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-lg text-blue-900">Productos</span>
          <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition" onClick={handleAdd}>
            <PlusIcon className="h-5 w-5" /> Nuevo producto
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="bg-blue-50">
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Stock</th>
                <th className="px-4 py-2">Precio</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-blue-50 transition">
                <td className="px-4 py-2">Ejemplo producto</td>
                <td className="px-4 py-2">20</td>
                <td className="px-4 py-2">$100.00</td>
                <td className="px-4 py-2">
                  <button className="text-blue-600 hover:underline">Editar</button>
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
