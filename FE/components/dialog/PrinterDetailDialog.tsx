// @ts-nocheck
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { printerDetail } from "@/types";
import EditPrinterDialog from "./EditPrinterDialog";

interface PrinterDetailsDialogProps {
    printer: printerDetail | null;
    onClose: () => void;
    onUpdate: (printer: printerDetail) => void;
    onDelete: (id: number) => void;
}

export default function PrinterDetailsDialog({
    printer,
    onClose,
    onUpdate,
    onDelete,
}: PrinterDetailsDialogProps) {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    if (!printer) return null;

    const handleStatusChange = () => {
        const updatedPrinter = {
            ...printer,
            status: printer.status === "working" ? "maintenance" : "working",
        };
        onUpdate(updatedPrinter);
    };

    const handleDelete = () => {
        onDelete(printer.id);
        onClose();
    };

    return (
        <>
            <Dialog open={!!printer} onOpenChange={onClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Thông tin máy in</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <p>
                            <strong>ID:</strong> {printer.id}
                        </p>
                        <p>
                            <strong>Cơ sở:</strong>{" "}
                            {printer.campusId === "cs1"
                                ? "Lý Thường Kiệt"
                                : "Dĩ An"}
                        </p>
                        <p>
                            <strong>Phòng:</strong> {printer.room}
                        </p>
                        <p>
                            <strong>Số đơn đang chờ:</strong> {printer.queue}
                        </p>
                        <p>
                            <strong>Trạng thái:</strong>{" "}
                            {printer.status === "working"
                                ? "Đang hoạt động"
                                : "Đang bảo trì"}
                        </p>
                        <p>
                            <strong>Mãu máy in:</strong> {printer.info.model}
                        </p>
                        <p>
                            <strong>Loại:</strong>{" "}
                            {printer.info.type
                                .map((type) =>
                                    type === "bw" ? "Trắng đen" : "Màu"
                                )
                                .join(", ")}
                        </p>
                        <p>
                            <strong>Tính năng:</strong>{" "}
                            {printer.info.functional
                                .map((functional) =>
                                    functional === "single"
                                        ? "Một mặt"
                                        : functional === "double"
                                        ? "Hai mặt"
                                        : "Scan"
                                )
                                .join(", ")}
                        </p>
                        <div className="flex space-x-4">
                            <Button
                                onClick={handleStatusChange}
                                className={`${
                                    printer.status === "working"
                                        ? "bg-yellow-500 hover:bg-yellow-500/90"
                                        : "bg-green-500 hover:bg-green-500/90"
                                }`}>
                                {printer.status === "working"
                                    ? "Tạm dừng"
                                    : "Kích hoạt"}
                            </Button>
                            <Button
                                onClick={() => setIsEditDialogOpen(true)}
                                className="bg-main hover:bg-[#030391]">
                                Chỉnh sửa
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleDelete}>
                                Xoá máy in
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            <EditPrinterDialog
                printer={printer}
                isOpen={isEditDialogOpen}
                onClose={() => setIsEditDialogOpen(false)}
                onUpdate={onUpdate}
            />
        </>
    );
}
