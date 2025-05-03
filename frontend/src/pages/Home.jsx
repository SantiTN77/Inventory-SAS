export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
      <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-3xl shadow-xl p-10 flex flex-col items-center gap-4 border border-blue-200">
        <h1 className="text-5xl font-extrabold text-blue-700 mb-2 drop-shadow">Punto SAS</h1>
        <p className="text-xl text-gray-700 mb-1 font-medium">Sistema de administración de negocio</p>
        <p className="text-gray-500 mb-4">Contabilidad, inventario, roles y más.</p>
        <div className="flex gap-4 mt-2">
          <span className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">¡Comienza ahora!</span>
          <span className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg shadow hover:bg-yellow-300 transition">Ver módulos</span>
        </div>
      </div>
      <div className="mt-10 flex flex-wrap gap-6 justify-center">
        <FeatureCard title="Inventario" desc="Controla productos y stock" color="from-blue-400 to-blue-600" />
        <FeatureCard title="Contabilidad" desc="Gestiona cuentas y movimientos" color="from-green-400 to-green-600" />
        <FeatureCard title="Roles" desc="Administra usuarios y permisos" color="from-yellow-400 to-yellow-600" />
      </div>
    </section>
  );
}

function FeatureCard({ title, desc, color }) {
  return (
    <div className={`w-60 h-32 bg-gradient-to-br ${color} rounded-xl shadow-lg flex flex-col justify-center items-center text-white hover:scale-105 transition-all duration-200` }>
      <span className="text-2xl font-bold mb-1 drop-shadow">{title}</span>
      <span className="text-md opacity-90">{desc}</span>
    </div>
  );
}
