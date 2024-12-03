"use client";
import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { getPrintersByCampus } from "@/services/PrinterService";
import { getTotalOrderPrinting } from "@/services/PrintingOrderService";
import { getTotalOrderBuyPaper } from "@/services/PaperOrderService";
import {
    BuyPaperOrder,
    BuyPaperOrderTrue,
    printerDetail,
    PrintingOrder,
    PrintingOrderTrue,
} from "@/types";
import { formatPrice, formatDate } from "@/lib/utils";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Pie, PieChart, Cell, LabelList } from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
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
import { ColStatistic, PieStatistic, lastPeriodDays } from "@/lib/utils";
import { set } from "date-fns";
type overview = {
    title: string;
    value: string;
    subValue?: string;
};

const chartConfig = {
    completed: {
        label: "Completed",
        color: "#4bf542",
    },
    pending: {
        label: "Pending",
        color: "hsl(48, 96%, 53%)", // Yellow
    },
    rejected: {
        label: "Rejected",
        color: "hsl(0, 84%, 60%)", // Slightly red
    },
};

const page = () => {
    const [overviewData, setOverviewData] = useState<overview[]>([]);
    const [printerCS1, setPrinterCS1] = useState<printerDetail[]>([]);
    const [printerCS2, setPrinterCS2] = useState<printerDetail[]>([]);
    const [totalPrinting, setTotalPrinting] = useState<PrintingOrderTrue[]>([]);
    const [totalPaper, setTotalPaper] = useState<BuyPaperOrderTrue[]>([]);
    const [printOrderData, setPrintOrderData] = useState<ColStatistic[]>([]);
    const [paperOrderData, setPaperOrderData] = useState<ColStatistic[]>([]);
    const [piePrintingData, setPiePrintingData] = useState<PieStatistic[]>([]);
    const [piePaperData, setPiePaperData] = useState<PieStatistic[]>([]);
    const [period, setPeriod] = useState<number>(7);
    const router = useRouter();

    // all mock datas for now
    useEffect(() => {
        // getting data for each
        // await get
        getPrintersByCampus("cs1").then((res) => {
            if ("error" in res) {
                console.log("error");
            } else {
                setPrinterCS1(res);
            }
        });

        getPrintersByCampus("cs2").then((res) => {
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
    }, []);

    useEffect(() => {
        setOverviewData([
            {
                title: "Tổng số máy in",
                value: (printerCS1.length + printerCS2.length).toString(),
                subValue: `Lý Thường Kiệt: ${printerCS1.length}, Dĩ An: ${printerCS2.length}`,
            },
            {
                title: "Số máy in đang hoạt động",
                value:
                    printerCS1.filter((printer) => printer.status === "working")
                        .length +
                    printerCS2.filter((printer) => printer.status === "working")
                        .length +
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
                value: formatPrice(
                    totalPaper.reduce((acc, cur) => acc + cur.total, 0)
                ),
            },
        ]);
    }, [printerCS1, printerCS2, totalPrinting, totalPaper]);

    useEffect(() => {
        setPrintOrderData(
            lastPeriodDays(totalPrinting, period, "col") as ColStatistic[]
        );
        setPaperOrderData(
            lastPeriodDays(totalPaper, period, "col") as ColStatistic[]
        );
        setPiePrintingData(
            lastPeriodDays(totalPrinting, period, "pie") as PieStatistic[]
        );
        setPiePaperData(
            lastPeriodDays(totalPaper, period, "pie") as PieStatistic[]
        );
    }, [totalPrinting, totalPaper, period]);
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
                <div>
                    <Select
                        value={period.toString()}
                        onValueChange={(value) => setPeriod(parseInt(value))}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="7">7 ngày qua</SelectItem>
                            <SelectItem value="30">30 ngày qua</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Các đơn in</CardTitle>
                            <CardDescription>{period} ngày qua</CardDescription>
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
                                        allowDecimals={false}
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
                            <CardTitle>Các đơn mua giấy</CardTitle>
                            <CardDescription>{period} ngày qua</CardDescription>
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
                                        allowDecimals={false}
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Trạng thái các đơn in</CardTitle>
                            <CardDescription>{period} ngày qua</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer
                                config={chartConfig}
                                className="mx-auto aspect-square h-[300px]">
                                <PieChart>
                                    <ChartTooltip
                                        content={<ChartTooltipContent />}
                                    />
                                    <Pie
                                        data={piePrintingData}
                                        dataKey="total"
                                        nameKey="status"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={150}
                                        label>
                                        {piePrintingData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    chartConfig[entry.status]
                                                        .color
                                                }
                                            />
                                        ))}
                                        <LabelList
                                            dataKey="status"
                                            position="outside"
                                            className="fill-foreground"
                                            formatter={(
                                                value: keyof typeof chartConfig
                                            ) => chartConfig[value].label}
                                        />
                                    </Pie>
                                </PieChart>
                            </ChartContainer>
                        </CardContent>
                        <CardFooter className="flex justify-between text-sm text-muted-foreground">
                            <div>
                                Đã hoàn thành:{" "}
                                {piePrintingData.find(
                                    (d) => d.status === "completed"
                                )?.total || 0}
                            </div>
                            <div>
                                Đang chờ:{" "}
                                {piePrintingData.find(
                                    (d) => d.status === "pending"
                                )?.total || 0}
                            </div>
                            <div>
                                Đã từ chối:{" "}
                                {piePrintingData.find(
                                    (d) => d.status === "rejected"
                                )?.total || 0}
                            </div>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Trạng thái các đơn mua giấy</CardTitle>
                            <CardDescription>{period} ngày qua</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer
                                config={chartConfig}
                                className="mx-auto aspect-square h-[300px]">
                                <PieChart>
                                    <ChartTooltip
                                        content={<ChartTooltipContent />}
                                    />
                                    <Pie
                                        data={piePaperData}
                                        dataKey="total"
                                        nameKey="status"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={150}
                                        label>
                                        {piePaperData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    chartConfig[entry.status]
                                                        .color
                                                }
                                            />
                                        ))}
                                        <LabelList
                                            dataKey="status"
                                            position="outside"
                                            className="fill-foreground"
                                            formatter={(
                                                value: keyof typeof chartConfig
                                            ) => chartConfig[value].label}
                                        />
                                    </Pie>
                                </PieChart>
                            </ChartContainer>
                        </CardContent>
                        <CardFooter className="flex justify-between text-sm text-muted-foreground">
                            <div>
                                Đã hoàn thành:{" "}
                                {piePaperData.find(
                                    (d) => d.status === "completed"
                                )?.total || 0}
                            </div>
                            <div>
                                Đang chờ:{" "}
                                {piePaperData.find(
                                    (d) => d.status === "pending"
                                )?.total || 0}
                            </div>
                            <div>
                                Đã từ chối:{" "}
                                {piePaperData.find(
                                    (d) => d.status === "rejected"
                                )?.total || 0}
                            </div>
                        </CardFooter>
                    </Card>
                </div>
                <div className="grid gap-6 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Các đơn in gần đây</CardTitle>
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
                                        .sort((a, b) => {
                                            return a.orderId > b.orderId
                                                ? -1
                                                : 1;
                                        })
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
                                                    {formatDate(order.at)}
                                                </TableCell>

                                                <TableCell>
                                                    {order.totalPages}
                                                </TableCell>
                                                <TableCell>
                                                    {order.status === "pending"
                                                        ? "Đang chờ"
                                                        : order.status ===
                                                          "completed"
                                                        ? "Hoàn thành"
                                                        : "Bị từ chối"}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Các đơn mua giấy gần đây</CardTitle>
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
                                        .sort((a, b) => {
                                            return a.orderId > b.orderId
                                                ? -1
                                                : 1;
                                        })
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
                                                    {formatDate(order.at)}
                                                </TableCell>

                                                <TableCell>
                                                    {order.total}
                                                </TableCell>
                                                <TableCell>
                                                    {order.status === "pending"
                                                        ? "Đang chờ"
                                                        : order.status ===
                                                          "completed"
                                                        ? "Hoàn thành"
                                                        : "Bị từ chối"}
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
