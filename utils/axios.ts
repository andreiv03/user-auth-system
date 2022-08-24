import axios, { AxiosRequestHeaders } from "axios";

const headers: AxiosRequestHeaders = {
  "Content-Type": "application/json"
};

export default axios.create({
  baseURL: "/api",
  headers,
  withCredentials: true
});