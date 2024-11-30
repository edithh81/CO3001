import api from "@/api";
import { BuyPaperOrder } from "@/types";

const getHistoryBuyPaper = async (studentId: string) => {
    try {
        const response = await api.get(`/history/buy-paper/${studentId}`);
        return response;
    } catch (error) {
        console.log("Error getting history of buy paper:", error);
        throw error;
    }
};

export default getHistoryBuyPaper;

//admin

export const getTotalOrderBuyPaper = async (): Promise<
    { error: string } | BuyPaperOrder[]
> => {
    try {
        const response = await api.get(`/orders/buy-paper`);
        return response.data;
    } catch (error) {
        console.log("Error getting history of buy paper:", error);
        throw error;
    }
};

export const getOrderBuyPaperByStudentId = async (studentId: string) => {
    try {
        const response = await api.get(
            `/orders/buy-paper/student/${studentId}`
        );
        return response;
    } catch (error) {
        console.log("Error getting history of buy paper:", error);
        throw error;
    }
};
