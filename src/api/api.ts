import axios from "axios";
export const API_KEY = import.meta.env.VITE_API_KEY

const api = axios.create({
  baseURL: "http://api.openweathermap.org",
  params: {
    appid: API_KEY
  }
});
export default api;

