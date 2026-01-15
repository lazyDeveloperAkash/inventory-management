import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 404) {
      error.message = "Resource not found"
    } else if (error.response?.status === 400) {
      error.message = error.response.data.error || "Invalid request"
    } else if (error.response?.status === 500) {
      error.message = "Server error. Please try again later"
    } else if (!error.response) {
      error.message = "Unable to connect to server"
    }
    return Promise.reject(error)
  },
)

export default apiClient
