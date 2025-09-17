import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PlusIcon, TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import Modal from "../components/Modal";
import Notification from "../components/Notification";
import { getApiUrl } from "../utils/api";

function getToken() {
  return localStorage.getItem("token");
}

export default function Categorias() {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notif, setNotif] = useState({ open: false, message: "", type: "info" });
  const [modalOpen, setModalOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({ nombre: "" });
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [tooltip, setTooltip] = useState({ text: "", x: 0, y: 0, show: false });
  const tooltipRef = useRef();

  async function fetchCategorias() {
    setLoading(true);
    setError("");
    try {
      const token = getToken();
      const res = await fetch(`${getApiUrl()}/api/categorias`, {
        headers: { "Authorization": `Bearer ${token}` },
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        throw new Error('Sesión expirada. Inicia sesión nuevamente.');
      }
      if (res.status === 403) {
        const message = data.message || 'No tienes permiso para ver categorías.';
        setError(message);
        setNotif({ open: true, message, type: 'error' });
        return;
      }
      if (!res.ok) {
        throw new Error(data.message || "Error al obtener categorías");
      }
      setCategorias(Array.isArray(data) ? data : data.categorias || data.categories || []);
    } catch (err) {
      setError(err.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { fetchCategorias(); }, []);

  const handleAdd = () => {
    setForm({ nombre: "" });
    setModalOpen(true);
  };
  const handleSave = async () => {
    try {
      const token = getToken();
      const res = await fetch(`${getApiUrl()}/api/categorias`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre: form.nombre }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        throw new Error('Sesión expirada. Inicia sesión nuevamente.');
      }
      if (res.status === 403) {
        setNotif({ open: true, message: data.message || 'No tienes permiso para crear categorías.', type: 'error' });
        return;
      }
      if (!res.ok) {
        throw new Error(data.message || "Error al crear categoría");
      }
      setNotif({ open: true, message: "Categoría guardada", type: "success" });
      setModalOpen(false);
      setForm({ nombre: "" });
      await fetchCategorias();
    } catch (err) {
      setNotif({ open: true, message: err.message, type: "error" });
    }
  };
  const handleEdit = async () => {
    try {
      const token = getToken();
      const res = await fetch(`${getApiUrl()}/api/categorias/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre: form.nombre }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        throw new Error('Sesión expirada. Inicia sesión nuevamente.');
      }
      if (res.status === 403) {
        setNotif({ open: true, message: data.message || 'No tienes permiso para editar categorías.', type: 'error' });
        return;
      }
      if (!res.ok) {
        throw new Error(data.message || "Error al editar categoría");
      }
      setNotif({ open: true, message: "Categoría editada", type: "success" });
      setEditOpen(false);
      setForm({ nombre: "" });
      setEditId(null);
      await fetchCategorias();
    } catch (err) {
      setNotif({ open: true, message: err.message, type: "error" });
    }
  };
  const handleDelete = async () => {
    try {
      const token = getToken();
      const res = await fetch(`${getApiUrl()}/api/categorias/${deleteId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        throw new Error('Sesión expirada. Inicia sesión nuevamente.');
      }
      if (res.status === 403) {
        setNotif({ open: true, message: data.message || 'No tienes permiso para eliminar categorías.', type: 'error' });
        return;
      }
      if (!res.ok) {
        throw new Error(data.message || "Error al eliminar categoría");
      }
      setNotif({ open: true, message: "Categoría eliminada", type: "success" });
      setConfirmOpen(false);
      setDeleteId(null);
      await fetchCategorias();
    } catch (err) {
      setNotif({ open: true, message: err.message, type: "error" });
    }
  };
  const showTooltip = (text, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({ text, x: rect.left + rect.width / 2, y: rect.top, show: true });
  };
  const hideTooltip = () => setTooltip({ ...tooltip, show: false });

  return (
    <section className="p-6 animate-fade-in bg-gradient-to-br from-primary-100 via-blue-100 to-gray-100 min-h-[80vh] flex flex-col items-center justify-center">
      <Notification open={notif.open} message={notif.message} type={notif.type} onClose={() => setNotif({ ...notif, open: false })} />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Nueva categoría">
        <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); handleSave(); }}>
          <input
            className="border rounded px-3 py-2"
            placeholder="Nombre de la categoría"
            required
            value={form.nombre}
            onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition" type="submit">Guardar</button>
        </form>
      </Modal>
      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Editar categoría">
        <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); handleEdit(); }}>
          <input
            className="border rounded px-3 py-2"
            placeholder="Nombre de la categoría"
            required
            value={form.nombre}
            onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition" type="submit">Guardar cambios</button>
        </form>
      </Modal>
      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title="¿Eliminar categoría?">
        <div className="flex flex-col gap-4">
          <p className="text-gray-700">¿Estás seguro de que deseas eliminar esta categoría? Esta acción no se puede deshacer.</p>
          <div className="flex gap-2 justify-end">
            <button className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300" onClick={() => setConfirmOpen(false)} type="button">Cancelar</button>
            <button className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700" onClick={handleDelete} type="button">Eliminar</button>
          </div>
        </div>
      </Modal>
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-3xl font-extrabold text-blue-700">Categorías</h2>
        <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition" onClick={handleAdd} title="Agregar nueva categoría">
          <PlusIcon className="h-5 w-5" /> Nueva categoría
        </button>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 border border-blue-100">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6 text-center text-blue-700">Cargando categorías...</div>
          ) : error ? (
            <div className="p-6 text-center text-red-600">{error}</div>
          ) : (
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="bg-blue-50">
                  <th className="px-4 py-2">Nombre</th>
                  <th className="px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categorias.length === 0 ? (
                  <tr><td colSpan={2} className="px-4 py-6 text-center text-gray-500">No hay categorías registradas.</td></tr>
                ) : (
                  categorias.map((cat) => {
                    const rowId = cat._id || cat.id;
                    return (
                    <tr key={rowId} className="hover:bg-blue-50 transition">
                      <td className="px-4 py-2">{cat.nombre}</td>
                      <td className="px-4 py-2 flex gap-2 items-center relative">
                        <button
                          className="text-blue-600 hover:underline flex items-center gap-1"
                          onMouseEnter={e => showTooltip('Editar', e)}
                          onMouseLeave={hideTooltip}
                          onClick={() => {
                            setEditOpen(true);
                            setEditId(rowId);
                            setForm({ nombre: cat.nombre });
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
