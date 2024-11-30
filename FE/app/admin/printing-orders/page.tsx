"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { getTotalOrderPrinting } from "@/services/GetHistoryPrinting";
import { PrintingOrderTrue } from "@/types";
import { useRouter } from "next/navigation";

const orders: PrintingOrderTrue[] = [
    // Campus cs1
    {
        orderId: 1,
        printerId: 101,
        fileName:
            "assignment1ádsdsfsdfsdfsegergdsgsdghshgshsdhrhrhrhddddddd.pdf",
        byStudent: "john_doe",
        fileId: "file123",
        specifications: {
            pages: "1-10",
            size: "A4",
            functional: "single",
            type: "bw",
            additionalInfo: "Urgent print",
            copies: 2,
        },
        totalPages: 20,
        status: "pending",
        at: "2024-11-29T08:00:00+07:00",
        campus: "cs1",
    },
    {
        orderId: 2,
        printerId: 102,
        fileName: "project_report.docx",
        byStudent: "jane_doe",
        fileId: "file456",
        specifications: {
            pages: "all",
            size: "A3",
            functional: "double",
            type: "color",
            copies: 1,
        },
        totalPages: 25,
        status: "completed",
        at: "2024-11-28T10:00:00+07:00",
        campus: "cs1",
    },
    {
        orderId: 3,
        printerId: 103,
        fileName: "notes.pdf",
        byStudent: "mark_smith",
        fileId: "file789",
        specifications: {
            pages: "1-5",
            size: "A4",
            functional: "scan",
            type: "bw",
            copies: 1,
        },
        totalPages: 5,
        status: "rejected",
        at: "2024-11-29T09:30:00+07:00",
        campus: "cs1",
    },
    {
        orderId: 4,
        printerId: 104,
        fileName: "presentation.pptx",
        byStudent: "emma_jones",
        fileId: "file101112",
        specifications: {
            pages: "1-20",
            size: "A4",
            functional: "single",
            type: "color",
            copies: 3,
        },
        totalPages: 60,
        status: "pending",
        at: "2024-11-29T11:15:00+07:00",
        campus: "cs1",
    },
    {
        orderId: 5,
        printerId: 105,
        fileName: "lab_report.pdf",
        byStudent: "oliver_brown",
        fileId: "file131415",
        specifications: {
            pages: "all",
            size: "A3",
            functional: "double",
            type: "bw",
            copies: 2,
        },
        totalPages: 40,
        status: "completed",
        at: "2024-11-28T14:00:00+07:00",
        campus: "cs1",
    },
    // Campus cs2
    {
        orderId: 6,
        printerId: 201,
        fileName: "exam_review.pdf",
        byStudent: "sophia_wilson",
        fileId: "file161718",
        specifications: {
            pages: "1-30",
            size: "A4",
            functional: "single",
            type: "bw",
            additionalInfo: "Staple documents",
            copies: 1,
        },
        totalPages: 30,
        status: "pending",
        at: "2024-11-29T13:00:00+07:00",
        campus: "cs2",
    },
    {
        orderId: 7,
        printerId: 202,
        fileName: "event_flyer.pdf",
        byStudent: "liam_taylor",
        fileId: "file192021",
        specifications: {
            pages: "all",
            size: "A3",
            functional: "double",
            type: "color",
            copies: 5,
        },
        totalPages: 50,
        status: "rejected",
        at: "2024-11-29T15:45:00+07:00",
        campus: "cs2",
    },
    {
        orderId: 8,
        printerId: 203,
        fileName: "research_paper.pdf",
        byStudent: "mia_white",
        fileId: "file222324",
        specifications: {
            pages: "1-15",
            size: "A4",
            functional: "single",
            type: "bw",
            copies: 2,
        },
        totalPages: 30,
        status: "completed",
        at: "2024-11-28T16:00:00+07:00",
        campus: "cs2",
    },
    {
        orderId: 9,
        printerId: 204,
        fileName: "survey_form.docx",
        byStudent: "noah_harris",
        fileId: "file252627",
        specifications: {
            pages: "all",
            size: "A4",
            functional: "scan",
            type: "color",
            copies: 1,
        },
        totalPages: 10,
        status: "pending",
        at: "2024-11-29T18:00:00+07:00",
        campus: "cs2",
    },
    {
        orderId: 10,
        printerId: 205,
        fileName: "brochure_design.ppt",
        byStudent: "ava_martin",
        fileId: "file282930",
        specifications: {
            pages: "1-5",
            size: "A3",
            functional: "double",
            type: "color",
            additionalInfo: "High quality",
            copies: 10,
        },
        totalPages: 50,
        status: "rejected",
        at: "2024-11-29T19:30:00+07:00",
        campus: "cs2",
    },
];

