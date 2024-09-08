import axios from "axios";
const baseURL = "http://localhost:5000";
export default axios.create({
  baseURL: baseURL,
});
export const axiosPrivate = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
