import { Credentials } from "@/types";
import { authAPI } from "@/api";

const loginAPI = async (credentials: Credentials, type: string) => {
    try {
        const formData = new FormData();
        for (const key in credentials) {
            formData.append(key, credentials[key]);
        }

        const response = await authAPI.post(`/auth/${type}`, formData);

        return response;
    } catch (error) {
        console.log("API Error:", error);
        throw error;
    }
};

export default loginAPI;
