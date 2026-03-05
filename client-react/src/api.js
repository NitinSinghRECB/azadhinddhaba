// API configuration
// If VITE_API_URL is set, it is used in both development and production.
// Otherwise, development uses Vite proxy (/api) and production uses Render fallback.

const IS_DEV = import.meta.env.DEV;
const API_FROM_ENV = import.meta.env.VITE_API_URL;

export const API_URL = API_FROM_ENV || (IS_DEV
    ? '/api'  // Use Vite proxy in development
    : 'https://azadhinddhaba-fion.vercel.app/');

// For image URLs that come from the backend (e.g. /uploads/xxx.jpg)
export const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path; // Already absolute URL
    if (IS_DEV) return path; // Vite proxy handles /uploads
    // In production, prepend the backend URL
    const backendBase = API_FROM_ENV
        ? API_FROM_ENV.replace('/api', '')
        : 'https://azadhinddhaba-fion.vercel.app/';
    return `${backendBase}${path}`;
};


const API_BASE =
  import.meta.env.MODE === "production"
    ? "https://azad-hind-dhaba-backend.onrender.com/api"
    : "/api";

export default API_BASE;