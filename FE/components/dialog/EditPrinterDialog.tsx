// @ts-nocheck
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
    printerDetail,
    PrinterFunctional,
    PrinterStatus,
    PrinterType,
    CampusId,
} from "@/types";
import { addPrinterSchema } from "@/lib/validation";

interface EditPrinterDialogProps {
    printer: printerDetail;
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (printer: printerDetail) => void;
}

export default function EditPrinterDialog({
    printer,
    isOpen,
    onClose,
    onUpdate,
}: EditPrinterDialogProps) {
    const form = useForm<z.infer<typeof addPrinterSchema>>({
        resolver: zodResolver(addPrinterSchema),
        defaultValues: {
            campusId: printer.campusId,
            room: printer.room,
            model: printer.info.model,
            type: printer.info.type,
            functional: printer.info.functional,
        },
    });

    const onSubmit = (values: z.infer<typeof addPrinterSchema>) => {
        const updatedPrinter: printerDetail = {
            ...printer,
            campusId: values.campusId as CampusId,
            room: values.room,
            info: {
                model: values.model,
                type: values.type as PrinterType[],
                functional: values.functional as PrinterFunctional[],
            },
        };
        onUpdate(updatedPrinter);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Chỉnh sửa máy in</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4">
                        <FormField
                            control={form.control}
                            name="campusId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cơ sở</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select campus" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="cs1">
                                                Lý Thường Kiệt
                                            </SelectItem>
                                            <SelectItem value="cs2">
                                                Dĩ An
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="room"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phòng</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter room number"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="model"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mẫu máy in</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter printer model"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Loại</FormLabel>
                                    <div className="flex space-x-4">
                                        {["bw", "color"].map((type) => (
                                            <FormField
                                                key={type}
                                                control={form.control}
                                                name="type"
                                                render={({ field }) => (
                                                    <FormItem className="flex items-center space-x-2">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(
                                                                    type
                                                                )}
                                                                onCheckedChange={(
                                                                    checked
                                                                ) => {
                                                                    if (
                                                                        checked
                                                                    ) {
                                                                        field.onChange(
                                                                            [
                                                                                ...field.value,
                                                                                type,
                                                                            ]
                                                                        );
                                                                    } else {
                                                                        field.onChange(
                                                                            field.value?.filter(
                                                                                (
                                                                                    value
                                                                                ) =>
                                                                                    value !==
                                                                                    type
                                                                            )
                                                                        );
                                                                    }
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            {type === "bw"
                                                                ? "Trắng đen"
                                                                : "Màu"}
                                                        </FormLabel>
                                                    </FormItem>
                                                )}
                                            />
                                        ))}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="functional"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Tính năng</FormLabel>
                                    <div className="flex space-x-4">
                                        {["single", "double", "scan"].map(
                                            (func) => (
                                                <FormField
                                                    key={func}
                                                    control={form.control}
                                                    name="functional"
                                                    render={({ field }) => (
                                                        <FormItem className="flex items-center space-x-2">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes(
                                                                        func
                                                                    )}
                                                                    onCheckedChange={(
                                                                        checked
                                                                    ) => {
                                                                        if (
                                                                            checked
                                                                        ) {
                                                                            field.onChange(
                                                                                [
                                                                                    ...field.value,
                                                                                    func,
                                                                                ]
                                                                            );
                                                                        } else {
                                                                            field.onChange(
                                                                                field.value?.filter(
                                                                                    (
                                                                                        value
                                                                                    ) =>
                                                                                        value !==
                                                                                        func
                                                                                )
                                                                            );
                                                                        }
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                {func ===
                                                                "single"
                                                                    ? "Một mặt"
                                                                    : func ===
                                                                      "double"
                                                                    ? "Hai mặt"
                                                                    : "Scan"}
                                                            </FormLabel>
                                                        </FormItem>
                                                    )}
                                                />
                                            )
                                        )}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="bg-main hover:bg-[#030391]">
                            Hoàn tất
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
