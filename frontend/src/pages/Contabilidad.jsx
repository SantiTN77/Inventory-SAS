import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Utilidad para obtener el token JWT desde localStorage
function getToken() {
  return localStorage.getItem("token");
}
import { BanknotesIcon, PlusIcon, TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import Modal from "../components/Modal";
import Notification from "../components/Notification";
import { getApiUrl } from "../utils/api";

export default function Contabilidad() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [notif, setNotif] = useState({ open: false, message: "", type: "info" });
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [tooltip, setTooltip] = useState({ text: "", x: 0, y: 0, show: false });
  const tooltipRef = useRef();

  // Estado para movimientos y formulario
  const [movimientos, setMovimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ descripcion: '', tipo: '', monto: '' });
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // Fetch movimientos
  async function fetchMovimientos() {
    setLoading(true);
    setError("");
    try {
      const token = getToken();
      const res = await fetch(`${getApiUrl()}/api/movimientos`, {
        headers: { "Authorization": `Bearer ${token}` },
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        throw new Error('Sesión expirada. Inicia sesión nuevamente.');
      }
      if (res.status === 403) {
        const message = data.message || 'No tienes permiso para ver contabilidad.';
        setError(message);
        setNotif({ open: true, message, type: 'error' });
        return;
      }
      if (!res.ok) {
        throw new Error(data.message || "Error al obtener movimientos");
      }
      setMovimientos(Array.isArray(data) ? data : data.movimientos || []);
    } catch (err) {
      setError(err.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { fetchMovimientos(); }, []);

  // Abrir modal nuevo movimiento
  const handleAdd = () => {
    setForm({ descripcion: '', tipo: '', monto: '' });
    setModalOpen(true);
  };

  // Guardar nuevo movimiento
  const handleSave = async () => {
    try {
      const token = getToken();
      const res = await fetch(`${getApiUrl()}/api/movimientos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          descripcion: form.descripcion,
          tipo: form.tipo,
          monto: Number(form.monto),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        throw new Error('Sesión expirada. Inicia sesión nuevamente.');
      }
      if (res.status === 403) {
        setNotif({ open: true, message: data.message || 'No tienes permiso para crear movimientos.', type: 'error' });
        return;
      }
      if (!res.ok) {
        throw new Error(data.message || 'Error al crear movimiento');
      }
      setNotif({ open: true, message: 'Movimiento guardado', type: 'success' });
      setModalOpen(false);
      setForm({ descripcion: '', tipo: '', monto: '' });
      await fetchMovimientos();
    } catch (err) {
      setNotif({ open: true, message: err.message, type: 'error' });
    }
  };

  // Editar movimiento
  const handleEdit = async () => {
    try {
      const token = getToken();
      const res = await fetch(`${getApiUrl()}/api/movimientos/${editId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          descripcion: form.descripcion,
          tipo: form.tipo,
          monto: Number(form.monto),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        throw new Error('Sesión expirada. Inicia sesión nuevamente.');
      }
      if (res.status === 403) {
        setNotif({ open: true, message: data.message || 'No tienes permiso para editar movimientos.', type: 'error' });
        return;
      }
      if (!res.ok) {
        throw new Error(data.message || 'Error al editar movimiento');
      }
      setNotif({ open: true, message: 'Movimiento editado', type: 'success' });
      setEditOpen(false);
      setForm({ descripcion: '', tipo: '', monto: '' });
      setEditId(null);
      await fetchMovimientos();
    } catch (err) {
      setNotif({ open: true, message: err.message, type: 'error' });
    }
  };

  // Eliminar movimiento
  const handleDelete = async () => {
    try {
      const token = getToken();
      const res = await fetch(`${getApiUrl()}/api/movimientos/${deleteId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        throw new Error('Sesión expirada. Inicia sesión nuevamente.');
      }
      if (res.status === 403) {
        setNotif({ open: true, message: data.message || 'No tienes permiso para eliminar movimientos.', type: 'error' });
        return;
      }
      if (!res.ok) {
        throw new Error(data.message || 'Error al eliminar movimiento');
      }
      setNotif({ open: true, message: 'Movimiento eliminado', type: 'success' });
      setConfirmOpen(false);
      setDeleteId(null);
      await fetchMovimientos();
    } catch (err) {
      setNotif({ open: true, message: err.message, type: 'error' });
    }
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
    <section className="p-6 animate-fade-in bg-gradient-to-br from-success-100 via-green-100 to-gray-100 min-h-[80vh] flex flex-col items-center justify-center">
      <Notification open={notif.open} message={notif.message} type={notif.type} onClose={() => setNotif({ ...notif, open: false })} />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Nuevo movimiento">
        <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); handleSave(); }}>
          <input
            className="border rounded px-3 py-2"
            placeholder="Descripción"
            required
            value={form.descripcion}
            onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))}
          />
          <select
            className="border rounded px-3 py-2"
            required
            value={form.tipo}
            onChange={e => setForm(f => ({ ...f, tipo: e.target.value }))}
          >
            <option value="">Tipo</option>
            <option value="Ingreso">Ingreso</option>
            <option value="Egreso">Egreso</option>
          </select>
          <input
            className="border rounded px-3 py-2"
            placeholder="Monto"
            type="number"
            min="0"
            step="0.01"
            required
            value={form.monto}
            onChange={e => setForm(f => ({ ...f, monto: e.target.value }))}
          />
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow transition" type="submit">Guardar</button>
        </form>
      </Modal>
      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Editar movimiento">
        <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); handleEdit(); }}>
          <input
            className="border rounded px-3 py-2"
            placeholder="Descripción"
            required
            value={form.descripcion}
            onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))}
          />
          <select
            className="border rounded px-3 py-2"
            required
            value={form.tipo}
            onChange={e => setForm(f => ({ ...f, tipo: e.target.value }))}
          >
            <option value="">Tipo</option>
            <option value="Ingreso">Ingreso</option>
            <option value="Egreso">Egreso</option>
          </select>
          <input
            className="border rounded px-3 py-2"
            placeholder="Monto"
            type="number"
            min="0"
            step="0.01"
            required
            value={form.monto}
            onChange={e => setForm(f => ({ ...f, monto: e.target.value }))}
          />
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow transition" type="submit">Guardar cambios</button>
        </form>
      </Modal>
      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title="¿Eliminar movimiento?">
        <div className="flex flex-col gap-4">
          <p className="text-gray-700">¿Estás seguro de que deseas eliminar este movimiento? Esta acción no se puede deshacer.</p>
          <div className="flex gap-2 justify-end">
            <button className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300" onClick={() => setConfirmOpen(false)} type="button">Cancelar</button>
            <button className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700" onClick={handleDelete} type="button">Eliminar</button>
          </div>
        </div>
      </Modal>
      <div className="flex items-center gap-3 mb-6">
        <BanknotesIcon className="h-8 w-8 text-green-600" />
        <h2 className="text-3xl font-extrabold text-green-700">Contabilidad</h2>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 border border-green-100">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-lg text-green-900">Movimientos</span>
          <button className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow transition" onClick={handleAdd} title="Agregar nuevo movimiento">
            <PlusIcon className="h-5 w-5" /> Nuevo movimiento
          </button>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6 text-center text-green-700">Cargando movimientos...</div>
          ) : error ? (
            <div className="p-6 text-center text-red-600">{error}</div>
          ) : (
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
                {movimientos.length === 0 ? (
                  <tr><td colSpan={4} className="px-4 py-6 text-center text-gray-500">No hay movimientos registrados.</td></tr>
                ) : (
                  movimientos.map((mov) => { const rowId = mov._id || mov.id; return (
                    <tr key={rowId} className="hover:bg-green-50 transition">
                      <td className="px-4 py-2">{mov.descripcion}</td>
                      <td className="px-4 py-2">{mov.tipo}</td>
                      <td className="px-4 py-2">${mov.monto?.toFixed(2)}</td>
                      <td className="px-4 py-2 flex gap-2 items-center relative">
                        <button
                          className="text-green-600 hover:underline flex items-center gap-1"
                          onMouseEnter={e => showTooltip('Editar', e)}
                          onMouseLeave={hideTooltip}
                          onClick={() => {
                            setEditOpen(true);
                            setEditId(rowId);
                            setForm({ descripcion: mov.descripcion, tipo: mov.tipo, monto: mov.monto });
                          }}
                        >
                          <PencilSquareIcon className="h-5 w-5" />
                        </button>
                        <button
                          className="text-red-500 hover:underline flex items-center gap-1"
                          onClick={() => {
                            setConfirmOpen(true);
                            setDeleteId(rowId);
                          }}
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
                  )})
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
    );
  }
