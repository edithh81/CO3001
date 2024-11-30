"use client";

import { useState, useEffect } from "react";
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

const mockStudent: Student = {
    studentId: "2213046",
    name: "VÕ THANH TÂM",
    A3: 50,
    A4: 100,
};

const mockPrintingOrders: PrintingOrderTrue[] = [
    {
        orderId: 1,
        printerId: 1,
        fileName: "assignment1.pdf",
        byStudent: "2213046",
        fileId: "file1",
        specifications: {
            pages: "1-5",
            size: "A4",
            functional: "double",
            type: "bw",
            copies: 1,
        },
        totalPages: 5,
        status: "completed",
        at: "2023-05-01T10:00:00Z",
        campus: "Main Campus",
    },
    {
        orderId: 2,
        printerId: 2,
        fileName: "report.pdf",
        byStudent: "2213046",
        fileId: "file2",
        specifications: {
            pages: "all",
            size: "A3",
            functional: "single",
            type: "color",
            additionalInfo: "High quality print needed",
            copies: 2,
        },
        totalPages: 20,
        status: "pending",
        at: "2023-05-02T14:30:00Z",
        campus: "Secondary Campus",
    },
];

const mockBuyPaperOrders: BuyPaperOrderTrue[] = [
    {
        orderId: 1,
        byStudent: "2213046",
        A4: 100,
        total: 50000,
        status: "completed",
        at: "2023-04-30T09:00:00Z",
        method: "cash",
    },
    {
        orderId: 2,
        byStudent: "2213046",
        A3: 50,
        total: 75000,
        status: "pending",
        at: "2023-05-01T11:00:00Z",
        method: "bank transfer",
    },
];

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

    useEffect(() => {
        // Simulating data fetching with mock data
        setStudent(mockStudent);
        setPrintingOrders(mockPrintingOrders);
        setBuyPaperOrders(mockBuyPaperOrders);
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!student) {
        return <div>No student found</div>;
    }

    const handleChangePaperBalance = () => {
        // Implement the logic to change paper balance
        // updateStudentBalance(studentId, paperType, paperAmount);
        console.log(
            `Changing ${paperType} balance by ${paperAmount} for student ${studentId}`
        );
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">
                Student Details: {student.name}
            </h1>
            <Card className="mb-4">
                <CardHeader>
                    <CardTitle>Paper Balance</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>A3 Balance: {student.A3}</p>
                    <p>A4 Balance: {student.A4}</p>
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
                            placeholder="Amount"
                            value={paperAmount}
                            onChange={(e) => setPaperAmount(e.target.value)}
                            className="w-[100px]"
                        />
                        <Button onClick={handleChangePaperBalance}>
                            Change paper balance
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <Tabs defaultValue="printing">
                <TabsList>
                    <TabsTrigger value="printing">Printing Orders</TabsTrigger>
                    <TabsTrigger value="buyPaper">Buy Paper Orders</TabsTrigger>
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
