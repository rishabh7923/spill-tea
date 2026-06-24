import axios from "axios";

const instance = axios.create({
  baseURL: "http://spill-tea-production.up.railway.app/",
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;