"use client";
import { useParams } from "next/navigation";

const page = () => {
    const params = useParams();
    const orderId = params.orderId as string;
    return (
        <div className="w-full flex justify-center items-center h-screen">
            <h1 className="text-2xl">
                Đơn in số {orderId} đã được đặt thành công
            </h1>
        </div>
    );
};

export default page;
