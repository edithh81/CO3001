"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown } from "lucide-react";
import { BuyPaperOrderTrue } from "@/types";
import { getTotalOrderBuyPaper } from "@/services/GetHistoryBuyPaper";
import { set } from "zod";

type SortKey = keyof Pick<
    BuyPaperOrderTrue,
    "orderId" | "byStudent" | "total" | "status" | "at"
>;

const sampleOrders: BuyPaperOrderTrue[] = [
    {
        orderId: 1,
        byStudent: "John Doe",
        A4: 50,
        total: 50,
        status: "pending",
        at: "2023-06-01T10:00:00Z",
        method: "cash",
    },
    {
        orderId: 2,
        byStudent: "Jane Smith",
        A3: 10,
        A4: 20,
        total: 30,
        status: "completed",
        at: "2023-06-02T14:30:00Z",
        method: "credit card",
    },
    {
        orderId: 3,
        byStudent: "Bob Johnson",
        A4: 100,
        total: 100,
        status: "rejected",
        at: "2023-06-03T09:15:00Z",
        method: "bank transfer",
    },
    // Add more sample orders as needed
];

export default function Page() {
    const [orders, setOrders] = useState<BuyPaperOrderTrue[]>([]);
    const [sortKey, setSortKey] = useState<SortKey>("at");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [statusEdit, setStatusEdit] = useState<string>("all");

    useEffect(() => {
        /* getTotalOrderBuyPaper().then((res) => {
            if ("error" in res) {
                console.error("Error getting history of buy paper:", res.error);
            } else {
                setOrders(
                    res.map((order, index) => ({
                        ...order,
                        orderId: index + 1,
                    }))
                );
            }
        }); */
        setOrders(sampleOrders);
    }, []);

    const sortOrders = (ordersToSort: BuyPaperOrderTrue[]) => {
        return [...ordersToSort].sort((a, b) => {
            if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
            if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });
    };

    const filterOrders = (ordersToFilter: BuyPaperOrderTrue[]) => {
        if (statusFilter === "all") return sortOrders(ordersToFilter);
        return sortOrders(
            ordersToFilter.filter((order) => order.status === statusFilter)
        );
    };

    const handleStatusEdit = (orderId: number, status: string) => {
        setOrders(
            orders.map((order) =>
                order.orderId === orderId ? { ...order, status } : order
            )
        );

        // updateBuyPaperOrderStatus(orderId, status);
    };

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

    return (
        <Card className="w-full my-6 mr-6 ml-2">
            <CardHeader>
                <CardTitle className="text-2xl">Đơn mua giấy</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="mb-4">
                    <Select
                        value={statusFilter}
                        onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tất cả</SelectItem>
                            <SelectItem value="pending">
                                Đơn đang chờ
                            </SelectItem>
                            <SelectItem value="completed">
                                Đơn đã hoàn thành
                            </SelectItem>
                            <SelectItem value="rejected">Đơn đã huỷ</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                Mã đơn mua
                                <SortButton column="orderId" />
                            </TableHead>
                            <TableHead>
                                Sinh viên
                                <SortButton column="byStudent" />
                            </TableHead>
                            <TableHead>A3</TableHead>
                            <TableHead>A4</TableHead>
                            <TableHead>
                                Tổng cộng
                                <SortButton column="total" />
                            </TableHead>
                            <TableHead>
                                Trạng thái
                                <SortButton column="status" />
                            </TableHead>
                            <TableHead>
                                Ngày
                                <SortButton column="at" />
                            </TableHead>
                            <TableHead>Phương thức thanh toán</TableHead>
                            <TableHead>Chỉnh sửa trạng thái</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filterOrders(orders).map((order) => (
                            <TableRow key={order.orderId}>
                                <TableCell>{order.orderId}</TableCell>
                                <TableCell>{order.byStudent}</TableCell>
                                <TableCell>{order.A3 || "-"}</TableCell>
                                <TableCell>{order.A4 || "-"}</TableCell>
                                <TableCell>{order.total}</TableCell>
                                <TableCell>
                                    {order.status === "pending"
                                        ? "Đang chờ"
                                        : order.status === "completed"
                                        ? "Đã hoàn thành"
                                        : "Đã huỷ"}
                                </TableCell>
                                <TableCell>
                                    {new Date(order.at).toLocaleString()}
                                </TableCell>
                                <TableCell>{order.method}</TableCell>
                                <TableCell>
                                    <Select
                                        value={statusEdit}
                                        onValueChange={(e) => {
                                            handleStatusEdit(order.orderId, e);
                                            setStatusEdit(e);
                                        }}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Filter by status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">
                                                {order.status === "pending"
                                                    ? "Đang chờ"
                                                    : order.status ===
                                                      "completed"
                                                    ? "Đã hoàn thành"
                                                    : "Đã huỷ"}
                                            </SelectItem>
                                            <SelectItem value="pending">
                                                Đang chờ
                                            </SelectItem>
                                            <SelectItem value="completed">
                                                Đã hoàn thành
                                            </SelectItem>
                                            <SelectItem value="rejected">
                                                Đã huỷ
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
