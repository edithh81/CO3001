// @ts-nocheck
"use client";
import { useState, useMemo, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
    PlusCircle,
    ArrowUpDown,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import AdminPrinterCard from "@/components/card/AdminPrinterCard";
import AddPrinterDialog from "@/components/dialog/AddPrinterDialog";
import PrinterDetailsDialog from "@/components/dialog/PrinterDetailDialog";
import { useToast } from "@/hooks/use-toast";
import {
    printerDetail,
    CampusId,
    PrinterStatus,
    printerDetailCreate,
} from "@/types";
import {
    getAllPrinters,
    updatePrinter,
    deletePrinter,
    addPrinter,
} from "@/services/PrinterService";

interface PrintersPageState {
    currentPage: Record<CampusId, number>;
    itemsPerPage: number;
    sortDirection: SortDirection;
    filterStatus: PrinterStatus | "all";
}

export type SortDirection = "asc" | "desc";

const ITEMS_PER_PAGE = 9;

export default function Page() {
    const [printers, setPrinters] = useState<printerDetail[]>([]);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [selectedPrinter, setSelectedPrinter] =
        useState<printerDetail | null>(null);
    const [pageState, setPageState] = useState<PrintersPageState>({
        currentPage: { cs1: 1, cs2: 1 },
        itemsPerPage: ITEMS_PER_PAGE,
        sortDirection: "asc",
        filterStatus: "all",
    });
    const [activeCampus, setActiveCampus] = useState<CampusId>("cs1");
    const { toast } = useToast();

    useEffect(() => {
        getAllPrinters().then((res) => {
            if ("error" in res) {
                console.error("Error getting printers:", res.error);
            } else {
                res.forEach((printer) => {
                    printer.info = JSON.parse(printer.info);
                });
                setPrinters(res);
            }
        });
    }, []);

    const filteredAndSortedPrinters = useMemo(() => {
        return printers
            .filter(
                (printer) =>
                    pageState.filterStatus === "all" ||
                    printer.status === pageState.filterStatus
            )
            .sort((a, b) => {
                if (pageState.sortDirection === "asc") {
                    return a.queue - b.queue;
                } else {
                    return b.queue - a.queue;
                }
            });
    }, [printers, pageState.filterStatus, pageState.sortDirection]);

    const paginatedPrinters = useMemo(() => {
        const campusPrinters = filteredAndSortedPrinters.filter(
            (printer) => printer.campusId === activeCampus
        );
        const startIndex =
            (pageState.currentPage[activeCampus] - 1) * pageState.itemsPerPage;
        return campusPrinters.slice(
            startIndex,
            startIndex + pageState.itemsPerPage
        );
    }, [
        filteredAndSortedPrinters,
        pageState.currentPage,
        pageState.itemsPerPage,
        activeCampus,
    ]);

    const totalPages = Math.ceil(
        filteredAndSortedPrinters.filter(
            (printer) => printer.campusId === activeCampus
        ).length / pageState.itemsPerPage
    );

    const handleAddPrinter = (newPrinter: printerDetailCreate) => {
        addPrinter(newPrinter).then((res) => {
            if ("error" in res) {
                toast({
                    title: "Error",
                    description: "Error adding printer",
                    variant: "destructive",
                });
            } else {
                const newPrinterToAdd: printerDetail = {
                    ...newPrinter,
                    id: res.printerId,
                };
                setPrinters([...printers, newPrinterToAdd]);
                toast({
                    title: "Success",
                    description: "Printer added successfully",
                    className: "bg-green-500",
                });
            }
        });
    };

    const handleUpdatePrinter = (updatedPrinter: printerDetail) => {
        updatePrinter(updatedPrinter).then((res) => {
            if ("error" in res) {
                toast({
                    title: "Error",
                    description: "Error updating printer",
                    variant: "destructive",
                });
            } else {
                setPrinters(
                    printers.map((p) =>
                        p.id === updatedPrinter.id ? updatedPrinter : p
                    )
                );
                setSelectedPrinter(updatedPrinter);
                toast({
                    title: "Success",
                    description: "Printer updated successfully",
                    className: "bg-green-500",
                });
            }
        });
    };

    const handleDeletePrinter = (id: number) => {
        deletePrinter(id).then((res) => {
            if ("error" in res) {
                toast({
                    title: "Error",
                    description: "Error deleting printer",
                    variant: "destructive",
                });
            } else {
                setPrinters(printers.filter((p) => p.id !== id));
                setSelectedPrinter(null);
                toast({
                    title: "Success",
                    description: "Printer deleted successfully",
                    className: "bg-green-500",
                });
            }
        });
    };

    const handlePageChange = (page: number) => {
        setPageState((prev) => ({
            ...prev,
            currentPage: { ...prev.currentPage, [activeCampus]: page },
        }));
    };

    const handleSortChange = () => {
        setPageState((prev) => ({
            ...prev,
            sortDirection: prev.sortDirection === "asc" ? "desc" : "asc",
        }));
    };

    const handleFilterChange = (status: PrinterStatus | "all") => {
        setPageState((prev) => ({
            ...prev,
            filterStatus: status,
            currentPage: { cs1: 1, cs2: 1 },
        }));
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Quản lý máy in</h1>
                <Button
                    onClick={() => setIsAddDialogOpen(true)}
                    className="bg-main hover:bg-[#030391]">
                    <PlusCircle className="mr-2 h-4 w-4 " /> Thêm máy in mới
                </Button>
            </div>

            <div className="flex justify-between items-center mb-4">
                <Select
                    value={pageState.filterStatus}
                    onValueChange={(value) =>
                        handleFilterChange(value as PrinterStatus | "all")
                    }>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tất cả</SelectItem>
                        <SelectItem value="working">Đang hoạt động</SelectItem>
                        <SelectItem value="maintenance">
                            Đang bảo trì
                        </SelectItem>
                    </SelectContent>
                </Select>

                <Button variant="outline" onClick={handleSortChange}>
                    Sắp xếp theo Hàng đợi{" "}
                    {pageState.sortDirection === "asc" ? "↑" : "↓"}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            </div>

            <Tabs
                defaultValue="cs1"
                onValueChange={(value) => setActiveCampus(value as CampusId)}>
                <TabsList>
                    <TabsTrigger value="cs1">Cơ sở Lý Thường Kiệt</TabsTrigger>
                    <TabsTrigger value="cs2">Cơ sở Dĩ An</TabsTrigger>
                </TabsList>
                <TabsContent value={activeCampus}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {paginatedPrinters.map((printer) => (
                            <AdminPrinterCard
                                key={printer.id}
                                printer={printer}
                                onSelect={() => setSelectedPrinter(printer)}
                            />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>

            {/* Pagination */}
            <div className="flex items-center justify-center space-x-2 mt-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                        handlePageChange(
                            pageState.currentPage[activeCampus] - 1
                        )
                    }
                    disabled={pageState.currentPage[activeCampus] === 1}>
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                </Button>
                <span>
                    Page {pageState.currentPage[activeCampus]} of {totalPages}
                </span>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                        handlePageChange(
                            pageState.currentPage[activeCampus] + 1
                        )
                    }
                    disabled={
                        pageState.currentPage[activeCampus] === totalPages
                    }>
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
            </div>

            <AddPrinterDialog
                isOpen={isAddDialogOpen}
                onClose={() => setIsAddDialogOpen(false)}
                onAdd={handleAddPrinter}
            />

            <PrinterDetailsDialog
                printer={selectedPrinter}
                onClose={() => setSelectedPrinter(null)}
                onUpdate={handleUpdatePrinter}
                onDelete={handleDeletePrinter}
            />
        </div>
    );
}
