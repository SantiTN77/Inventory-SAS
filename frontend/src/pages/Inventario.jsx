
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArchiveBoxIcon, PlusIcon, TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import Modal from "../components/Modal";
import Notification from "../components/Notification";
import { getApiUrl } from "../utils/api";

// Utilidad para obtener el token JWT desde localStorage
function getToken() {
  return localStorage.getItem("token");
}

export default function Inventario() {
  const navigate = useNavigate();
  // Estado para el formulario de producto
  const [form, setForm] = useState({ nombre: '', stock: '', precio: '' });
  const [editId, setEditId] = useState(null); // id del producto a editar

  // Handler para guardar nuevo producto
  const handleSave = async () => {
    try {
      const token = getToken();
      const res = await fetch(`${getApiUrl()}/api/productos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre: form.nombre,
          stock: Number(form.stock),
          precio: Number(form.precio),
        }),
      });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('token');
          navigate('/login');
          throw new Error('Sesión expirada. Inicia sesión nuevamente.');
        }
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Error al crear producto');
      }
      setNotif({ open: true, message: 'Producto agregado con éxito', type: 'success' });
      setModalOpen(false);
      setForm({ nombre: '', stock: '', precio: '' });
      await fetchProductos();
    } catch (err) {
      setNotif({ open: true, message: err.message, type: 'error' });
    }
  };

  // Handler para editar producto
  const handleEdit = async () => {
    try {
      const token = getToken();
      const res = await fetch(`${getApiUrl()}/api/productos/${editId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre: form.nombre,
          stock: Number(form.stock),
          precio: Number(form.precio),
        }),
      });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('token');
          navigate('/login');
          throw new Error('Sesión expirada. Inicia sesión nuevamente.');
        }
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Error al editar producto');
      }
      setNotif({ open: true, message: 'Producto editado', type: 'success' });
      setEditOpen(false);
      setForm({ nombre: '', stock: '', precio: '' });
      setEditId(null);
      await fetchProductos();
    } catch (err) {
      setNotif({ open: true, message: err.message, type: 'error' });
    }
  };
  // Handler para abrir el modal de nuevo producto
  const handleAdd = () => {
    setModalOpen(true);
  };
  // Handler para eliminar producto
  const [deleteId, setDeleteId] = useState(null);
  const handleDelete = async () => {
    try {
      const token = getToken();
      const res = await fetch(`${getApiUrl()}/api/productos/${deleteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('token');
          navigate('/login');
          throw new Error('Sesión expirada. Inicia sesión nuevamente.');
        }
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Error al eliminar producto');
      }
      setNotif({ open: true, message: 'Producto eliminado', type: 'success' });
      setConfirmOpen(false);
      setDeleteId(null);
      await fetchProductos();
    } catch (err) {
      setNotif({ open: true, message: err.message, type: 'error' });
    }
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [notif, setNotif] = useState({ open: false, message: "", type: "info" });
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [tooltip, setTooltip] = useState({ text: "", x: 0, y: 0, show: false });
  const tooltipRef = useRef();

  // Estado para productos, carga y error
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Obtener productos al montar el componente y recargar
  async function fetchProductos() {
    setLoading(true);
    setError("");
    try {
      const token = getToken();
      const res = await fetch(`${getApiUrl()}/api/productos`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('token');
          navigate('/login');
          throw new Error('Sesión expirada. Inicia sesión nuevamente.');
        }
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Error al obtener productos");
      }
      const data = await res.json();
      // Acepta tanto array plano como { products: [...] }
      setProductos(Array.isArray(data) ? data : data.products || []);
    } catch (err) {
      setError(err.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { fetchProductos(); }, []);

  // Eliminar hooks y handlers duplicados
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

  // Obtener productos al montar el componente
  // --- ELIMINADO BLOQUE DUPLICADO DE HOOKS Y HANDLERS ---

  return (
    <section className="p-6 animate-fade-in bg-gradient-to-br from-primary-100 via-blue-100 to-gray-100 min-h-[80vh] flex flex-col items-center justify-center">
      <Notification open={notif.open} message={notif.message} type={notif.type} onClose={() => setNotif({ ...notif, open: false })} />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Nuevo producto">
        <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); handleSave(); }}>
          <input
            className="border rounded px-3 py-2"
            placeholder="Nombre del producto"
            required
            value={form.nombre}
            onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Stock"
            type="number"
            min="0"
            required
            value={form.stock}
            onChange={e => setForm(f => ({ ...f, stock: e.target.value }))}
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Precio"
            type="number"
            min="0"
            step="0.01"
            required
            value={form.precio}
            onChange={e => setForm(f => ({ ...f, precio: e.target.value }))}
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition" type="submit">Guardar</button>
        </form>
      </Modal>
      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Editar producto">
        <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); handleEdit(); }}>
          <input
            className="border rounded px-3 py-2"
            placeholder="Nombre del producto"
            required
            value={form.nombre}
            onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Stock"
            type="number"
            min="0"
            required
            value={form.stock}
            onChange={e => setForm(f => ({ ...f, stock: e.target.value }))}
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Precio"
            type="number"
            min="0"
            step="0.01"
            required
            value={form.precio}
            onChange={e => setForm(f => ({ ...f, precio: e.target.value }))}
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition" type="submit">Guardar cambios</button>
        </form>
      </Modal>
      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title="¿Eliminar producto?">
        <div className="flex flex-col gap-4">
          <p className="text-gray-700">¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.</p>
          <div className="flex gap-2 justify-end">
            <button className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300" onClick={() => setConfirmOpen(false)} type="button">Cancelar</button>
            <button className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700" onClick={handleDelete} type="button">Eliminar</button>
          </div>
        </div>
      </Modal>
      <div className="flex items-center gap-3 mb-6">
        <ArchiveBoxIcon className="h-8 w-8 text-blue-600" />
        <h2 className="text-3xl font-extrabold text-blue-700">Inventario</h2>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 border border-blue-100">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-lg text-blue-900">Productos</span>
          <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition" onClick={handleAdd} title="Agregar nuevo producto">
            <PlusIcon className="h-5 w-5" /> Nuevo producto
          </button>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6 text-center text-blue-700">Cargando productos...</div>
          ) : error ? (
            <div className="p-6 text-center text-red-600">{error}</div>
          ) : (
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
                {productos.length === 0 ? (
                  <tr><td colSpan={4} className="px-4 py-6 text-center text-gray-500">No hay productos registrados.</td></tr>
                ) : (
                  productos.map((prod) => (
                    <tr key={prod.id} className="hover:bg-blue-50 transition">
                      <td className="px-4 py-2">{prod.nombre}</td>
                      <td className="px-4 py-2">{prod.stock}</td>
                      <td className="px-4 py-2">${prod.precio?.toFixed(2)}</td>
                      <td className="px-4 py-2 flex gap-2 items-center relative">
                        <button
                          className="text-blue-600 hover:underline flex items-center gap-1"
                          onMouseEnter={e => showTooltip('Editar', e)}
                          onMouseLeave={hideTooltip}
                          onClick={() => {
                            setEditOpen(true);
                            setEditId(prod.id);
                            setForm({ nombre: prod.nombre, stock: prod.stock, precio: prod.precio });
                          }}
                        >
                          <PencilSquareIcon className="h-5 w-5" />
                        </button>
                        <button
                          className="text-red-500 hover:underline flex items-center gap-1"
                          onClick={() => {
                            setConfirmOpen(true);
                            setDeleteId(prod.id);
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
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}
