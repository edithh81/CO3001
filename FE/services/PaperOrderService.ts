import api from "@/api";
import { BuyPaperOrder, BuyPaperOrderTrue } from "@/types";

export const getOrderById = async (
    orderId: number
): Promise<BuyPaperOrder | { error: string }> => {
    try {
        const response = await api.get(`/orders/buy-paper/order/${orderId}`);
        return response.data.data;
    } catch (error) {
        console.log("Error getting order detail:", error);
        return { error: "Internal server error" };
    }
};

export const getTotalOrderBuyPaper = async (): Promise<
    { error: string } | BuyPaperOrderTrue[]
> => {
    try {
        const response = await api.get(`/orders/buy-paper/all`);
        return response.data.data;
    } catch (error) {
        console.log("Error getting history of buy paper:", error);
        throw error;
    }
};

export const getOrderBuyPaperByStudentId = async (
    studentId: string
): Promise<{ data: BuyPaperOrderTrue[] } | { error: string }> => {
    try {
        const response = await api.get(
            `/orders/buy-paper/student/${studentId}`
        );
        return { data: response.data.data };
    } catch (error) {
        console.log("Error getting history of buy paper:", error);
        throw error;
    }
};

export const updatePaperOrderStatus = async (
    orderId: number,
    status: string
): Promise<void> => {
    try {
        await api.put(`/orders/buy-paper/update/${orderId}`, {
            status: status,
        });
    } catch (error) {
        console.log("Error updating paper order status:", error);
        throw error;
    }
};

export const createPaperOrder = async (
    order: BuyPaperOrder
): Promise<{ orderId: number } | { error: string }> => {
    try {
        const response = await api.post(`/orders/buy-paper/create`, order);
        return { orderId: Number(response.data.data) };
    } catch (error) {
        console.log("Error adding paper order:", error);
        return { error: "Internal server error" };
    }
};
