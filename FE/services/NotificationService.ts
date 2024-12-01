import api from "@/api";
import { Notification } from "@/types";
export const getNotificationByStudentId = async (
    studentId: string
): Promise<{ data: Notification[] } | { error: string }> => {
    try {
        const response = await api.get(`/students/notification/${studentId}`);
        return { data: response.data.data };
    } catch (error) {
        console.log("Error getting notification:", error);
        return { error: "Internal server error" };
    }
};
