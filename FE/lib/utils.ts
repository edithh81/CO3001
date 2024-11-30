import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
//import { getPDFPageCount } from "./serverUtils";
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
// utils.ts

export const formatPrice = (price: number): string => {
    return price.toLocaleString("en-US", {
        style: "currency",
        currency: "VND",
        currencyDisplay: "code",
    });
};

export const formatDate = (isoString: string) =>
    new Date(isoString)
        .toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
        .replace(",", "");
