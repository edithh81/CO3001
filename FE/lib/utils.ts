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
