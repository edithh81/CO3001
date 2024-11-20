"use client";
import React from "react";
import { campus } from "@/lib/constants";
import CampusCard from "@/components/card/CampusCard";
import { useAuth } from "@/context/AuthContext";
const page = () => {
    const { studentInfo } = useAuth();
    console.log("thông tin từ dashboard: ", studentInfo);
    return (
        <div className="w-3/4 h-full flex flex-col justify-center items-center space-y-20 max-md:space-y-10 p-4">
            <div className="flex flex-col space-y-2 justify-center items-center">
                <h1 className="text-5xl font-bold max-md:text-3xl">In ấn</h1>
                <p className="text-3xl font-semibold max-md:text-xl">
                    Chọn cơ sở in
                </p>
            </div>
            <div className="flex max-md:flex-col justify-center items-center w-full gap-10">
                {campus.map((campus) => (
                    <CampusCard
                        key={campus.id}
                        id={campus.id}
                        campusName={campus.name}
                        total={campus.total}
                        available={campus.available}
                    />
                ))}
            </div>
        </div>
    );
};

export default page;
