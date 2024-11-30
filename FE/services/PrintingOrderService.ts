import api from "@/api";
import { PrintingOrder, PrintingOrderTrue } from "@/types";

export async function createOrder(
    params: PrintingOrder
): Promise<{ orderId: number } | { error: string }> {
    try {
        const response = await api.post(`/orders/create`, params);
        return { orderId: Number(response.data.data) };
    } catch (error) {
        console.log("Error creating order:", error);
        return { error: "Internal server error" };
    }
}

// admin
export const getTotalOrderPrinting = async (): Promise<
    PrintingOrderTrue[] | { error: string }
> => {
    try {
        const response = await api.get(`/orders/printing/all`);

        response.data.data.forEach((order) => {
            order.specifications = JSON.parse(order.specifications);
        });

        console.log("response", response.data.data);

        return response.data.data;
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
        const response = await api.get(`/orders/printing/byOrderId/${orderId}`);
        const { specifications, ...rest } = response.data.data;
        return { ...rest, specifications: JSON.parse(specifications) };
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
        const response = await api.put(`/orders/update/${orderId}`, {
            status,
            comment,
        });
        return response;
    } catch (error) {
        console.log("Error updating order status:", error);
        throw error;
    }
};
