import axios from "axios";

const api = axios.create({
    baseURL: process.env.BACKEND_API_URL,
});

const authAPI = axios.create({
    baseURL: process.env.AUTH_API_URL,
});

export { api, authAPI };
