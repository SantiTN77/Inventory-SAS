import { useState } from "react";
import { BanknotesIcon, PlusIcon } from "@heroicons/react/24/solid";
import Modal from "../components/Modal";
import Notification from "../components/Notification";

export default function Contabilidad() {
  const [modalOpen, setModalOpen] = useState(false);
  const [notif, setNotif] = useState({ open: false, message: "", type: "info" });

  const handleAdd = () => setModalOpen(true);
  const handleSave = () => {
    setModalOpen(false);
    setNotif({ open: true, message: "Movimiento guardado", type: "success" });
  };

  return (
    <section className="p-6 animate-fade-in">
      <Notification open={notif.open} message={notif.message} type={notif.type} onClose={() => setNotif({ ...notif, open: false })} />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Nuevo movimiento">
        <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); handleSave(); }}>
          <input className="border rounded px-3 py-2" placeholder="Descripción" required />
          <select className="border rounded px-3 py-2" required>
            <option value="">Tipo</option>
            <option value="Ingreso">Ingreso</option>
            <option value="Egreso">Egreso</option>
          </select>
          <input className="border rounded px-3 py-2" placeholder="Monto" type="number" min="0" step="0.01" required />
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow transition" type="submit">Guardar</button>
        </form>
      </Modal>
      <div className="flex items-center gap-3 mb-6">
        <BanknotesIcon className="h-8 w-8 text-green-600" />
        <h2 className="text-3xl font-extrabold text-green-700">Contabilidad</h2>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 border border-green-100">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-lg text-green-900">Movimientos</span>
          <button className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow transition" onClick={handleAdd}>
            <PlusIcon className="h-5 w-5" /> Nuevo movimiento
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="bg-green-50">
                <th className="px-4 py-2">Descripción</th>
                <th className="px-4 py-2">Tipo</th>
                <th className="px-4 py-2">Monto</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-green-50 transition">
                <td className="px-4 py-2">Venta producto</td>
                <td className="px-4 py-2">Ingreso</td>
                <td className="px-4 py-2">$500.00</td>
                <td className="px-4 py-2">
                  <button className="text-green-600 hover:underline">Editar</button>
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
