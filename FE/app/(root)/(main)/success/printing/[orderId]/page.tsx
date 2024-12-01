"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getOrderById } from "@/services/PrintingOrderService";
import { PrintingOrder } from "@/types";
import PrintingOrderViewCard from "@/components/card/PrintingOverViewCard";
const page = () => {
    const params = useParams();
    const orderId = params.orderId as string;
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

    return (
        <div className="w-full flex flex-col justify-center items-center space-y-10">
            <h1 className="text-2xl font-bold">
                Đơn in số {orderId} đã được đặt thành công
            </h1>
            {orderDetail && <PrintingOrderViewCard {...orderDetail} />}
        </div>
    );
};

export default page;
