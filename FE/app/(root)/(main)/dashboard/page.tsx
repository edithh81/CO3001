"use client";
import React, { useState, useEffect } from "react";
import CampusCard from "@/components/card/CampusCard";
import { useAuth } from "@/context/AuthContext";
import { getAllPrinters, getPrintersByCampus } from "@/services/PrinterService";
import { printerDetail } from "@/types";

type campusData = {
    name: string;
    id: string;
    total: number;
    available: number;
};

/* const campus = [
    {
        name: "Lý Thường Kiệt",
        id: "cs1",
        total: 10,
        available: 5,
    },
    {
        name: "Dĩ An",
        id: "cs2",
        total: 10,
        available: 5,
    },
]; */

const page = () => {
    const { studentInfo } = useAuth();
    const [campus, setCampus] = useState<campusData[]>([]);
    const [campusA, setCampusA] = useState<printerDetail[]>([]);
    const [campusB, setCampusB] = useState<printerDetail[]>([]);
    useEffect(() => {
        getPrintersByCampus("cs1").then((res) => {
            if ("error" in res) {
                console.log("Error getting printers:", res.error);
            } else {
                setCampusA(res);
            }
        });
        getPrintersByCampus("cs2").then((res) => {
            if ("error" in res) {
                console.log("Error getting printers:", res.error);
            } else {
                setCampusB(res);
            }
        });
    }, []);

    useEffect(() => {
        console.log("campus A: ", campusA);
        console.log("campus B: ", campusB);
        setCampus([
            {
                name: "Lý Thường Kiệt",
                id: "cs1",
                total: campusA.length,
                available: campusA.filter(
                    (printer) => printer.status === "working"
                ).length,
            },
            {
                name: "Dĩ An",
                id: "cs2",
                total: campusB.length,
                available: campusB?.filter(
                    (printer) => printer.status === "working"
                ).length,
            },
        ]);
    }, [campusA, campusB]);

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
