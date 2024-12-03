import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PrintingOrder, BuyPaperOrder } from "@/types";
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

export type ColStatistic = {
    date: string;
    total: number;
};

export type PieStatistic = {
    status: "completed" | "pending" | "rejected";
    total: number;
};

export function lastPeriodDays(
    total: PrintingOrder[] | BuyPaperOrder[],
    p: number,
    type: "col" | "pie"
): ColStatistic[] | PieStatistic[] {
    const currentDate = new Date();

    if (type === "col") {
        const statistics: ColStatistic[] = [];

        for (let i = p; i >= 0; i--) {
            const date = new Date(currentDate);
            date.setDate(currentDate.getDate() - i);

            const formattedDate = date.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });

            const ordersForDate = total.filter((order) => {
                const orderDate = new Date(order.at);
                return (
                    orderDate.getDate() === date.getDate() &&
                    orderDate.getMonth() === date.getMonth() &&
                    orderDate.getFullYear() === date.getFullYear()
                );
            });

            statistics.push({
                date: formattedDate,
                total: ordersForDate.length,
            });
        }

        return statistics;
    } else {
        const statusCounts: Record<string, number> = {
            completed: 0,
            pending: 0,
            rejected: 0,
        };

        const startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() - p);

        total.forEach((order) => {
            const orderDate = new Date(order.at);
            if (orderDate >= startDate && orderDate <= currentDate) {
                statusCounts[order.status] =
                    (statusCounts[order.status] || 0) + 1;
            }
        });

        return Object.entries(statusCounts).map(([status, total]) => ({
            status: status as "completed" | "pending" | "rejected",
            total,
        }));
    }
}
