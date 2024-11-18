import { api } from "@/api";

const getHistoryPrinting = async (studentId: string) => {
    try {
        const formData = new FormData();
        formData.append("studentId", studentId);
        const response = await api.get(`/history/printing/${studentId}`);
        return response;
    } catch (error) {
        console.log("Error getting history of printing:", error);
        throw error;
    }
};

export default getHistoryPrinting;
