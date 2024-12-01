// @ts-nocheck
"use client";

import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormDescription,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { createPaperOrder } from "@/services/PaperOrderService";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    a4Amount: z
        .string()
        .refine((val) => !isNaN(Number(val)), {
            message: "Must be a valid number",
        })
        .transform(Number)
        .refine((val) => val >= 0, { message: "Amount must be positive" }),
    a3Amount: z
        .string()
        .refine((val) => !isNaN(Number(val)), {
            message: "Must be a valid number",
        })
        .transform(Number)
        .refine((val) => val >= 0, { message: "Amount must be positive" }),
    paymentMethod: z.enum(["cash", "banking"]),
});

export default function PaperPurchaseForm() {
    const { studentInfo } = useAuth();
    const studentId = studentInfo.studentId;
    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            a4Amount: "0",
            a3Amount: "0",
            paymentMethod: "cash",
        },
    });

    const calculateTotal = () => {
        const a4Total = Number(form.watch("a4Amount")) * 500;
        const a3Total = Number(form.watch("a3Amount")) * 1000;
        return a4Total + a3Total;
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values, calculateTotal());

        await createPaperOrder({
            A3: values.a3Amount,
            A4: values.a4Amount,
            method: values.paymentMethod,
            total: calculateTotal(),
            byStudent: studentId,
            status: "pending",
            at: new Date().toISOString(),
        }).then((res) => {
            if ("error" in res) {
                toast({
                    title: "Error",
                    description: "Error creating paper order",
                    variant: "destructive",
                });
                return;
            } else {
                toast({
                    title: "Success",
                    description: "Paper order created",
                    className: "bg-green-500",
                });
                router.push(`/success/buy-paper/${res.orderId}`);
            }
        });
    }

    return (
        <Form {...form}>
            <div className="container mx-auto p-6">
                <Card className="w-full max-w-5xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-center">
                            Mua thêm giấy in
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="flex space-x-20 justify-between w-full items-center">
                            {/* Left Column - Paper Selection */}
                            <div className="space-y-6 w-full">
                                <h3 className="text-2xl font-semibold mb-4">
                                    Chọn số lượng các loại giấy
                                </h3>
                                <FormField
                                    control={form.control}
                                    name="a4Amount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-lg font-medium">
                                                Số giấy A4
                                            </FormLabel>
                                            <FormDescription>
                                                21 x 29.7 cm
                                            </FormDescription>
                                            <div className="flex items-center space-x-2">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="icon"
                                                    className="rounded-full bg-red-500"
                                                    onClick={() =>
                                                        form.setValue(
                                                            "a4Amount",
                                                            Math.max(
                                                                0,
                                                                String(
                                                                    Number(
                                                                        field.value
                                                                    ) - 1
                                                                )
                                                            )
                                                        )
                                                    }>
                                                    <Minus className="h-4 w-4" />
                                                </Button>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="number"
                                                        min="0"
                                                        className="text-center"
                                                    />
                                                </FormControl>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="icon"
                                                    className="rounded-full bg-green-500"
                                                    onClick={() =>
                                                        form.setValue(
                                                            "a4Amount",
                                                            String(
                                                                Number(
                                                                    field.value
                                                                ) + 1
                                                            )
                                                        )
                                                    }>
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="a3Amount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-lg font-medium">
                                                Số giấy A3
                                            </FormLabel>
                                            <FormDescription>
                                                29.7 x 42 cm
                                            </FormDescription>
                                            <div className="flex items-center space-x-2">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="icon"
                                                    className="rounded-full bg-red-500"
                                                    onClick={() =>
                                                        form.setValue(
                                                            "a3Amount",
                                                            Math.max(
                                                                0,
                                                                String(
                                                                    Number(
                                                                        field.value
                                                                    ) - 1
                                                                )
                                                            )
                                                        )
                                                    }>
                                                    <Minus className="h-4 w-4" />
                                                </Button>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="number"
                                                        min="0"
                                                        className="text-center"
                                                    />
                                                </FormControl>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="icon"
                                                    className="rounded-full bg-green-500"
                                                    onClick={() =>
                                                        form.setValue(
                                                            "a3Amount",
                                                            String(
                                                                Number(
                                                                    field.value
                                                                ) + 1
                                                            )
                                                        )
                                                    }>
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Right Column - Transaction Information */}
                            <div className="space-y-6 w-full">
                                <h3 className="text-2xl font-semibold mb-4">
                                    Thông tin thanh toán
                                </h3>
                                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                                    <span className="text-lg font-medium">
                                        Tổng số tiền:
                                    </span>
                                    <span className="text-2xl font-bold">
                                        {calculateTotal().toLocaleString()} VND
                                    </span>
                                </div>

                                <FormField
                                    control={form.control}
                                    name="paymentMethod"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-lg font-medium">
                                                Phương thức thanh toán
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select payment method" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="cash">
                                                        Tiền mặt
                                                    </SelectItem>
                                                    <SelectItem value="banking">
                                                        BKPay
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    className="w-full text-lg py-6 bg-main hover:bg-[#030391] text-white"
                                    onClick={form.handleSubmit(onSubmit)}>
                                    Đặt mua giấy
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Form>
    );
}
