import api from "@/api";
import { PrintingSpecs } from "@/types";
export const updatePrintingSpecifications = async (specs: PrintingSpecs) => {
    try {
        console.log("sent", specs);
        const response = await api.put("/admin/specification", specs);
    } catch (error) {}
};

export const getPrintingSpecifications = async (): Promise<
    { data: PrintingSpecs } | { error: string }
> => {
    try {
        const response = await api.get("/admin/specification/all");
        const { id, ...res } = response.data.data;
        return { data: res };
    } catch (error) {
        console.log("Error getting printing specifications:", error);
        return { error: "Internal server error" };
    }
};
