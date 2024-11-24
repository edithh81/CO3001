import api from "@/api";
import { printerDetail } from "@/types";

export const getPrinter = async (
    campusId: string
): Promise<printerDetail[] | { error: string }> => {
    try {
        const response = await api.get(`/printers/${campusId}`);
        return response.data;
    } catch (error) {
        console.log("Error getting printers:", error);
        return { error: "Error getting printers" };
    }
};

export const getPrinterSpec = async (
    printerId: string
): Promise<printerDetail | { error: string }> => {
    try {
        const response = await api.get(`/printer/${printerId}`);
        return response.data;
    } catch (error) {
        console.log("Error getting printer specs:", error);
        throw error;
    }
};
