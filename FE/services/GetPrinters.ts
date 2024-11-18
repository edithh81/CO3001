import { api } from "@/api";

const getPrinter = async () => {
    try {
        const response = await api.get("/printers");
        return response;
    } catch (error) {
        console.log("Error getting printers:", error);
        throw error;
    }
};
