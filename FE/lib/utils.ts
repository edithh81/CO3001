import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
//import { getPDFPageCount } from "./serverUtils";
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
// utils.ts
