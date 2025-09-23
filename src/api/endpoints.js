export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    PROFILE: '/auth/profile',
    REFRESH: '/auth/refresh',
  },
  USERS: {
    LIST: '/users',
    CREATE: '/users',
    UPDATE: '/users',
    DELETE: '/users',
    PROFILE: '/users/profile',
  },
  MUSIC: {
    LIST: '/music',
    UPLOAD: '/music/upload',
    UPDATE: '/music',
    DELETE: '/music',
    SEARCH: '/music/search',
  },
  DASHBOARD: {
    STATS: '/dashboard/stats',
    ANALYTICS: '/dashboard/analytics',
  }
}