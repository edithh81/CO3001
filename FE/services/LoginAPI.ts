import { Credentials, StudentResponse } from "@/types";
import api from "@/api";

type LoginAPIResponse = {
    success: boolean;
    data?: StudentResponse;
};

const loginAPI = async (
    values: { username: string; password: string },
    type: string
): Promise<LoginAPIResponse> => {
    try {
        const response = await api.post("/login/student", {
            username: values.username,
            password: values.password,
        });

        console.log("từ api", response);
        const { success } = response.data;
        if (!success) {
            return {
                success: false,
            };
        }
        console.log(response.data);
        const { student_id, student_name, student_image } = response.data;
        console.log(student_id, student_name, student_image);
        return {
            success: true,
            data: {
                studentId: student_id,
                name: student_name,
                avatar: student_image,
            },
        };
    } catch (error) {
        console.log("API Error:", error);
        return {
            success: false,
        };
    }
};

export default loginAPI;