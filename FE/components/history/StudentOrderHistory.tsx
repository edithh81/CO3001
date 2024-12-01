// @ts-nocheck
"use client";

import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { ArrowUpDown } from "lucide-react";
import { PrintingOrderTrue, BuyPaperOrderTrue } from "@/types";

interface OrderTableProps {
    orders: PrintingOrderTrue[] | BuyPaperOrderTrue[];
    type: "printing" | "buyPaper";
}

type SortKey = keyof PrintingOrderTrue | keyof BuyPaperOrderTrue;

export default function StudentOrderHistory({ orders, type }: OrderTableProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortKey, setSortKey] = useState<SortKey>("at");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const ordersPerPage = 10;

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortOrder("asc");
        }
    };

    const SortButton = ({ column }: { column: SortKey }) => (
        <Button
            variant="ghost"
            onClick={() => handleSort(column)}
            className="h-8 w-8 p-0">
            <span className="sr-only">Sort by {column}</span>
            <ArrowUpDown className="h-4 w-4" />
        </Button>
    );

    const sortOrders = (ordersToSort: typeof orders) => {
        return [...ordersToSort].sort((a, b) => {
            if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
            if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });
    };

    const filterOrders = (ordersToFilter: typeof orders) => {
        if (statusFilter === "all") return sortOrders(ordersToFilter);
        return sortOrders(
            ordersToFilter.filter((order) => order.status === statusFilter)
        );
    };

    const filteredOrders = filterOrders(orders);
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(
        indexOfFirstOrder,
        indexOfLastOrder
    );
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    return (
        <div>
            <div className="mb-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tất cả</SelectItem>
                        <SelectItem value="pending">Đang chờ</SelectItem>
                        <SelectItem value="completed">Đã hoàn thành</SelectItem>
                        <SelectItem value="rejected">Bị từ chối</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            Mã đơn <SortButton column="orderId" />
                        </TableHead>
                        <TableHead>
                            MSSV <SortButton column="byStudent" />
                        </TableHead>
                        {type === "printing" && (
                            <>
                                <TableHead>Tên file</TableHead>
                                <TableHead>Thông số in ấn</TableHead>
                                <TableHead>
                                    Tổng số trang{" "}
                                    <SortButton column="totalPages" />
                                </TableHead>
                            </>
                        )}
                        {type === "buyPaper" && (
                            <>
                                <TableHead>
                                    A3 <SortButton column="A3" />
                                </TableHead>
                                <TableHead>
                                    A4 <SortButton column="A4" />
                                </TableHead>
                                <TableHead>
                                    Tổng cộng <SortButton column="total" />
                                </TableHead>
                                <TableHead>Phương thức</TableHead>
                            </>
                        )}
                        <TableHead>
                            Trạng thái <SortButton column="status" />
                        </TableHead>
                        <TableHead>
                            Vào lúc <SortButton column="at" />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentOrders.map((order) => (
                        <TableRow key={order.orderId}>
                            <TableCell>{order.orderId}</TableCell>
                            <TableCell>{order.byStudent}</TableCell>
                            {type === "printing" && (
                                <>
                                    <TableCell className="line-clamp-1 w-[250px] whitespace-nowrap">
                                        {(order as PrintingOrderTrue).fileName}
                                    </TableCell>
                                    <TableCell>
                                        {`${
                                            (order as PrintingOrderTrue)
                                                .specifications.pages
                                        }, ${
                                            (order as PrintingOrderTrue)
                                                .specifications.size
                                        }, 
                    ${
                        (order as PrintingOrderTrue).specifications.functional
                    }, ${(order as PrintingOrderTrue).specifications.type}, 
                    ${
                        (order as PrintingOrderTrue).specifications.copies
                    } copies`}
                                    </TableCell>
                                    <TableCell>
                                        {
                                            (order as PrintingOrderTrue)
                                                .totalPages
                                        }
                                    </TableCell>
                                </>
                            )}
                            {type === "buyPaper" && (
                                <>
                                    <TableCell>
                                        {(order as BuyPaperOrderTrue).A3 || 0}
                                    </TableCell>
                                    <TableCell>
                                        {(order as BuyPaperOrderTrue).A4 || 0}
                                    </TableCell>
                                    <TableCell>
                                        {(order as BuyPaperOrderTrue).total}
                                    </TableCell>
                                    <TableCell>
                                        {(order as BuyPaperOrderTrue).method ===
                                        "cash"
                                            ? "Tiền mặt"
                                            : "BKPay"}
                                    </TableCell>
                                </>
                            )}
                            <TableCell>
                                {order.status === "pending"
                                    ? "Đang chờ"
                                    : order.status === "completed"
                                    ? "Đã hoàn thành"
                                    : "Bị từ chối"}
                            </TableCell>
                            <TableCell>
                                {new Date(order.at).toLocaleString()}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Pagination className="mt-4">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage((prev) => Math.max(prev - 1, 1));
                            }}
                            className={
                                currentPage === 1
                                    ? "pointer-events-none opacity-50"
                                    : ""
                            }
                        />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentPage(index + 1);
                                }}
                                isActive={currentPage === index + 1}>
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage((prev) =>
                                    Math.min(prev + 1, totalPages)
                                );
                            }}
                            className={
                                currentPage === totalPages
                                    ? "pointer-events-none opacity-50"
                                    : ""
                            }
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