type SortKey = keyof Pick<
    PrintingOrderTrue,
    "orderId" | "byStudent" | "totalPages" | "status" | "at"
>;

const page = () => {
    const [totalOrder, setTotalOrder] = useState<PrintingOrderTrue[]>([]);
    const [activeTab, setActiveTab] = useState("cs1");
    const [orderCS1, setOrderCS1] = useState<PrintingOrderTrue[]>([]);
    const [orderCS2, setOrderCS2] = useState<PrintingOrderTrue[]>([]);
    const [sortKey, setSortKey] = useState<SortKey>("at");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const router = useRouter();
    useEffect(() => {
        /* getTotalOrderPrinting().then((res) => {
        if ("error" in res) {
            console.log(res.error);
        }
        else {
            setTotalOrder(res);
        }
    }); */
        setTotalOrder(orders);
    }, []);

    useEffect(() => {
        setOrderCS1(totalOrder.filter((order) => order.campus === "cs1"));
        setOrderCS2(totalOrder.filter((order) => order.campus === "cs2"));
    }, [totalOrder]);

    const campusOrders = {
        cs1: orderCS1,
        cs2: orderCS2,
    };

    const campuses = Object.keys(campusOrders);

    const sortOrders = (orders: PrintingOrderTrue[]) => {
        return [...orders].sort((a, b) => {
            if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
            if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });
    };

    const filterOrders = (orders: PrintingOrderTrue[]) => {
        if (statusFilter === "all") return sortOrders(orders);
        return sortOrders(
            orders.filter((order) => order.status === statusFilter)
        );
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
        <Card className="w-full ml-2 my-6 mr-6">
            <CardHeader>
                <CardTitle className="text-2xl">Các đơn in</CardTitle>
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
                            <SelectItem value="all">Tất cả đơn</SelectItem>
                            <SelectItem value="pending">
                                Đơn đang đợi
                            </SelectItem>
                            <SelectItem value="completed">
                                Đơn đã hoàn thành
                            </SelectItem>
                            <SelectItem value="rejected">
                                Đơn bị từ chối
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        {campuses.map((campus) => (
                            <TabsTrigger key={campus} value={campus}>
                                Cơ sở{" "}
                                {campus === "cs1" ? "Lý Thường Kiệt" : "Dĩ An"}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {campuses.map((campus) => (
                        <TabsContent key={campus} value={campus}>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>
                                            Mã đơn đặt
                                            <SortButton column="orderId" />
                                        </TableHead>
                                        <TableHead>
                                            Người đặt
                                            <SortButton column="byStudent" />
                                        </TableHead>
                                        <TableHead>Tên file</TableHead>
                                        <TableHead>Chi tiết</TableHead>
                                        <TableHead>
                                            Tổng giấy in
                                            <SortButton column="totalPages" />
                                        </TableHead>
                                        <TableHead>
                                            Trạng thái
                                            <SortButton column="status" />
                                        </TableHead>
                                        <TableHead>
                                            Thời gian
                                            <SortButton column="at" />
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filterOrders(campusOrders[campus]).map(
                                        (order) => (
                                            <TableRow
                                                key={order.orderId}
                                                onClick={() => {
                                                    router.push(
                                                        `./printing-orders/${order.orderId}`
                                                    );
                                                }}>
                                                <TableCell>
                                                    {order.orderId}
                                                </TableCell>
                                                <TableCell>
                                                    {order.byStudent}
                                                </TableCell>
                                                <TableCell className="line-clamp-1 w-[250px]">
                                                    {order.fileName}
                                                </TableCell>
                                                <TableCell>
                                                    {`${order.specifications.pages}, ${order.specifications.size}, 
                        ${order.specifications.functional}, ${order.specifications.type}, 
                        ${order.specifications.copies} copies`}
                                                </TableCell>
                                                <TableCell>
                                                    {order.totalPages}
                                                </TableCell>
                                                <TableCell>
                                                    {order.status === "pending"
                                                        ? "Đang đợi"
                                                        : order.status ===
                                                          "completed"
                                                        ? "Đã hoàn thành"
                                                        : "Bị từ chối"}
                                                </TableCell>
                                                <TableCell>
                                                    {new Date(
                                                        order.at
                                                    ).toLocaleString()}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )}
                                </TableBody>
                            </Table>
                        </TabsContent>
                    ))}
                </Tabs>
            </CardContent>
        </Card>
    );
};

export default page;
