// @ts-nocheck
"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { PrintingOrder } from "@/types";
import {
    getOrderById,
    updateOrderStatus,
} from "@/services/PrintingOrderService";
import PrintingOrderViewCard from "@/components/card/AdminPrintingOrderViewCard";
import { updateStudentBalance } from "@/services/StudentService";
import { useRouter } from "next/navigation";
import AdminPrintingOrderViewCard from "@/components/card/AdminPrintingOrderViewCard";
const page = () => {
    const params = useParams();
    const orderId = params.orderId;
    const router = useRouter();
    const [orderDetail, setOrderDetail] = useState<PrintingOrder>();
    useEffect(() => {
        getOrderById(Number(orderId)).then((res) => {
            if ("error" in res) {
                console.log("Error getting order detail");
                return;
            }
            setOrderDetail(res);
        });
    }, []);

    const handleComplete = async (comment: string) => {
        await updateOrderStatus(Number(orderId), "completed", comment).then(
            (res) => {
                if ("error" in res) {
                    console.log("Error updating order status");
                    return;
                } else {
                    if (res.status === "success") {
                        console.log("Order completed", comment);
                    } else {
                        console.log("Error updating order status");
                        return;
                    }
                }
            }
        );
        await updateStudentBalance(
            orderDetail?.byStudent,
            orderDetail?.totalPages ? -orderDetail.totalPages : 0,
            orderDetail?.specifications.size
        );
        console.log("Order completed", comment);
        router.push("/admin/printing-orders");
    };

    const handleReject = async (comment: string) => {
        await updateOrderStatus(Number(orderId), "rejected", comment);
        console.log("Order rejected", comment);
    };

    if (!orderDetail) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center p-4">
            <AdminPrintingOrderViewCard
                orderId={Number(orderId)}
                {...orderDetail}
                onComplete={handleComplete}
                onReject={handleReject}
            />
        </div>
    );
};

export default page;
