// frontend/src/api/auth.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

export default API;
