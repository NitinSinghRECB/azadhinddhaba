// API configuration
// In development, Vite proxy forwards /api to localhost:5000
// In production (Vercel), set VITE_API_URL to your Render backend URL

const IS_DEV = import.meta.env.DEV;

export const API_URL = IS_DEV
    ? '/api'  // Use Vite proxy in development
    : (import.meta.env.VITE_API_URL || 'https://azadhinddhaba.onrender.com/api');

// For image URLs that come from the backend (e.g. /uploads/xxx.jpg)
export const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path; // Already absolute URL
    if (IS_DEV) return path; // Vite proxy handles /uploads
    // In production, prepend the backend URL
    const backendBase = import.meta.env.VITE_API_URL
        ? import.meta.env.VITE_API_URL.replace('/api', '')
        : 'https://azadhinddhaba.onrender.com';
    return `${backendBase}${path}`;
};
