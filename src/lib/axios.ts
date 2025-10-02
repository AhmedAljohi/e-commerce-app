import axios from "axios";

export const api = axios.create({
  baseURL: "https://fakestoreapi.com", // default backend
  headers: {
    "Content-Type": "application/json",
  },
});