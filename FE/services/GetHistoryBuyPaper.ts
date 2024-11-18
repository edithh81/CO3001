import { api } from "@/api";

const getHistoryBuyPaper = async (studentId: string) => {
    try {
        const formData = new FormData();
        formData.append("studentId", studentId);
        const response = await api.get(`/history/buy-paper/${studentId}`);
        return response;
    } catch (error) {
        console.log("Error getting history of buy paper:", error);
        throw error;
    }
};

export default getHistoryBuyPaper;
