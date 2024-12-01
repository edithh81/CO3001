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
import { ArrowUpDown, Check, X } from "lucide-react";
import { BuyPaperOrderTrue } from "@/types";
import {
    getTotalOrderBuyPaper,
    updatePaperOrderStatus,
} from "@/services/PaperOrderService";
import { updateStudentBalance } from "@/services/StudentService";

type SortKey = keyof Pick<
    BuyPaperOrderTrue,
    "orderId" | "byStudent" | "total" | "status" | "at"
>;

export default function Page() {
    const [orders, setOrders] = useState<BuyPaperOrderTrue[]>([]);
    const [sortKey, setSortKey] = useState<SortKey>("at");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [statusFilter, setStatusFilter] = useState<string>("all");

    useEffect(() => {
        getTotalOrderBuyPaper().then((res) => {
            if ("error" in res) {
                console.error("Error getting history of buy paper:", res.error);
            } else {
                setOrders(res);
            }
        });
    }, []);

    const handleApprove = (
        orderId: number,
        studentId: string,
        A3: number,
        A4: number
    ) => {
        console.log(A3, A4);
        updatePaperOrderStatus(orderId, "completed");
        updateStudentBalance(studentId, A3, "A3");
        updateStudentBalance(studentId, A4, "A4");
        //console.log("Approve order", orderId, studentId, A3, A4);
        setOrders(
            orders.map((order) =>
                order.orderId === orderId
                    ? { ...order, status: "completed" }
                    : order
            )
        );
    };

    const handleReject = (orderId: number) => {
        updatePaperOrderStatus(orderId, "rejected");
        console.log("Reject order", orderId);
        setOrders(
            orders.map((order) =>
                order.orderId === orderId
                    ? { ...order, status: "rejected" }
                    : order
            )
        );
    };

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
                            <TableHead>Hành động</TableHead>
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
                                <TableCell>
                                    {order.method === "cash"
                                        ? "Tiền mặt"
                                        : "BKPay"}
                                </TableCell>
                                <TableCell className="flex justify-start items-center space-x-2">
                                    {order.status === "pending" ? (
                                        <>
                                            <Button
                                                size="icon"
                                                className="bg-green-500 text-white hover:bg-green-500/90"
                                                onClick={() =>
                                                    handleApprove(
                                                        order.orderId,
                                                        order.byStudent,
                                                        order.A3 ? order.A3 : 0,
                                                        order.A4 ? order.A4 : 0
                                                    )
                                                }>
                                                <Check />
                                            </Button>
                                            <Button
                                                size="icon"
                                                className="bg-red-500 text-white hover:bg-red-500/90"
                                                onClick={() =>
                                                    handleReject(order.orderId)
                                                }>
                                                <X />
                                            </Button>
                                        </>
                                    ) : (
                                        "-"
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={order.status}
                                        onValueChange={(newStatus) =>
                                            handleStatusEdit(
                                                order.orderId,
                                                newStatus
                                            )
                                        }>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue
                                                placeholder={
                                                    order.status == "pending"
                                                        ? "Đang chờ"
                                                        : order.status ==
                                                          "completed"
                                                        ? "Đã hoàn thành"
                                                        : "Đã huỷ"
                                                }
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
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
