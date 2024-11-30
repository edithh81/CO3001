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

export const getAllPrinters = async (): Promise<
    printerDetail[] | { error: string }
> => {
    try {
        const response = await api.get(`/printers/getAll`);
        return response.data;
    } catch (error) {
        console.log("Error getting all printers:", error);
        throw error;
    }
};

export const addPrinter = async (printer: printerDetail) => {
    try {
        const response = await api.post(`/printers`, printer);
        return response;
    } catch (error) {
        console.log("Error adding printer:", error);
        throw error;
    }
};

export const updatePrinter = async (printer: printerDetail) => {
    try {
        const response = await api.put(`/printers/${printer.id}`, printer);
        return response;
    } catch (error) {
        console.log("Error updating printer:", error);
        throw error;
    }
};

export const deletePrinter = async (printerId: number) => {
    try {
        const response = await api.delete(`/printers/${printerId}`);
        return response;
    } catch (error) {
        console.log("Error deleting printer:", error);
        throw error;
    }
};
