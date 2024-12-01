"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";
import { PrintingOrderTrue } from "@/types";
import { getOrderPrintingByStudentId } from "@/services/PrintingOrderService";
import { useAuth } from "@/context/AuthContext";
import { getStudentInfo } from "@/services/StudentService";
export default function PrintHistory() {
    const { studentInfo } = useAuth();
    const studentId = studentInfo.studentId;
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [printHistory, setPrintHistory] = useState<PrintingOrderTrue[]>([]);
    const [filteredHistory, setFilteredHistory] = useState<PrintingOrderTrue[]>(
        []
    );
    const [totalA4, setTotalA4] = useState(0);
    const [totalA3, setTotalA3] = useState(0);
    const [totalA4Left, setTotalA4Left] = useState(0);
    const [totalA3Left, setTotalA3Left] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    useEffect(() => {
        getOrderPrintingByStudentId(studentId).then((data) => {
            if ("error" in data) {
                console.error(data.error);
                return;
            }
            setPrintHistory(data.data);
            setFilteredHistory(data.data);
        });
        getStudentInfo(studentId).then((data) => {
            if ("error" in data) {
                console.error(data.error);
                return;
            }
            setTotalA4Left(data.data.A4);
            setTotalA3Left(data.data.A3);
        });
    }, []);

    const handleSearch = () => {
        const filtered = printHistory.filter((item) => {
            const orderDate = new Date(item.at);
            return (
                (!startDate || orderDate >= new Date(startDate)) &&
                (!endDate || orderDate <= new Date(endDate))
            );
        });
        setFilteredHistory(filtered);
        setCurrentPage(1);
        calculateTotals(filtered);
    };

    const handleReset = () => {
        setStartDate("");
        setEndDate("");
        setFilteredHistory(printHistory);
        setCurrentPage(1);
        calculateTotals(printHistory);
    };

    const calculateTotals = (data: PrintingOrderTrue[]) => {
        const a4Pages = data
            .filter((item) => item.specifications.size === "A4")
            .reduce((sum, item) => sum + item.totalPages, 0);
        const a3Pages = data
            .filter((item) => item.specifications.size === "A3")
            .reduce((sum, item) => sum + item.totalPages, 0);
        console.log("a4Pages", a4Pages);
        setTotalA4(a4Pages);
        setTotalA3(a3Pages);
    };

    useEffect(() => {
        calculateTotals(printHistory);
    }, [printHistory]);

    const totalPages = Math.ceil(filteredHistory.length / rowsPerPage);
    const currentData = filteredHistory.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    return (
        <div className="flex flex-col space-y-4 p-8 h-full justify-start items-start">
            <h1 className="text-2xl font-bold">Lịch sử in ấn</h1>
            <div className="space-y-2">
                <h2 className="text-lg font-bold">Thời gian</h2>
                <div className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                        <label>Ngày bắt đầu:</label>
                        <Input
                            type="date"
                            className="bg-gray-100"
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <label>Ngày kết thúc:</label>
                        <Input
                            type="date"
                            className="bg-gray-100"
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex justify-start items-center space-x-4">
                    <Button
                        className="bg-[#030391] hover:bg-[#030391]/90 text-white"
                        onClick={handleSearch}>
                        Tìm kiếm
                    </Button>
                    <Button
                        className="bg-[#030391] hover:bg-[#030391]/90 text-white"
                        onClick={handleReset}>
                        Đặt lại
                    </Button>
                </div>
            </div>

            <div className="space-y-2">
                <h2 className="text-lg font-bold">Lịch sử in</h2>
                <Table className="w-[1000px]">
                    <TableHeader className="h-[38px]">
                        <TableRow className="bg-main hover:bg-main text-white h-[38px]">
                            <TableHead className="text-white">
                                Thời gian
                            </TableHead>
                            <TableHead className="text-white">Cơ sở</TableHead>
                            <TableHead className="text-white">Máy in</TableHead>
                            <TableHead className="text-white">
                                Tên file in
                            </TableHead>
                            <TableHead className="text-white">
                                Kích thước in
                            </TableHead>
                            <TableHead className="text-white">
                                Số lượng giấy
                            </TableHead>
                            <TableHead className="text-white">
                                Trạng thái
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="items-start">
                        {currentData.map((item, index) => (
                            <TableRow key={index} className="h-[38px]">
                                <TableCell className="align-top">
                                    {format(
                                        new Date(item.at),
                                        "dd/MM/yyyy HH:mm"
                                    )}
                                </TableCell>
                                <TableCell className="align-top">
                                    {item.campus === "cs1"
                                        ? "Lý Thường Kiệt"
                                        : "Dĩ An"}
                                </TableCell>
                                <TableCell className="align-top">
                                    {item.printerId}
                                </TableCell>
                                <TableCell className="line-clamp-1 max-w-[300px] align-top whitespace-nowrap">
                                    {item.fileName}
                                </TableCell>
                                <TableCell className="align-top">
                                    {item.specifications.size}
                                </TableCell>
                                <TableCell className="align-top">
                                    {item.totalPages}
                                </TableCell>
                                <TableCell className="align-top">
                                    {item.status === "pending"
                                        ? "Chờ xác nhận"
                                        : item.status === "completed"
                                        ? "Đã hoàn thành"
                                        : "Đã bị từ chối"}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Pagination>
                <PaginationContent>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink
                                className={
                                    currentPage === index + 1
                                        ? "bg-[#030391] hover:bg-[#030391]/90 text-white"
                                        : ""
                                }
                                onClick={() => setCurrentPage(index + 1)}>
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                </PaginationContent>
            </Pagination>
            <div className="flex w-full justify-between items-center space-x-4">
                <div>
                    <h2 className="text-lg font-bold">Số lượng giấy đã in</h2>
                    <p>Giấy A4: {totalA4}</p>
                    <p>Giấy A3: {totalA3}</p>
                </div>
                <div>
                    <h2 className="text-lg font-bold">Số lượng giấy còn lại</h2>
                    <p>Giấy A4: {totalA4Left}</p>
                    <p>Giấy A3: {totalA3Left}</p>
                </div>
            </div>
        </div>
    );
}
