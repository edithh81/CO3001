import { Credentials } from "@/types";
import { authAPI } from "@/api";

const loginAPI = async (values: { username: string; password: string }, type: string) => {
    try {
        const response = await authAPI.post('/login/student', {
            username: values.username,
            password: values.password,
        });
        return response.data;
    } catch (error) {
        console.log("API Error:", error);
        throw error;
    }
};

export default loginAPI;
