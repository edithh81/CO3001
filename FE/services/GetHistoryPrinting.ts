import api from "@/api";

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
export const getTotalOrderPrinting = async () => {
    try {
        const response = await api.get(`/orders/printing`);
        return response;
    } catch (error) {
        console.log("Error getting history of printing:", error);
        throw error;
    }
};

export const getOrderPrintingByCampus = async (campusId: string) => {
    try {
        const response = await api.get(`/orders/printing/${campusId}`);
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
