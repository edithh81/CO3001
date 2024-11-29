"use client";
import { printerDetail } from "@/types";
import { useState, useEffect } from "react";
import { printerCampus } from "@/lib/constants";
const page = () => {
    const [printerList, setPrinterList] = useState<printerDetail[]>([]);
    const [cs1List, setCs1List] = useState<printerDetail[]>([]);
    const [cs2List, setCs2List] = useState<printerDetail[]>([]);
    useEffect(() => {
        // await get all printers, set printerList
    }, []);
    return (
        <div>
            List all printers, with filter to choose either cs1 or cs2, grid
            display
        </div>
    );
};

export default page;
