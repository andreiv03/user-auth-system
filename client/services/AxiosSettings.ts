import axios from "axios";

export default axios.create({
  withCredentials: true,
  baseURL: process.env.NODE_ENV === "development" ? "http://localhost:5000/api" : "https://andreiv03-e-commerce-website.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});