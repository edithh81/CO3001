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
import { BuyPaperOrderTrue } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { getOrderBuyPaperByStudentId } from "@/services/PaperOrderService";
import { get } from "node:https";

export default function BuyPaperHistory() {
    const { studentInfo } = useAuth();
    const studentId = studentInfo.studentId;
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [paperOrders, setPaperOrders] = useState<BuyPaperOrderTrue[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<BuyPaperOrderTrue[]>(
        []
    );
    const [totalA4, setTotalA4] = useState(0);
    const [totalA3, setTotalA3] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    useEffect(() => {
        getOrderBuyPaperByStudentId(studentId).then((data) => {
            if ("error" in data) {
                console.error(data.error);
                return;
            }
            data.data.sort((a, b) => (a.orderId > b.orderId ? -1 : 1));
            setPaperOrders(data.data);
            setFilteredOrders(data.data);
            calculateTotals(data.data);
        });
    }, []);

    const handleSearch = () => {
        const filtered = paperOrders.filter((item) => {
            const orderDate = new Date(item.at);
            return (
                (!startDate || orderDate >= new Date(startDate)) &&
                (!endDate || orderDate <= new Date(endDate))
            );
        });
        setFilteredOrders(filtered);
        setCurrentPage(1);
        calculateTotals(filtered);
    };

    const calculateTotals = (data: BuyPaperOrderTrue[]) => {
        const a4Pages = data.reduce((sum, item) => sum + (item.A4 || 0), 0);
        const a3Pages = data.reduce((sum, item) => sum + (item.A3 || 0), 0);
        setTotalA4(a4Pages);
        setTotalA3(a3Pages);
    };

    const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);
    const currentData = filteredOrders.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    return (
        <div className="flex flex-col space-y-4 p-8 h-full justify-start items-start">
            <h1 className="text-2xl font-bold">Lịch sử mua giấy</h1>

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
                <Button
                    className="bg-[#030391] hover:bg-[#030391]/90 text-white"
                    onClick={handleSearch}>
                    Tìm kiếm
                </Button>
            </div>

            <div className="space-y-2">
                <h2 className="text-lg font-bold">Lịch sử mua giấy</h2>
                <div className="w-[1000px]">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-[#030391] hover:bg-[#030391] text-white h-[38px]">
                                <TableHead className="text-white">
                                    Thời gian
                                </TableHead>
                                <TableHead className="text-white">
                                    Sinh viên
                                </TableHead>
                                <TableHead className="text-white">
                                    Giấy A4
                                </TableHead>
                                <TableHead className="text-white">
                                    Giấy A3
                                </TableHead>
                                <TableHead className="text-white">
                                    Tổng tiền
                                </TableHead>
                                <TableHead className="text-white">
                                    Trạng thái
                                </TableHead>
                                <TableHead className="text-white">
                                    Phương thức
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="relative">
                            {currentData.map((item, index) => (
                                <TableRow key={index} className="h-[38px]">
                                    <TableCell className="align-top">
                                        {format(
                                            new Date(item.at),
                                            "dd/MM/yyyy HH:mm"
                                        )}
                                    </TableCell>
                                    <TableCell className="align-top">
                                        {item.byStudent}
                                    </TableCell>
                                    <TableCell className="align-top">
                                        {item.A4 || 0}
                                    </TableCell>
                                    <TableCell className="align-top">
                                        {item.A3 || 0}
                                    </TableCell>
                                    <TableCell className="align-top">
                                        {item.total.toLocaleString()} VND
                                    </TableCell>
                                    <TableCell className="align-top">
                                        {item.status === "pending"
                                            ? "Chờ xác nhận"
                                            : item.status === "completed"
                                            ? "Đã hoàn thành"
                                            : "Đã bị từ chối"}
                                    </TableCell>
                                    <TableCell className="align-top">
                                        {item.method === "cash"
                                            ? "Tiền mặt"
                                            : "BKPay"}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <Pagination>
                <PaginationContent>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink
                                className={
                                    currentPage === index + 1
                                        ? "bg-[#030391] text-white"
                                        : ""
                                }
                                onClick={() => setCurrentPage(index + 1)}>
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                </PaginationContent>
            </Pagination>

            <div className="space-y-2">
                <h2 className="text-lg font-bold">Tổng số giấy đã mua</h2>
                <p>Giấy A4: {totalA4}</p>
                <p>Giấy A3: {totalA3}</p>
            </div>
        </div>
    );
}
