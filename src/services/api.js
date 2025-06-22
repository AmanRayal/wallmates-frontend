import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://wallmates-backend.onrender.com/api/v1",
  withCredentials: true,
});

export default api;
