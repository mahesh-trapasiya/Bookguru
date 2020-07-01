import axios from "axios";

const auth = JSON.parse(localStorage.getItem("auth"));
const token = auth && auth.token;

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "appplication/json",
  },
});

export default instance;
