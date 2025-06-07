// frontend/src/utils/getApiUrl.js
export const getApiUrl = () => {
  return import.meta.env.VITE_API_URL || 'http://localhost:3000';
};