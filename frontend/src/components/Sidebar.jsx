import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  ArchiveBoxIcon,
  BanknotesIcon,
  UserGroupIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  BellIcon,
} from "@heroicons/react/24/outline";

const links = [
  { to: "/", label: "Inicio", icon: HomeIcon },
  { to: "/inventario", label: "Inventario", icon: ArchiveBoxIcon },
  { to: "/contabilidad", label: "Contabilidad", icon: BanknotesIcon },
  { to: "/roles", label: "Roles", icon: UserGroupIcon },
  { to: "/estadisticas", label: "Estadísticas", icon: ChartBarIcon },
  { to: "/notificaciones", label: "Notificaciones", icon: BellIcon },
  { to: "/configuracion", label: "Configuración", icon: Cog6ToothIcon },
];

export default function Sidebar({ open, onToggle }) {
  const location = useLocation();
  return (
    <aside
      className={`fixed top-0 left-0 h-full z-40 bg-white shadow-lg border-r border-blue-100 transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "-translate-x-64"} w-64 flex flex-col`}
    >
      <div className="flex items-center justify-between px-4 py-4 border-b border-blue-100">
        <span className="font-extrabold text-xl text-blue-700 tracking-tight select-none">Punto SAS</span>
        <button onClick={onToggle} className="text-blue-700 hover:bg-blue-100 rounded-full p-1 transition" title="Ocultar menú">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <nav className="flex-1 flex flex-col gap-1 mt-4">
        {links.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-3 px-6 py-3 rounded-lg mx-2 font-medium transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 ${location.pathname === to ? "bg-blue-100 text-blue-700 font-bold" : "text-gray-700"}`}
            title={label}
          >
            <Icon className="h-5 w-5" /> {label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-blue-100 text-xs text-gray-400">v1.0</div>
    </aside>
  );
}
