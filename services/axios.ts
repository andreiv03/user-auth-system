import axios from "axios";

export default axios.create({
  withCredentials: true,
  baseURL: "/api",
  headers: {
    "Content-type": "application/json"
  }
});