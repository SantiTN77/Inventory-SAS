import { Link } from "react-router-dom";

const funcionalidades = [
  {
    titulo: "Inventario en tiempo real",
    descripcion: "Visualiza stock, alertas y movimientos sin depender de hojas de cálculo dispersas.",
    icono: "📦",
  },
  {
    titulo: "Control por roles",
    descripcion: "Define permisos por módulo para compras, contabilidad, administración y operaciones.",
    icono: "🔐",
  },
  {
    titulo: "Reportes ejecutivos",
    descripcion: "Convierte datos operativos en métricas claras para tomar decisiones rápidas.",
    icono: "📊",
  },
];

const testimonios = [
  {
    nombre: "Laura Torres",
    cargo: "Gerente de Operaciones · Distribuidora Norte",
    comentario: "Reducimos quiebres de stock en 32% durante el primer trimestre usando Inventory-SAS.",
  },
  {
    nombre: "Carlos Rojas",
    cargo: "Director Financiero · FarmaCentral",
    comentario: "La visibilidad de costos y movimientos nos permitió cerrar reportes semanales en horas, no días.",
  },
  {
    nombre: "Ana Pérez",
    cargo: "Líder de TI · Logística 360",
    comentario: "La adopción fue muy rápida; el equipo entendió la plataforma en la primera semana.",
  },
];

const planes = [
  {
    nombre: "Starter",
    precio: "$29/mes",
    descripcion: "Ideal para equipos pequeños que inician control formal de inventario.",
    caracteristicas: ["Hasta 3 usuarios", "Módulo inventario", "Alertas de stock"],
  },
  {
    nombre: "Growth",
    precio: "$79/mes",
    descripcion: "Pensado para empresas en crecimiento con necesidades multiárea.",
    caracteristicas: ["Hasta 15 usuarios", "Roles y permisos", "Reportes y métricas"],
    destacado: true,
  },
  {
    nombre: "Enterprise",
    precio: "Custom",
    descripcion: "Escala con integraciones y soporte prioritario para operación crítica.",
    caracteristicas: ["Usuarios ilimitados", "Soporte dedicado", "Integración avanzada"],
  },
];

const aliados = ["Mercado Norte", "Logística 360", "FarmaCentral", "Distribuidora Atlas", "Retail Uno"];

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-100 text-gray-800">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="text-2xl font-display font-bold text-primary-700">Inventory-SAS</div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="rounded-xl border border-primary-200 px-4 py-2 font-semibold text-primary-600 hover:bg-primary-50 transition">
            Iniciar sesión
          </Link>
          <Link to="/login" className="rounded-xl bg-primary-500 px-4 py-2 font-semibold text-white hover:bg-primary-600 transition">
            Solicitar demo
          </Link>
        </div>
      </header>

      <section className="mx-auto grid w-full max-w-6xl gap-10 px-6 pb-16 pt-8 md:grid-cols-2 md:items-center">
        <div>
          <p className="mb-3 inline-flex rounded-full bg-primary-100 px-3 py-1 text-sm font-semibold text-primary-700">Gestión inteligente de inventarios</p>
          <h1 className="text-4xl font-display font-bold leading-tight text-primary-800 md:text-5xl">
            Controla inventario, compras y reportes desde una sola plataforma.
          </h1>
          <p className="mt-5 text-lg text-gray-600">
            Inventory-SAS centraliza operaciones, mejora trazabilidad y acelera decisiones con una experiencia moderna y fácil de adoptar.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/login" className="rounded-xl bg-primary-500 px-6 py-3 text-base font-semibold text-white shadow-soft hover:bg-primary-600 transition">
              Comenzar ahora
            </Link>
            <a href="#planes" className="rounded-xl border border-gray-300 px-6 py-3 text-base font-semibold text-gray-700 hover:bg-white transition">
              Ver precios
            </a>
          </div>
        </div>

        <div className="rounded-3xl bg-white/90 p-6 shadow-soft ring-1 ring-primary-100">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-500">Impacto promedio en clientes</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-success-100 p-4 text-center">
              <div className="text-2xl font-bold text-success-500">-32%</div>
              <div className="text-sm text-gray-700">Quiebres de stock</div>
            </div>
            <div className="rounded-2xl bg-info-100 p-4 text-center">
              <div className="text-2xl font-bold text-info-500">+41%</div>
              <div className="text-sm text-gray-700">Rotación eficiente</div>
            </div>
            <div className="rounded-2xl bg-accent-100 p-4 text-center">
              <div className="text-2xl font-bold text-accent-500">-55%</div>
              <div className="text-sm text-gray-700">Tiempo en reportes</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-14">
        <h2 className="text-center text-3xl font-display font-bold text-primary-800">Funcionalidades clave</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {funcionalidades.map((funcionalidad) => (
            <article key={funcionalidad.titulo} className="rounded-2xl bg-white p-6 shadow-soft ring-1 ring-gray-100">
              <div className="text-3xl">{funcionalidad.icono}</div>
              <h3 className="mt-4 text-xl font-bold text-gray-800">{funcionalidad.titulo}</h3>
              <p className="mt-2 text-gray-600">{funcionalidad.descripcion}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white/80 py-14">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="text-center text-3xl font-display font-bold text-primary-800">Lo que dicen nuestros clientes</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {testimonios.map((testimonio) => (
              <article key={testimonio.nombre} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-soft">
                <p className="text-gray-600">“{testimonio.comentario}”</p>
                <div className="mt-4">
                  <p className="font-semibold text-gray-800">{testimonio.nombre}</p>
                  <p className="text-sm text-gray-500">{testimonio.cargo}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="planes" className="mx-auto w-full max-w-6xl px-6 py-14">
        <h2 className="text-center text-3xl font-display font-bold text-primary-800">Planes flexibles</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {planes.map((plan) => (
            <article
              key={plan.nombre}
              className={`rounded-2xl p-6 shadow-soft ring-1 ${plan.destacado ? "bg-primary-600 text-white ring-primary-600" : "bg-white text-gray-800 ring-gray-100"}`}
            >
              <h3 className="text-2xl font-bold">{plan.nombre}</h3>
              <p className={`mt-2 text-3xl font-display font-bold ${plan.destacado ? "text-white" : "text-primary-700"}`}>{plan.precio}</p>
              <p className={`mt-3 ${plan.destacado ? "text-primary-100" : "text-gray-600"}`}>{plan.descripcion}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {plan.caracteristicas.map((caracteristica) => (
                  <li key={caracteristica}>• {caracteristica}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-primary-800 py-12 text-white">
        <div className="mx-auto w-full max-w-6xl px-6 text-center">
          <h2 className="text-2xl font-display font-bold">Empresas que ya operan con Inventory-SAS</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {aliados.map((aliado) => (
              <span key={aliado} className="rounded-full border border-primary-500/50 px-4 py-2 text-sm text-primary-100">
                {aliado}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
