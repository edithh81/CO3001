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
                        <DialogTitle>Printer Details</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <p>
                            <strong>ID:</strong> {printer.id}
                        </p>
                        <p>
                            <strong>Campus:</strong>{" "}
                            {printer.campusId === "cs1"
                                ? "Campus 1"
                                : "Campus 2"}
                        </p>
                        <p>
                            <strong>Room:</strong> {printer.room}
                        </p>
                        <p>
                            <strong>Queue:</strong> {printer.queue}
                        </p>
                        <p>
                            <strong>Status:</strong> {printer.status}
                        </p>
                        <p>
                            <strong>Model:</strong> {printer.info.model}
                        </p>
                        <p>
                            <strong>Type:</strong>{" "}
                            {printer.info.type.join(", ")}
                        </p>
                        <p>
                            <strong>Functions:</strong>{" "}
                            {printer.info.functional.join(", ")}
                        </p>
                        <div className="flex space-x-4">
                            <Button onClick={handleStatusChange}>
                                {printer.status === "working"
                                    ? "Deactivate"
                                    : "Activate"}
                            </Button>
                            <Button onClick={() => setIsEditDialogOpen(true)}>
                                Edit Printer
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleDelete}>
                                Delete Printer
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
