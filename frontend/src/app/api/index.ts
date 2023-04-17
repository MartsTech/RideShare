import { useAuthStore } from '@features/auth/auth-store'
import axios, { AxiosError } from 'axios'
import { useToast } from 'vue-toastification'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
})

api.interceptors.request.use((config) => {
  const authStore = useAuthStore()

  if (authStore.accessToken) {
    config.headers.Authorization = `Bearer ${authStore.accessToken}`
  }
  return config
})

api.interceptors.response.use(
  async (response) => {
    return response
  },
  (error: AxiosError) => {
    const { data, status } = error.response || {}

    switch (status) {
      case 401: {
        if (
          typeof data === 'object' &&
          data &&
          'message' in data &&
          typeof data.message === 'string'
        ) {
          const toast = useToast()
          toast.error(data.message)
        }
        break
      }
      case 500: {
        const toast = useToast()
        toast.error('Internal server error')
      }
    }

    return Promise.reject(error)
  }
)

export default api
