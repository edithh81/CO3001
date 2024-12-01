"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getOrderById } from "@/services/PaperOrderService";
import { BuyPaperOrder } from "@/types";
import BuyPaperOrderOverviewCard from "@/components/card/BuyPaperOverviewCard";
const page = () => {
    const params = useParams();
    const orderId = params.orderId as string;
    const [orderDetail, setOrderDetail] = useState<BuyPaperOrder>();
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
            <h1 className="text-2xl">
                Đơn mua giấy số {orderId} đã được đặt thành công
            </h1>
            {orderDetail && <BuyPaperOrderOverviewCard {...orderDetail} />}
        </div>
    );
};

export default page;
