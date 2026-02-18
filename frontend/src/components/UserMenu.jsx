import React, { useState, useRef, useEffect } from "react";
import { UserCircleIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../context/AuthContext";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const { user } = useAuth();

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Iniciales del nombre
  const inicial = user?.nombre ? user.nombre[0].toUpperCase() : 'U';
  const rol = user?.rol?.nombre || 'Usuario';
  return (
    <div className="relative select-none" ref={menuRef}>
      <button
        className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-blue-50 transition group"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        title="Menú de usuario"
      >
        <span className="bg-blue-200 text-blue-700 rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold shadow-inner">
          {inicial}
        </span>
        <span className="flex flex-col items-start">
          <span className="font-semibold text-blue-900 leading-tight">{user?.nombre || 'Usuario'}</span>
          <span className="text-xs text-gray-400 leading-tight">{rol.charAt(0).toUpperCase() + rol.slice(1)}</span>
        </span>
        <svg className={`w-5 h-5 ml-auto text-blue-400 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 bottom-12 w-48 bg-white shadow-xl rounded-xl border border-blue-100 py-2 animate-fade-in z-50">
          <a href="/perfil" className="flex items-center gap-2 w-full px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 transition" tabIndex={0}>
            <UserCircleIcon className="w-5 h-5" /> Perfil
          </a>
          <a href="/configuracion" className="flex items-center gap-2 w-full px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 transition" tabIndex={0}>
            <Cog6ToothIcon className="w-5 h-5" /> Configuración
          </a>
          <div className="border-t my-1 border-blue-100" />
          <a href="/login" className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition" tabIndex={0}>
            <ArrowRightOnRectangleIcon className="w-5 h-5" /> Cerrar sesión
          </a>
        </div>
      )}
    </div>
  );
}

