
import { useNavigate } from "react-router-dom";


export default function Home() {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-soft p-12 flex flex-col items-center gap-6 border border-primary-100 transition-all duration-500">
        <h1 className="text-6xl font-display font-extrabold text-primary-500 mb-2 drop-shadow-lg tracking-tight transition-all duration-500">Punto SAS</h1>
        <p className="text-2xl text-primary-700 mb-1 font-semibold">Sistema de administración de negocio</p>
        <p className="text-primary-400 mb-4">Contabilidad, inventario, roles y más.</p>
        <div className="flex gap-4 mt-2">
          <button
            className="bg-primary-500 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-primary-600 hover:scale-105 transition-all duration-300 font-semibold text-lg"
            onClick={() => navigate("/tutorial")}
          >
            ¡Comienza ahora!
          </button>
        </div>
      </div>
      <div className="mt-12 flex flex-wrap gap-8 justify-center">
        <FeatureCard title="Inventario" desc="Controla productos y stock" color="from-primary-400 to-primary-600" onClick={() => navigate("/inventario")}/>
        <FeatureCard title="Contabilidad" desc="Gestiona cuentas y movimientos" color="from-success-500 to-green-700" onClick={() => navigate("/contabilidad")}/>
        <FeatureCard title="Roles" desc="Administra usuarios y permisos" color="from-accent-400 to-accent-500" onClick={() => navigate("/roles")}/>
      </div>
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
