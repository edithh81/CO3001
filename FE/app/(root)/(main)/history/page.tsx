'use client';
import React from "react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { set } from "zod";
const page = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [printHistory, setPrintHistory] = useState([{}]);
    const [totalA4, setTotalA4] = useState(0);
    const [totalA3, setTotalA3] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;
    const totalPages = Math.ceil(printHistory.length / rowsPerPage);

    const handleSearch = () => {
        // TODO: Call API to get print history here
        const mockData = [
            {time: "17/06/2024 10:30 - 11:00", printer: "001", fileName: "document1.pdf", size: "A4", pages: 5},
            {time: "07/09/2024 12:30 - 13:00", printer: "002", fileName: "report.pdf", size: "A3", pages: 2},
            {time: "15/09/2024 10:30 - 11:00", printer: "003", fileName: "document2.pdf", size: "A4", pages: 10},
            {time: "17/09/2024 12:30 - 13:00", printer: "004", fileName: "report.pdf", size: "A3", pages: 5},
            {time: "07/10/2024 12:30 - 13:00", printer: "005", fileName: "document3.pdf", size: "A4", pages: 15},
            {time: "15/10/2024 10:30 - 11:00", printer: "006", fileName: "document4.pdf", size: "A4", pages: 10},
            {time: "17/10/2024 12:30 - 13:00", printer: "007", fileName: "report.pdf", size: "A3", pages: 5},
            {time: "07/11/2024 12:30 - 13:00", printer: "008", fileName: "document5.pdf", size: "A4", pages: 15},
            {time: "15/11/2024 10:30 - 11:00", printer: "009", fileName: "document6.pdf", size: "A4", pages: 10},
            {time: "17/11/2024 12:30 - 13:00", printer: "010", fileName: "report.pdf", size: "A3", pages: 5},
        ];
        setPrintHistory(mockData);
        setTotalA4(mockData.filter((item) => item.size === "A4").length);
        setTotalA3(mockData.filter((item) => item.size === "A3").length);
        console.log(startDate, endDate);
    };
    
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const currentData = printHistory.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    return ( 
        <div className="flex flex-1 mx-20 my-2 p-1 w-full">
            <div>
                <h1 className="m-1 text-2xl font-bold">Lịch sử in ấn</h1>
                <h2 className="m-1 text-lg font-bold">Thời gian</h2>
                <div className="m-1">
                    <label className="m-1">
                        Ngày bắt đầu:
                        <input type="date" className="bg-gray-300 rounded-md m-1"
                        onChange={(e) => setStartDate(e.target.value)}/>
                    </label>
                    <label className="m-1">
                        Ngày kết thúc:
                        <input type="date" className="bg-gray-300 rounded-md m-1"
                        onChange={(e) => setEndDate(e.target.value)}/>
                    </label>
                    
                </div>
                <Button className=" text-white bg-main m-1" onClick={handleSearch}>
                        Tìm kiếm
                </Button>
                
                <h2 className="m-1 text-lg font-bold">Lịch sử in</h2>
                <table className="m-1">
                    <thead>
                    <tr className="bg-main text-white">
                        <th className="border border-white p-2">Thời gian</th>
                        <th className="border border-white p-2">Máy in</th>
                        <th className="border border-white p-2">Tên file in</th>
                        <th className="border border-white p-2">Kích thước in</th>
                        <th className="border border-white p-2">Số lượng giấy</th>
                    </tr>
                    </thead>
                    <tbody>
                        {currentData.map((item, index) => (
                            <tr key={index} className="text-center">
                                <td className="border border-black p-2">{item.time}</td>
                                <td className="border border-black p-2">{item.printer}</td>
                                <td className="border border-black p-2">{item.fileName}</td>
                                <td className="border border-black p-2">{item.size}</td>
                                <td className="border border-black p-2">{item.pages}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-end m-2 space-x-2">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <Button
                            key={index}
                            className={`px-3 py-1 ${
                                currentPage === index + 1 ? "bg-main text-white" : "bg-gray-300 text-black"
                            }`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </Button>
                    ))}
                </div>
                <h2 className="m-1 text-lg font-bold">Số lượng giấy đã in</h2>
                <p className="m-1 text-base">Giấy A4: {totalA4}</p>
                <p className="m-1 text-base">Giấy A3: {totalA3}</p>

            </div>
        </div>      
    );
};

export default page;
