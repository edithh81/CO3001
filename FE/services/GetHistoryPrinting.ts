import api from "@/api";
import { PrintingOrder, PrintingOrderTrue } from "@/types";

const getHistoryPrinting = async (studentId: string) => {
    try {
        const response = await api.get(`/history/printing/${studentId}`);
        return response;
    } catch (error) {
        console.log("Error getting history of printing:", error);
        throw error;
    }
};

export default getHistoryPrinting;

// admin
export const getTotalOrderPrinting = async (): Promise<
    PrintingOrderTrue[] | { error: string }
> => {
    try {
        const response = await api.get(`/orders/printing`);
        return response.data;
    } catch (error) {
        console.log("Error getting history of printing:", error);
        throw error;
    }
};

export const getOrderPrintingByCampus = async (campusId: string) => {
    try {
        const response = await api.get(`/orders/printing/campus/${campusId}`);
        return response;
    } catch (error) {
        console.log("Error getting history of printing:", error);
        throw error;
    }
};

export const getOrderPrintingByStudentId = async (studentId: string) => {
    try {
        const response = await api.get(`/orders/printing/student/${studentId}`);
        return response;
    } catch (error) {
        console.log("Error getting history of printing:", error);
        throw error;
    }
};

export const getOrderById = async (
    orderId: number
): Promise<PrintingOrder | { error: string }> => {
    try {
        const response = await api.get(`/orders/${orderId}`);
        return response.data;
    } catch (error) {
        return { error: "Internal server error" };
    }
};

export const updateOrderStatus = async (
    orderId: number,
    status: string,
    comment?: string
) => {
    try {
        const response = await api.put(`/orders/${orderId}`, {
            status,
            comment,
        });
        return response;
    } catch (error) {
        console.log("Error updating order status:", error);
        throw error;
    }
};
