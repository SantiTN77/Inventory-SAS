// Utilidad para obtener la URL base de la API según el entorno
export function getApiUrl() {
  return import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '';
}