// API configuration
// In development, Vite proxy forwards /api to backend.
// In production, VITE_API_URL can be either:
// - https://your-backend.onrender.com
// - https://your-backend.onrender.com/api

const IS_DEV = import.meta.env.DEV;

const FALLBACK_BACKEND_URL = 'https://azadhinddhaba.onrender.com/api';

const normalizeApiUrl = (rawUrl) => {
    const cleaned = (rawUrl || '').trim().replace(/\/+$/, '');
    if (!cleaned) return FALLBACK_BACKEND_URL;
    return cleaned.endsWith('/api') ? cleaned : `${cleaned}/api`;
};

export const API_URL = IS_DEV
    ? '/api'
    : normalizeApiUrl(import.meta.env.VITE_API_URL);

const backendBaseFromApi = API_URL.replace(/\/api$/, '');

// For image URLs that come from the backend (e.g. /uploads/xxx.jpg)
export const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    if (IS_DEV) return path;
    return `${backendBaseFromApi}${path}`;
};
