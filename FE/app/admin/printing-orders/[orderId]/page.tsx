"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { PrintingOrder } from "@/types";
import {
    getOrderById,
    updateOrderStatus,
} from "@/services/PrintingOrderService";
import PrintingOrderViewCard from "@/components/card/PrintingOrderViewCard";

const mockData: PrintingOrder = {
    printerId: 2,
    fileName: "ÔN-TẬP-TRẮC-NGHIỆM_key_180_trắc_nghiệm.docx",
    byStudent: "2213046",
    specifications: {
        pages: "all",
        size: "A4",
        functional: "single",
        type: "bw",
        copies: 1,
        additionalInfo: "hehe",
    },
    totalPages: 1,
    fileId: "ÔN-TẬP-TRẮC-NGHIỆM_key_180_trắc_nghiệm.docx",
    status: "pending",
    at: "2024-11-29T14:43:25.928Z",
    campus: "cs1",
};

const page = () => {
    const params = useParams();
    const orderId = params.orderId;
    console.log(orderId);
    const [orderDetail, setOrderDetail] = useState<PrintingOrder>();
    useEffect(() => {
        getOrderById(Number(orderId)).then((res) => {
            if ("error" in res) {
                console.log("Error getting order detail");
                return;
            }
            setOrderDetail(res);
        });
        /* setOrderDetail(mockData); */
    }, []);

    const handleComplete = (comment: string) => {
        // updateOrderStatus(Number(orderId), "completed", comment);
        console.log("Order completed", comment);
    };

    const handleReject = (comment: string) => {
        // updateOrderStatus(Number(orderId), "rejected", comment);
        console.log("Order rejected", comment);
    };

    if (!orderDetail) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center p-4">
            <PrintingOrderViewCard
                orderId={Number(orderId)}
                {...orderDetail}
                onComplete={handleComplete}
                onReject={handleReject}
            />
        </div>
    );
};

export default page;
