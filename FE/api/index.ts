import axios from "axios";
const api = axios.create({
    baseURL: process.env.BACKEND_API_URL,
});

const authAPI = axios.create({
    baseURL: "http://localhost:8000",
});

export { api, authAPI };
