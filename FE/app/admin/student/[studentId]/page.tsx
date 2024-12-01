"use client";

import { useState, useEffect, use } from "react";
import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StudentOrderHistory from "@/components/history/StudentOrderHistory";
import { Student, PrintingOrderTrue, BuyPaperOrderTrue } from "@/types";
import {
    getStudentInfo,
    updateStudentBalance,
} from "@/services/StudentService";
import { getOrderBuyPaperByStudentId } from "@/services/PaperOrderService";
import { getOrderPrintingByStudentId } from "@/services/PrintingOrderService";
import { useRouter } from "next/navigation";

export default function StudentPage() {
    const params = useParams();
    const studentId = params.studentId as string;
    const [student, setStudent] = useState<Student | null>(null);
    const [printingOrders, setPrintingOrders] = useState<PrintingOrderTrue[]>(
        []
    );
    const [buyPaperOrders, setBuyPaperOrders] = useState<BuyPaperOrderTrue[]>(
        []
    );
    const [paperType, setPaperType] = useState<"A3" | "A4">("A4");
    const [paperAmount, setPaperAmount] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        // Simulating data fetching with mock data
        getStudentInfo(studentId).then((data) => {
            if ("error" in data) {
                console.error(data.error);
                setIsLoading(false);
                return;
            }
            setStudent(data.data);
        });
    }, []);

    useEffect(() => {
        console.log(student);
        getOrderPrintingByStudentId(studentId).then((data) => {
            if ("error" in data) {
                console.error(data.error);
                setIsLoading(false);
                return;
            }
            console.log("paper order:", data.data);
            setPrintingOrders(data.data);
        });
        getOrderBuyPaperByStudentId(studentId).then((data) => {
            if ("error" in data) {
                console.error(data.error);
                setIsLoading(false);
                return;
            }
            console.log("buy paper order:", data);
            setBuyPaperOrders(data.data);
        });
        setIsLoading(false);
    }, [student]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!student) {
        return <div>No student found</div>;
    }

    const handleChangePaperBalance = () => {
        // Implement the logic to change paper balance
        // updateStudentBalance(studentId, paperType, paperAmount);
        updateStudentBalance(studentId, parseInt(paperAmount), paperType);
        setStudent((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                [paperType]: prev[paperType] + parseInt(paperAmount),
            };
        });
        console.log(
            `Changing ${paperType} balance by ${paperAmount} for student ${studentId}`
        );
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">
                Thông tin sinh viên: {student.name}
            </h1>
            <Card className="mb-4">
                <CardHeader>
                    <CardTitle>Số giấy hiện có</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Số giấy A3: {student.A3}</p>
                    <p>Số giấy A4: {student.A4}</p>
                    <div className="flex items-center gap-2 mt-4">
                        <Select
                            value={paperType}
                            onValueChange={(value: "A3" | "A4") =>
                                setPaperType(value)
                            }>
                            <SelectTrigger className="w-[100px]">
                                <SelectValue placeholder="Paper type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="A3">A3</SelectItem>
                                <SelectItem value="A4">A4</SelectItem>
                            </SelectContent>
                        </Select>
                        <Input
                            type="number"
                            placeholder="Số lượng"
                            value={paperAmount}
                            onChange={(e) => setPaperAmount(e.target.value)}
                            className="w-[100px] "
                        />
                        <Button
                            onClick={handleChangePaperBalance}
                            className="bg-main hover:bg-[#030391]">
                            Thay đổi lượng giấy
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <Tabs defaultValue="printing">
                <TabsList>
                    <TabsTrigger value="printing">Đơn in</TabsTrigger>
                    <TabsTrigger value="buyPaper">Đơn mua giấy</TabsTrigger>
                </TabsList>
                <TabsContent value="printing">
                    <StudentOrderHistory
                        orders={printingOrders}
                        type="printing"
                    />
                </TabsContent>
                <TabsContent value="buyPaper">
                    <StudentOrderHistory
                        orders={buyPaperOrders}
                        type="buyPaper"
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}
