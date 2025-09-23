import axios from 'axios'
import { BASE_URL, ENDPOINTS } from './endpoints'

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth APIs
export const loginUser = async (credentials) => {
  return await api.post(ENDPOINTS.AUTH.LOGIN, credentials)
}

export const logoutUser = async () => {
  return await api.post(ENDPOINTS.AUTH.LOGOUT)
}

export const getUserProfile = async () => {
  return await api.get(ENDPOINTS.AUTH.PROFILE)
}

// User APIs
export const getUsers = async (params) => {
  return await api.get(ENDPOINTS.USERS.LIST, { params })
}

export const createUser = async (userData) => {
  return await api.post(ENDPOINTS.USERS.CREATE, userData)
}

export const updateUser = async (id, userData) => {
  return await api.put(`${ENDPOINTS.USERS.UPDATE}/${id}`, userData)
}

export const deleteUser = async (id) => {
  return await api.delete(`${ENDPOINTS.USERS.DELETE}/${id}`)
}

// Music APIs
export const getMusic = async (params) => {
  return await api.get(ENDPOINTS.MUSIC.LIST, { params })
}

export const uploadMusic = async (formData) => {
  return await api.post(ENDPOINTS.MUSIC.UPLOAD, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export const updateMusic = async (id, musicData) => {
  return await api.put(`${ENDPOINTS.MUSIC.UPDATE}/${id}`, musicData)
}

export const deleteMusic = async (id) => {
  return await api.delete(`${ENDPOINTS.MUSIC.DELETE}/${id}`)
}

export default api