import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function sortByQueue<T extends { queueLength: number }>(
    products: T[]
): T[] {
    return [...products].sort((a, b) => a.queueLength - b.queueLength);
}

export function sortByType<T extends { type: string }>(
    products: T[],
    type: string
): T[] {
    return [...products].filter((product) => product.type === type);
}

export function sortByFunction<T extends { functions: string[] }>(
    products: T[],
    functionality: string
): T[] {
    return [...products].filter((product) =>
        product.functions.includes(functionality)
    );
}
