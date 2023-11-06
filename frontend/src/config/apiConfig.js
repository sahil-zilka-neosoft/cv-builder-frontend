import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000/api/v1"; // Use the environment variable if available, else use the default URL

const api = axios.create({
  baseURL: apiUrl,
});

export default api;
