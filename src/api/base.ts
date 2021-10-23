import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL as string | undefined,
  headers: {
    'Content-type': 'application/json',
  },
});

export default apiClient;