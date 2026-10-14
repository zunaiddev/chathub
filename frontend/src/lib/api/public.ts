import axios from 'axios'
import toast from 'react-hot-toast'

const baseURL = import.meta.env.VITE_API_BASE_URL

export const publicApi = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

publicApi.interceptors.response.use(
  function handleResponse(response) {
    return response
  },
  function handleResponseError(error: unknown) {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        toast.error('Unable to reach the server. Check your internet connection and try again.')
      } else if (error.response.status >= 500) {
        toast.error('The server is not responding right now. Please try again later.')
      }
    }

    return Promise.reject(error)
  },
)

export default publicApi
