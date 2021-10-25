import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API || 'http://localhost:5000'
})

export { api }