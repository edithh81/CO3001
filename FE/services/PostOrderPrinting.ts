import api from "@/api";
import { PrintingOrder } from "@/types";

export default async function createOrder(params: PrintingOrder) {
    try {
        const response = await api.post(`/orders/printing`, params);
        return response;
    } catch (error) {
        console.log("Error creating order:", error);
        throw error;
    }
}
