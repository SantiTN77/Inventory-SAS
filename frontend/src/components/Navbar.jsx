import { Link, useLocation } from "react-router-dom";
import { HomeIcon, ArchiveBoxIcon, UserGroupIcon, BanknotesIcon } from "@heroicons/react/24/solid";

const navItems = [
  { to: "/", label: "Inicio", icon: HomeIcon },
  { to: "/inventario", label: "Inventario", icon: ArchiveBoxIcon },
  { to: "/contabilidad", label: "Contabilidad", icon: BanknotesIcon },
  { to: "/roles", label: "Roles", icon: UserGroupIcon },
];

export default function Navbar() {
  const location = useLocation();
  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-500 text-white px-6 py-3 flex items-center justify-between shadow-lg sticky top-0 z-50 transition-all">
      <div className="flex items-center gap-6">
        <span className="flex items-center gap-2 font-extrabold text-2xl tracking-tight select-none">
          <HomeIcon className="h-7 w-7 animate-pulse text-white drop-shadow" /> Punto SAS
        </span>
        {navItems.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-1 px-3 py-1 rounded-lg font-medium transition-all duration-200 hover:bg-blue-900/40 hover:scale-105 ${location.pathname === to ? "bg-white/20 text-yellow-300 shadow" : "text-white/90"}`}
          >
            <Icon className="h-5 w-5" /> {label}
          </Link>
        ))}
      </div>
      <span className="text-sm opacity-80 font-semibold bg-white/10 px-3 py-1 rounded-lg shadow">Admin</span>
    </nav>
  );
}
