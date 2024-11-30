"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { getPrinter } from "@/services/PrinterService";
import { getTotalOrderPrinting } from "@/services/PrintingOrderService";
import { getTotalOrderBuyPaper } from "@/services/PaperOrderService";
import { BuyPaperOrder, printerDetail, PrintingOrder } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
type overview = {
    title: string;
    value: string;
    subValue?: string;
};

type statistic = {
    date: string;
    total: number;
};

const page = () => {
    const [overviewData, setOverviewData] = useState<overview[]>([]);
    const [printerCS1, setPrinterCS1] = useState<printerDetail[]>([]);
    const [printerCS2, setPrinterCS2] = useState<printerDetail[]>([]);
    const [totalPrinting, setTotalPrinting] = useState<PrintingOrder[]>([]);
    const [totalPaper, setTotalPaper] = useState<BuyPaperOrder[]>([]);
    const [printOrderData, setPrintOrderData] = useState<statistic[]>([]);
    const [paperOrderData, setPaperOrderData] = useState<statistic[]>([]);

    const router = useRouter();

    // all mock datas for now
    useEffect(() => {
        // getting data for each
        // await get
        /* getPrinter("cs1").then((res) => {
            if ("error" in res) {
                console.log("error");
            } else {
                setPrinterCS1(res);
            }
        });

        getPrinter("cs2").then((res) => {
            if ("error" in res) {
                console.log("error");
            } else {
                setPrinterCS2(res);
            }
        });

        getTotalOrderPrinting().then((res) => {
            if ("error" in res) {
                console.log("error");
            } else {
                setTotalPrinting(res);
            }
        });

        getTotalOrderBuyPaper().then((res) => {
            if ("error" in res) {
                console.log("error");
            } else {
                setTotalPaper(res);
            }
        });

        setOverviewData([
            {
                title: "Tổng số máy in",
                value: printerCS1.length + printerCS2.length + "",
                subValue: `Lý Thường Kiệt: ${printerCS1.length}, Dĩ An: ${printerCS2.length}`,
            },
            {
                title: "Số máy in đang hoạt động",
                value:
                    printerCS1.filter(
                        (printer) => printer.status === "available"
                    ).length +
                    printerCS2.filter(
                        (printer) => printer.status === "available"
                    ).length +
                    "",
                subValue: `${
                    printerCS1.filter(
                        (printer) => printer.status === "maintenance"
                    ).length +
                    printerCS2.filter(
                        (printer) => printer.status === "maintenance"
                    ).length
                } đang bảo trì`,
            },
            {
                title: "Tổng đơn in",
                value: totalPrinting.length + "",
                subValue: `${
                    totalPrinting.filter(
                        (order) => order.status === "completed"
                    ).length
                } hoàn thành, ${
                    totalPrinting.filter((order) => order.status === "pending")
                        .length
                } đang chờ, ${
                    totalPrinting.filter((order) => order.status === "rejected")
                        .length
                } từ chối`,
            },
            {
                title: "Tổng đơn mua giấy",
                value: totalPaper.length + "",
                subValue: `${
                    totalPaper.filter((order) => order.status === "completed")
                        .length
                } hoàn thành, ${
                    totalPaper.filter((order) => order.status === "pending")
                        .length
                } đang chờ, ${
                    totalPaper.filter((order) => order.status === "rejected")
                        .length
                } từ chối`,
            },
            {
                title: "Tổng thu nhập",
                value: formatPrice( totalPaper.reduce((acc, cur) => acc + cur.total, 0)),
            }
        ]); */

        setOverviewData([
            {
                title: "Tổng số máy in",
                value: "100",
                subValue: "Lý Thường Kiệt: 60, Dĩ An: 40",
            },
            {
                title: "Số máy in đang hoạt động",
                value: "90",
                subValue: "10 đang bảo trì",
            },
            {
                title: "Tổng đơn in",
                value: "150",
                subValue: "80 hoàn thành, 65 đang chờ, 5 từ chối",
            },
            {
                title: "Tổng đơn mua giấy",
                value: "50",
                subValue: "30 hoàn thành, 18 đang chờ, 2 từ chối",
            },
            {
                title: "Tổng doanh thu",
                value: formatPrice(1000000),
            },
        ]);
        try {
        } catch (error) {}
    }, []);

    useEffect(() => {
        function last7Days(
            total: PrintingOrder[] | BuyPaperOrder[]
        ): statistic[] {
            const statistics: statistic[] = [];
            const currentDate = new Date();

            for (let i = 6; i >= 0; i--) {
                const date = new Date(currentDate);
                date.setDate(currentDate.getDate() - i);

                const formattedDate = date.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                });

                const ordersForDate = total.filter((order) => {
                    const orderDate = new Date(order.at);
                    return (
                        orderDate.getDate() === date.getDate() &&
                        orderDate.getMonth() === date.getMonth() &&
                        orderDate.getFullYear() === date.getFullYear()
                    );
                });

                statistics.push({
                    date: formattedDate,
                    total: ordersForDate.length,
                });
            }

            return statistics;
        }

        /* setPrintOrderData(last7Days(totalPrinting));
        setPaperOrderData(last7Days(totalPaper)); */
        setPrintOrderData([
            { date: "20/11", total: 50 },
            { date: "21/11", total: 70 },
            { date: "22/11", total: 60 },
            { date: "23/11", total: 80 },
            { date: "24/11", total: 90 },
            { date: "25/11", total: 40 },
            { date: "26/11", total: 30 },
        ]);

        setPaperOrderData([
            { date: "20/11", total: 10 },
            { date: "21/11", total: 15 },
            { date: "22/11", total: 8 },
            { date: "23/11", total: 12 },
            { date: "24/11", total: 20 },
            { date: "25/11", total: 5 },
            { date: "26/11", total: 3 },
        ]);
    }, [totalPrinting, totalPaper]);
    return (
        <div className="flex w-full h-full">
            <div className="p-6 flex flex-col space-y-4 w-full">
                <h1 className="font-bold text-2xl">
                    Printing Service Dashboard
                </h1>
                <div className="w-full ">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {overviewData.map((item, index) => (
                            <Card key={index} className="">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {item.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {item.value}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {item?.subValue}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Print Orders (Last 7 Days)</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-2">
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={printOrderData}>
                                    <XAxis
                                        dataKey="date"
                                        stroke="#888888"
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#888888"
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `${value}`}
                                    />
                                    <Bar
                                        dataKey="total"
                                        fill="#adfa1d"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Paper Orders (Last 7 Days)</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-2">
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={paperOrderData}>
                                    <XAxis
                                        dataKey="date"
                                        stroke="#888888"
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#888888"
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `${value}`}
                                    />
                                    <Bar
                                        dataKey="total"
                                        fill="#2563eb"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid gap-6 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Print Orders</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Mã đơn đặt</TableHead>
                                        <TableHead>Cơ sở</TableHead>
                                        <TableHead>Người đặt</TableHead>
                                        <TableHead>Vào lúc</TableHead>
                                        <TableHead>Tổng giấy in</TableHead>
                                        <TableHead>Trạng thái</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {totalPrinting
                                        .slice(0, 4)
                                        .map((order, index) => (
                                            <TableRow
                                                key={index}
                                                onClick={() => {
                                                    router.push(
                                                        `./printing-orders/${order.orderId}`
                                                    );
                                                }}>
                                                <TableCell>
                                                    {order.orderId}
                                                </TableCell>
                                                <TableCell>
                                                    {order.campus === "cs1"
                                                        ? "Lý Thường Kiệt"
                                                        : "Dĩ An"}
                                                </TableCell>
                                                <TableCell>
                                                    {order.byStudent}
                                                </TableCell>
                                                <TableCell>
                                                    {order.at}
                                                </TableCell>

                                                <TableCell>
                                                    {order.totalPages}
                                                </TableCell>
                                                <TableCell>
                                                    {order.status}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Paper Orders</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Mã đơn đặt</TableHead>
                                        <TableHead>Người đặt</TableHead>
                                        <TableHead>Vào lúc</TableHead>
                                        <TableHead>Tổng tiền</TableHead>
                                        <TableHead>Trạng thái</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {totalPaper
                                        .slice(0, 4)
                                        .map((order, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    {order.orderId}
                                                </TableCell>
                                                <TableCell>
                                                    {order.byStudent}
                                                </TableCell>
                                                <TableCell>
                                                    {order.at}
                                                </TableCell>

                                                <TableCell>
                                                    {order.total}
                                                </TableCell>
                                                <TableCell>
                                                    {order.status}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default page;
