"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format, set } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { printingSpecsSchema, PrintingSpecsFormValues } from "@/lib/validation";
import {
    updatePrintingSpecifications,
    getPrintingSpecifications,
} from "@/services/AdminService";
import { PrintingSpecs } from "@/types";
import { useToast } from "@/hooks/use-toast";

const fileTypes = [
    { id: "pdf", label: "PDF" },
    { id: "doc", label: "DOC" },
    { id: "docx", label: "DOCX" },
    { id: "jpg", label: "JPG" },
    { id: "png", label: "PNG" },
];

export default function PrintingSpecsPage() {
    const [initSpec, setInitSpec] = useState<PrintingSpecs | null>(null);
    const { toast } = useToast();
    function onSubmit(data: PrintingSpecsFormValues) {
        console.log(data);
        const { resetStartDate, resetEndDate, ...rest } = data;
        updatePrintingSpecifications({
            ...rest,
            resetStartDate: resetStartDate.toISOString(),
            resetEndDate: resetEndDate.toISOString(),
        });
        toast({
            title: "Thành công",
            description: "Cài đặt đã được cập nhật",
            variant: "default",
        });
    }

    const form = useForm<PrintingSpecsFormValues>({
        resolver: zodResolver(printingSpecsSchema),
        defaultValues: {
            defaultPagesA4: 100,
            defaultPagesA3: 50,
            resetStartDate: new Date(),
            resetEndDate: new Date(),
            resetPeriod: "monthly",
            permittedFileTypes: ["pdf", "doc", "docx"],
        },
    });

    useEffect(() => {
        getPrintingSpecifications().then((res) => {
            if ("error" in res) {
                console.log(
                    "Error getting printing specifications:",
                    res.error
                );
            } else {
                console.log(res.data);
                setInitSpec(res.data);

                form.reset({
                    defaultPagesA4: res.data.defaultPagesA4 ?? 100,
                    defaultPagesA3: res.data.defaultPagesA3 ?? 50,
                    resetStartDate:
                        new Date(res.data.resetStartDate) ?? new Date(),
                    resetEndDate: new Date(res.data.resetEndDate) ?? new Date(),
                    resetPeriod: res.data.resetPeriod ?? "monthly",
                    permittedFileTypes: res.data.permittedFileTypes ?? [
                        "pdf",
                        "doc",
                        "docx",
                    ],
                });
            }
        });
    }, [form]);

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">
                Chỉnh sửa thông số in ấn
            </h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="defaultPagesA4"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Số trang A4 mặc định</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(
                                                    parseInt(e.target.value, 10)
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Số lượng trang A4 mặc định được cấp cho
                                        sinh viên mỗi lần reset và lần đầu đăng
                                        nhập
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="defaultPagesA3"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Số trang A3 mặc định</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(
                                                    parseInt(e.target.value, 10)
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Số lượng trang A3 mặc định được cấp cho
                                        sinh viên mỗi lần reset và lần đầu đăng
                                        nhập
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="resetStartDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Ngày bắt đầu</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal",
                                                        !field.value &&
                                                            "text-muted-foreground"
                                                    )}>
                                                    {field.value ? (
                                                        format(
                                                            field.value,
                                                            "PPP"
                                                        )
                                                    ) : (
                                                        <span>Chọn 1 ngày</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-auto p-0"
                                            align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date < new Date() ||
                                                    date >
                                                        new Date("2100-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        Ngày bắt đầu việc cấp mới lượng giấy cho
                                        sinh viên sau một khoảng thời gian.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="resetEndDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Ngày kết thúc</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal",
                                                        !field.value &&
                                                            "text-muted-foreground"
                                                    )}>
                                                    {field.value ? (
                                                        format(
                                                            field.value,
                                                            "PPP"
                                                        )
                                                    ) : (
                                                        <span>Chọn 1 ngày</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-auto p-0"
                                            align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date < new Date() ||
                                                    date >
                                                        new Date("2100-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        Ngày kết thúc việc cấp mới lượng giấy
                                        cho sinh viên sau một khoảng thời gian.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="resetPeriod"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tần suất cấp mới</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a reset period" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="daily">
                                            Hàng ngày
                                        </SelectItem>
                                        <SelectItem value="weekly">
                                            Hàng tuần
                                        </SelectItem>
                                        <SelectItem value="monthly">
                                            Hàng tháng
                                        </SelectItem>
                                        <SelectItem value="quarterly">
                                            Hàng quý
                                        </SelectItem>
                                        <SelectItem value="yearly">
                                            Hàng năm
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    Tần suất cấp mới lượng giấy cho sinh viên.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="permittedFileTypes"
                        render={() => (
                            <FormItem>
                                <div className="mb-4">
                                    <FormLabel className="text-base">
                                        Các file được phép yêu cầu in
                                    </FormLabel>
                                    <FormDescription>
                                        Chọn các loại file mà sinh viên được
                                        phép tải lên
                                    </FormDescription>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {fileTypes.map((item) => (
                                        <FormField
                                            key={item.id}
                                            control={form.control}
                                            name="permittedFileTypes"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem
                                                        key={item.id}
                                                        className="flex flex-row items-start space-x-3 space-y-0">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(
                                                                    item.id
                                                                )}
                                                                onCheckedChange={(
                                                                    checked
                                                                ) => {
                                                                    return checked
                                                                        ? field.onChange(
                                                                              [
                                                                                  ...field.value,
                                                                                  item.id,
                                                                              ]
                                                                          )
                                                                        : field.onChange(
                                                                              field.value?.filter(
                                                                                  (
                                                                                      value
                                                                                  ) =>
                                                                                      value !==
                                                                                      item.id
                                                                              )
                                                                          );
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            {item.label}
                                                        </FormLabel>
                                                    </FormItem>
                                                );
                                            }}
                                        />
                                    ))}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full bg-main hover:bg-[#030391]/90">
                        Lưu cài đặt
                    </Button>
                </form>
            </Form>
        </div>
    );
}
