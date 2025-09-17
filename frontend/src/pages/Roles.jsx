// NOTA: Cuando se implemente el CRUD real de roles y usuarios:
// - Proteger los endpoints en backend con JWT.
// - Aplicar el patrón de manejo de sesión y feedback de errores como en Inventario, Categorías y Contabilidad.
// - Redirigir a login si el token es inválido o expiró.
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserGroupIcon, PlusIcon, TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import Modal from "../components/Modal";
import Notification from "../components/Notification";
import { useAuth } from "../context/AuthContext";
import { getApiUrl } from "../utils/api";

const MODULES = [
  'inventario', 'categorias', 'contabilidad', 'proveedores', 'reportes', 'roles', 'planes', 'usuarios'
];
const ACTIONS = ['leer', 'crear', 'editar', 'eliminar'];

export default function Roles() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [notif, setNotif] = useState({ open: false, message: "", type: "info" });
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({ nombre: "", descripcion: "", permisos: [] });
  const [tooltip, setTooltip] = useState({ text: "", x: 0, y: 0, show: false });
  const tooltipRef = useRef();

  function getToken() { return localStorage.getItem('token'); }

  function ensurePerm(modulo, accion) {
    setForm(f => {
      const existing = f.permisos.find(p => p.modulo === modulo) || { modulo, acciones: [] };
      const acciones = new Set(existing.acciones);
      if (acciones.has(accion)) acciones.delete(accion); else acciones.add(accion);
      const updated = { modulo, acciones: Array.from(acciones) };
      const rest = f.permisos.filter(p => p.modulo !== modulo);
      return { ...f, permisos: [...rest, updated].sort((a,b)=>a.modulo.localeCompare(b.modulo)) };
    });
  }

  async function fetchRoles() {
    setLoading(true); setError("");
    try {
      const res = await fetch(`${getApiUrl()}/api/roles`, { headers: { Authorization: `Bearer ${getToken()}` } });
      const data = await res.json().catch(()=>({}));
      if (res.status === 401) { localStorage.removeItem('token'); navigate('/login'); throw new Error('Sesión expirada'); }
      if (res.status === 403) { setNotif({ open:true, message: data.message || 'Acceso denegado a roles.', type: 'error' }); return; }
      if (!res.ok) throw new Error(data.message || 'Error al obtener roles');
      setRoles(Array.isArray(data) ? data : data.roles || []);
    } catch (e) { setError(e.message || 'Error desconocido'); }
    finally { setLoading(false); }
  }

  useEffect(() => { fetchRoles(); }, []);

  const handleAdd = () => { setForm({ nombre: "", descripcion: "", permisos: [] }); setModalOpen(true); };
  async function handleSave() {
    try {
      const res = await fetch(`${getApiUrl()}/api/roles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(()=>({}));
      if (res.status === 401) { localStorage.removeItem('token'); navigate('/login'); throw new Error('Sesión expirada'); }
      if (res.status === 403) { setNotif({ open:true, message: data.message || 'Sin permiso para crear roles.', type: 'error' }); return; }
      if (!res.ok) throw new Error(data.message || 'Error al crear rol');
      setNotif({ open:true, message:'Rol creado', type:'success' });
      setModalOpen(false); await fetchRoles();
    } catch(e) { setNotif({ open:true, message: e.message, type:'error' }); }
  }

  const openEdit = (role) => {
    setEditId(role._id || role.id);
    setForm({ nombre: role.nombre || '', descripcion: role.descripcion || '', permisos: (role.permisos || []).map(p=>({ modulo: p.modulo, acciones: Array.isArray(p.acciones)? p.acciones: [] })) });
    setEditOpen(true);
  };
  async function handleEdit() {
    try {
      const res = await fetch(`${getApiUrl()}/api/roles/${editId}`, {
        method: 'PUT', headers: { 'Content-Type':'application/json', Authorization: `Bearer ${getToken()}` }, body: JSON.stringify(form)
      });
      const data = await res.json().catch(()=>({}));
      if (res.status === 401) { localStorage.removeItem('token'); navigate('/login'); throw new Error('Sesión expirada'); }
      if (res.status === 403) { setNotif({ open:true, message: data.message || 'Sin permiso para editar roles.', type: 'error' }); return; }
      if (!res.ok) throw new Error(data.message || 'Error al actualizar rol');
      setNotif({ open:true, message:'Rol actualizado', type:'success' });
      setEditOpen(false); setEditId(null); await fetchRoles();
    } catch(e) { setNotif({ open:true, message: e.message, type:'error' }); }
  }

  async function handleDelete() {
    try {
      const res = await fetch(`${getApiUrl()}/api/roles/${deleteId}`, { method:'DELETE', headers: { Authorization: `Bearer ${getToken()}` } });
      const data = await res.json().catch(()=>({}));
      if (res.status === 401) { localStorage.removeItem('token'); navigate('/login'); throw new Error('Sesión expirada'); }
      if (res.status === 403) { setNotif({ open:true, message: data.message || 'Sin permiso para eliminar roles.', type: 'error' }); return; }
      if (!res.ok) throw new Error(data.message || 'Error al eliminar rol');
      setNotif({ open:true, message:'Rol eliminado', type:'success' }); setConfirmOpen(false); setDeleteId(null); await fetchRoles();
    } catch(e) { setNotif({ open:true, message: e.message, type:'error' }); }
  }

  const showTooltip = (text, e) => { const r = e.currentTarget.getBoundingClientRect(); setTooltip({ text, x: r.left + r.width/2, y: r.top, show:true }); };
  const hideTooltip = () => setTooltip({ ...tooltip, show: false });

  return (
    <section className="p-6 animate-fade-in bg-gradient-to-br from-accent-100 via-orange-100 to-gray-100 min-h-[80vh] flex flex-col items-center justify-center">
      <Notification open={notif.open} message={notif.message} type={notif.type} onClose={() => setNotif({ ...notif, open: false })} />

      {/* Crear rol */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Nuevo rol">
        <form className="flex flex-col gap-4" onSubmit={e=>{e.preventDefault();handleSave();}}>
          <input className="border rounded px-3 py-2" placeholder="Nombre del rol" required value={form.nombre} onChange={e=>setForm(f=>({...f, nombre:e.target.value}))} />
          <input className="border rounded px-3 py-2" placeholder="Descripción" value={form.descripcion} onChange={e=>setForm(f=>({...f, descripcion:e.target.value}))} />
          <div className="max-h-64 overflow-auto border rounded p-2">
            {MODULES.map(m => (
              <div key={m} className="flex items-center gap-4 py-1">
                <span className="w-40 text-sm font-semibold capitalize">{m}</span>
                {ACTIONS.map(a => (
                  <label key={a} className="text-sm flex items-center gap-1">
                    <input type="checkbox" onChange={()=>ensurePerm(m,a)} checked={!!form.permisos.find(p=>p.modulo===m && p.acciones?.includes(a))} /> {a}
                  </label>
                ))}
              </div>
            ))}
          </div>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-4 py-2 rounded-lg shadow transition" type="submit">Guardar</button>
        </form>
      </Modal>

      {/* Editar rol */}
      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Editar rol">
        <form className="flex flex-col gap-4" onSubmit={e=>{e.preventDefault();handleEdit();}}>
          <input className="border rounded px-3 py-2" placeholder="Nombre del rol" required value={form.nombre} onChange={e=>setForm(f=>({...f, nombre:e.target.value}))} />
          <input className="border rounded px-3 py-2" placeholder="Descripción" value={form.descripcion} onChange={e=>setForm(f=>({...f, descripcion:e.target.value}))} />
          <div className="max-h-64 overflow-auto border rounded p-2">
            {MODULES.map(m => (
              <div key={m} className="flex items-center gap-4 py-1">
                <span className="w-40 text-sm font-semibold capitalize">{m}</span>
                {ACTIONS.map(a => (
                  <label key={a} className="text-sm flex items-center gap-1">
                    <input type="checkbox" onChange={()=>ensurePerm(m,a)} checked={!!form.permisos.find(p=>p.modulo===m && p.acciones?.includes(a))} /> {a}
                  </label>
                ))}
              </div>
            ))}
          </div>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-4 py-2 rounded-lg shadow transition" type="submit">Guardar cambios</button>
        </form>
      </Modal>

      {/* Confirmación eliminar */}
      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title="¿Eliminar rol?">
        <div className="flex flex-col gap-4">
          <p className="text-gray-700">Esta acción no se puede deshacer.</p>
          <div className="flex gap-2 justify-end">
            <button className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300" onClick={() => setConfirmOpen(false)} type="button">Cancelar</button>
            <button className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700" onClick={handleDelete} type="button">Eliminar</button>
          </div>
        </div>
      </Modal>

      <div className="flex items-center gap-3 mb-6">
        <UserGroupIcon className="h-8 w-8 text-yellow-500" />
        <h2 className="text-3xl font-extrabold text-yellow-600">Roles y Permisos</h2>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 border border-yellow-100 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-lg text-yellow-900">Roles</span>
          <button className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-4 py-2 rounded-lg shadow transition" onClick={handleAdd} title="Agregar nuevo rol">
            <PlusIcon className="h-5 w-5" /> Nuevo rol
          </button>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6 text-center text-yellow-700">Cargando roles...</div>
          ) : error ? (
            <div className="p-6 text-center text-red-600">{error}</div>
          ) : (
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="bg-yellow-50">
                  <th className="px-4 py-2">Nombre</th>
                  <th className="px-4 py-2">Descripción</th>
                  <th className="px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {roles.length === 0 ? (
                  <tr><td colSpan={3} className="px-4 py-6 text-center text-gray-500">No hay roles registrados.</td></tr>
                ) : roles.map((r) => {
                  const rowId = r._id || r.id;
                  return (
                    <tr key={rowId} className="hover:bg-yellow-50 transition">
                      <td className="px-4 py-2 capitalize">{r.nombre}</td>
                      <td className="px-4 py-2">{r.descripcion || '-'}</td>
                      <td className="px-4 py-2 flex gap-2 items-center relative">
                        <button className="text-yellow-700 hover:underline flex items-center gap-1" onMouseEnter={e=>showTooltip('Editar', e)} onMouseLeave={hideTooltip} onClick={()=>openEdit(r)}>
                          <PencilSquareIcon className="h-5 w-5" />
                        </button>
                        <button className="text-red-500 hover:underline flex items-center gap-1" onClick={()=>{setConfirmOpen(true); setDeleteId(rowId);}} onMouseEnter={e=>showTooltip('Eliminar', e)} onMouseLeave={hideTooltip}>
                          <TrashIcon className="h-5 w-5" />
                        </button>
                        {tooltip.show && (
                          <span ref={tooltipRef} className="pointer-events-none fixed z-50 px-2 py-1 bg-black text-white text-xs rounded shadow animate-fade-in" style={{ left: tooltip.x, top: tooltip.y - 32, transform: 'translate(-50%, -100%)' }}>{tooltip.text}</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}
