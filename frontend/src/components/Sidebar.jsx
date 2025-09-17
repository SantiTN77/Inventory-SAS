import { Link, useLocation } from "react-router-dom";
import UserMenu from "./UserMenu";
import { useAuth } from "../context/AuthContext";

function SidebarSection({ title, children }) {
  return (
    <div className="mt-2 mb-1">
      <div className="px-6 py-1 text-xs font-bold text-blue-400 uppercase tracking-wider select-none">
        {title}
      </div>
      <div>{children}</div>
    </div>
  );
}
import {
  HomeIcon,
  ArchiveBoxIcon,
  BanknotesIcon,
  UserGroupIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  BellIcon,
} from "@heroicons/react/24/outline";

const allMainLinks = [
  { to: "/", label: "Inicio", icon: HomeIcon, modulo: "inicio" },
  { to: "/inventario", label: "Inventario", icon: ArchiveBoxIcon, modulo: "inventario" },
  { to: "/categorias", label: "Categorías", icon: ArchiveBoxIcon, modulo: "categorias" },
  { to: "/contabilidad", label: "Contabilidad", icon: BanknotesIcon, modulo: "contabilidad" },
  { to: "/roles", label: "Roles", icon: UserGroupIcon, modulo: "roles" },
];
const analyticsLinks = [
  { to: "/estadisticas", label: "Estadísticas", icon: ChartBarIcon },
];
const systemLinks = [
  { to: "/notificaciones", label: "Notificaciones", icon: BellIcon, badge: 2 },
  { to: "/configuracion", label: "Configuración", icon: Cog6ToothIcon },
];

export default function Sidebar({ open, onToggle }) {
  const location = useLocation();
  const { user } = useAuth();
  // Mostrar solo los módulos permitidos por tipo de usuario (rol)
  let modulosPermitidos = allMainLinks;
  if (user && user.rol && user.rol.nombre) {
    const rol = user.rol.nombre.toLowerCase();
    if (rol === "admin" || rol === "administrador" || rol === "superadmin") {
      modulosPermitidos = allMainLinks;
    } else if (rol === "contabilidad" || rol === "contable") {
      modulosPermitidos = allMainLinks.filter(link => ["inicio", "contabilidad"].includes(link.modulo));
    } else if (rol === "caja" || rol === "punto de venta") {
      modulosPermitidos = allMainLinks.filter(link => ["inicio", "inventario"].includes(link.modulo));
    } else if (rol === "usuario" || rol === "basico" || rol === "básico") {
      modulosPermitidos = allMainLinks.filter(link => ["inicio"].includes(link.modulo));
    } else {
      // Por defecto solo inicio
      modulosPermitidos = allMainLinks.filter(link => ["inicio"].includes(link.modulo));
    }
  }
  return (
    <aside
      className={`fixed top-0 left-0 h-full z-40 bg-white shadow-lg border-r border-blue-100 transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "-translate-x-64"} w-64 flex flex-col`}
    >
      <div className="flex items-center gap-3 px-4 py-4 border-b border-blue-100">
        <img src="/vite.svg" alt="Logo" className="h-8 w-8" />
        <span className="font-extrabold text-xl text-blue-700 tracking-tight select-none">Punto SAS</span>
        <button onClick={onToggle} className="ml-auto text-blue-700 hover:bg-blue-100 rounded-full p-1 transition" title="Ocultar menú">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <nav className="flex-1 flex flex-col gap-2 mt-2 overflow-y-auto">
        <SidebarSection title="General">
          {modulosPermitidos.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-6 py-3 rounded-lg mx-2 font-medium transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 ${location.pathname === to ? "bg-blue-100 text-blue-700 font-bold" : "text-gray-700"}`}
              title={label}
            >
              <Icon className="h-5 w-5" /> {label}
            </Link>
          ))}
        </SidebarSection>
        <SidebarSection title="Analítica">
          {analyticsLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-6 py-3 rounded-lg mx-2 font-medium transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 ${location.pathname === to ? "bg-blue-100 text-blue-700 font-bold" : "text-gray-700"}`}
              title={label}
            >
              <Icon className="h-5 w-5" /> {label}
            </Link>
          ))}
        </SidebarSection>
        <SidebarSection title="Sistema">
          {systemLinks.map(({ to, label, icon: Icon, badge }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-6 py-3 rounded-lg mx-2 font-medium transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 relative ${location.pathname === to ? "bg-blue-100 text-blue-700 font-bold" : "text-gray-700"}`}
              title={label}
            >
              <Icon className="h-5 w-5" /> {label}
              {badge && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5 font-bold shadow">{badge}</span>
              )}
            </Link>
          ))}
        </SidebarSection>
      </nav>
      <div className="mt-auto flex flex-col gap-2 p-4 border-t border-blue-100">
        <UserMenu />
        <div className="text-xs text-gray-400 mt-2">v1.0</div>
      </div>
    </aside>
  );
}
