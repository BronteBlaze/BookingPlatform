import axios from "axios";

let baseURL = "http://localhost:8585/api";

const API = axios.create({ baseURL }, { withCredentials: true });

API.interceptors.request.use(
  (req) => {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default API;
