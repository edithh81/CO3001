// @ts-nocheck
import api from "@/api";
import { printerDetail, printerDetailCreate } from "@/types";

export const getPrinterSpec = async (
    printerId: string
): Promise<printerDetail | { error: string }> => {
    try {
        const response = await api.get(`/printers/id/${printerId}`);
        return response.data.data;
    } catch (error) {
        console.log("Error getting printer specs:", error);
        throw error;
    }
};

export const getAllPrinters = async (): Promise<
    printerDetail[] | { error: string }
> => {
    try {
        const response = await api.get(`/printers/all`);
        return response.data.data;
    } catch (error) {
        console.log("Error getting all printers:", error);
        throw error;
    }
};

export const getPrintersByCampus = async (
    campus: string
): Promise<printerDetail[] | { error: string }> => {
    try {
        const response = await api.get(`/printers/campus/${campus}`);
        response.data.data.forEach((printer) => {
            printer.info = JSON.parse(printer.info);
        });
        return response.data.data;
    } catch (error) {
        console.log("Error getting all printers:", error);
        throw error;
    }
};

export const addPrinter = async (
    printer: printerDetailCreate
): Promise<{ printerId: number } | { error: string }> => {
    try {
        const response = await api.post(`/printers/addnew`, printer);
        return { printerId: Number(response.data.data) };
    } catch (error) {
        console.log("Error adding printer:", error);
        return { error: "Internal server error" };
    }
};

export const updatePrinter = async (printer: printerDetail) => {
    try {
        console.log("data sent", printer);
        const response = await api.put(
            `/printers/update/${printer.id}`,
            printer
        );
        return response;
    } catch (error) {
        console.log("Error updating printer:", error);
        throw error;
    }
};

export const deletePrinter = async (printerId: number) => {
    try {
        const response = await api.delete(`/printers/delete/${printerId}`);
        return response;
    } catch (error) {
        console.log("Error deleting printer:", error);
        throw error;
    }
};
