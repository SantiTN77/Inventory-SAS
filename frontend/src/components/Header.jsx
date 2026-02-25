
import { Link } from "react-router-dom";
import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../context/AuthContext";

export default function Header({ onSidebarToggle }) {
  const { user } = useAuth();
  const inicial = user?.nombre ? user.nombre[0].toUpperCase() : 'U';
  const rol = user?.rol?.nombre || 'Usuario';
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-blue-100 shadow-sm flex items-center justify-between px-6 py-3">
      <div className="flex items-center gap-3">
        <button
          className="md:hidden text-blue-700 hover:bg-blue-100 rounded-full p-2 transition"
          onClick={onSidebarToggle}
          title="Mostrar menú"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <img src="/vite.svg" alt="Logo" className="h-7 w-7" />
        <span className="font-extrabold text-2xl text-blue-700 tracking-tight select-none">Punto SAS</span>
      </div>
      <div className="flex items-center gap-4">
        <Link to="/notificaciones" className="relative group" title="Notificaciones">
          <BellIcon className="h-6 w-6 text-blue-500 group-hover:text-blue-700 transition" />
        </Link>
        <Link to="/configuracion" className="group" title="Configuración">
          <Cog6ToothIcon className="h-6 w-6 text-blue-400 group-hover:text-blue-700 transition" />
        </Link>
        <Link to="/perfil" className="ml-2 flex items-center gap-2 group" title="Perfil">
          <span className="bg-blue-200 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold shadow-inner">{inicial}</span>
          <span className="hidden md:block font-semibold text-blue-900 group-hover:text-blue-700 transition">{user?.nombre || 'Usuario'}</span>
          <span className="hidden md:block text-xs text-gray-400 leading-tight ml-2">{rol.charAt(0).toUpperCase() + rol.slice(1)}</span>
        </Link>
      </div>
    </header>
  );
}

