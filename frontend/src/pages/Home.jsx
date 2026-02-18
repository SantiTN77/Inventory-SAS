

import { useNavigate } from "react-router-dom";
import DashboardCharts from "../components/DashboardCharts";



export default function Home() {
  const navigate = useNavigate();
  // Propuesta inicial de métricas (simuladas)
  const metrics = [
    {
      label: "Ventas del día",
      value: "$1,250.00",
      icon: (
        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      ),
      color: "from-green-400 to-green-500 via-green-400 to-green-500"
    },
    {
      label: "Productos bajos en stock",
      value: "3",
      icon: (
        <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 7v7m-7-7a9 9 0 1118 0 9 9 0 01-18 0z" /></svg>
      ),
      color: "from-yellow-400 to-yellow-500 via-yellow-400 to-yellow-500"
    },
    {
      label: "Usuarios activos",
      value: "5",
      icon: (
        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
      ),
      color: "from-blue-400 to-blue-500 via-blue-400 to-blue-500"
    }
  ];

  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
      {/* Aviso de bienvenida eliminado para enfoque directo en métricas y dashboard */}
      {/* Cards de métricas */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl px-2">
        {metrics.map((m, i) => (
          <div key={i} className={`bg-gradient-to-br ${m.color} rounded-2xl shadow-2xl p-8 flex items-center gap-6 min-w-[240px] border border-gray-200 hover:scale-105 transition-transform duration-300`}> 
            <div className="flex-shrink-0">{m.icon}</div>
            <div>
              <div className="text-3xl font-extrabold text-white drop-shadow-lg mb-1">{m.value}</div>
              <div className="text-white/90 text-base font-semibold tracking-wide uppercase">{m.label}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Gráficas del dashboard */}
      <DashboardCharts />
    </section>
  );
}

function FeatureCard({ title, desc, color, onClick }) {
  return (
    <button
      className={`w-64 h-36 bg-gradient-to-br ${color} rounded-2xl shadow-soft flex flex-col justify-center items-center text-white hover:scale-105 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-300 group`}
      onClick={onClick}
      title={`Ir a ${title}`}
    >
      <span className="text-3xl font-display font-bold mb-2 drop-shadow group-hover:scale-110 transition-transform duration-300">{title}</span>
      <span className="text-lg opacity-90 font-medium">{desc}</span>
    </button>
  );
}
