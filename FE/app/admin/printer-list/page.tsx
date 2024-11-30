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
import { printerDetail, CampusId, PrinterStatus } from "@/types";
import {
    getAllPrinters,
    updatePrinter,
    deletePrinter,
} from "@/services/PrinterService";
interface PrintersPageState {
    currentPage: number;
    itemsPerPage: number;
    sortDirection: SortDirection;
    filterStatus: PrinterStatus | "all";
}

export type SortDirection = "asc" | "desc";

const mockPrinters: printerDetail[] = [
    {
        id: 1,
        campusId: "cs1",
        room: "A101",
        queue: 3,
        status: "working",
        info: {
            model: "HP LaserJet Pro M404dn",
            type: ["bw"],
            functional: ["single", "double"],
        },
    },
    {
        id: 2,
        campusId: "cs1",
        room: "B205",
        queue: 0,
        status: "working",
        info: {
            model: "Canon PIXMA TR8520",
            type: ["color"],
            functional: ["single", "double", "scan"],
        },
    },
    {
        id: 3,
        campusId: "cs1",
        room: "C303",
        queue: 5,
        status: "maintenance",
        info: {
            model: "Epson WorkForce Pro WF-3720",
            type: ["bw", "color"],
            functional: ["single", "double", "scan"],
        },
    },
    {
        id: 4,
        campusId: "cs1",
        room: "D102",
        queue: 2,
        status: "working",
        info: {
            model: "Brother HL-L2350DW",
            type: ["bw"],
            functional: ["single", "double"],
        },
    },
    {
        id: 5,
        campusId: "cs1",
        room: "E201",
        queue: 1,
        status: "working",
        info: {
            model: "Lexmark CX517de",
            type: ["bw", "color"],
            functional: ["single", "double", "scan"],
        },
    },
    {
        id: 6,
        campusId: "cs2",
        room: "F101",
        queue: 4,
        status: "working",
        info: {
            model: "HP OfficeJet Pro 9015",
            type: ["bw", "color"],
            functional: ["single", "double", "scan"],
        },
    },
    {
        id: 7,
        campusId: "cs2",
        room: "G205",
        queue: 0,
        status: "maintenance",
        info: {
            model: "Canon imageCLASS MF743Cdw",
            type: ["bw", "color"],
            functional: ["single", "double", "scan"],
        },
    },
    {
        id: 8,
        campusId: "cs2",
        room: "H303",
        queue: 2,
        status: "working",
        info: {
            model: "Epson EcoTank ET-4760",
            type: ["bw", "color"],
            functional: ["single", "double", "scan"],
        },
    },
    {
        id: 9,
        campusId: "cs2",
        room: "I102",
        queue: 1,
        status: "working",
        info: {
            model: "Brother MFC-L8900CDW",
            type: ["bw", "color"],
            functional: ["single", "double", "scan"],
        },
    },
    {
        id: 10,
        campusId: "cs2",
        room: "J201",
        queue: 3,
        status: "working",
        info: {
            model: "Lexmark MC3224dwe",
            type: ["bw", "color"],
            functional: ["single", "double", "scan"],
        },
    },
];

const ITEMS_PER_PAGE = 10;

export default function page() {
    const [printers, setPrinters] = useState<printerDetail[]>([]);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [selectedPrinter, setSelectedPrinter] =
        useState<printerDetail | null>(null);
    const [pageState, setPageState] = useState<PrintersPageState>({
        currentPage: 1,
        itemsPerPage: ITEMS_PER_PAGE,
        sortDirection: "asc" as SortDirection,
        filterStatus: "all",
    });
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
        //setPrinters(mockPrinters);
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
        const startIndex = (pageState.currentPage - 1) * pageState.itemsPerPage;
        return filteredAndSortedPrinters.slice(
            startIndex,
            startIndex + pageState.itemsPerPage
        );
    }, [
        filteredAndSortedPrinters,
        pageState.currentPage,
        pageState.itemsPerPage,
    ]);

    const totalPages = Math.ceil(
        filteredAndSortedPrinters.length / pageState.itemsPerPage
    );

    const handleAddPrinter = (newPrinter: printerDetail) => {
        /* addPrinter(newPrinter).then((res) => {
                if ("error" in res) {
                    toast({
                        title: "Error",
                        description: res.error,
                        variant: "destructive",})
                } else {
                    setPrinters([...printers, newPrinter]);
                    toast({
                        title: "Success",
                        description: "Printer added successfully",
                        className: "bg-green-500",});
                }
            }); */
        setPrinters([...printers, newPrinter]);
    };

    const handleUpdatePrinter = (updatedPrinter: printerDetail) => {
        /* updatePrinter(updatedPrinter).then((res) => {
            if ("error" in res) {
                toast({
                    title: "Error",
                    description: res.error,
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
        }); */

        setPrinters(
            printers.map((p) =>
                p.id === updatedPrinter.id ? updatedPrinter : p
            )
        );
        setSelectedPrinter(updatedPrinter);
    };

    const handleDeletePrinter = (id: number) => {
        /* deletePrinter(id).then((res) => {    
            if ("error" in res) {
                toast({
                    title: "Error",
                    description: res.error,
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
        }); */
        setPrinters(printers.filter((p) => p.id !== id));
        setSelectedPrinter(null);
    };

    const handlePageChange = (page: number) => {
        setPageState((prev) => ({ ...prev, currentPage: page }));
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
            currentPage: 1,
        }));
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Quản lý máy in</h1>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Thêm máy in mới
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

            <Tabs defaultValue="cs1">
                <TabsList>
                    <TabsTrigger value="cs1">Cơ sở Lý Thường Kiệt</TabsTrigger>
                    <TabsTrigger value="cs2">Cơ sở Dĩ An</TabsTrigger>
                </TabsList>
                {["cs1", "cs2"].map((campus) => (
                    <TabsContent key={campus} value={campus}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {paginatedPrinters
                                .filter(
                                    (printer) => printer.campusId === campus
                                )
                                .map((printer) => (
                                    <AdminPrinterCard
                                        key={printer.id}
                                        printer={printer}
                                        onSelect={() =>
                                            setSelectedPrinter(printer)
                                        }
                                    />
                                ))}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>

            {/* Pagination */}
            <div className="flex items-center justify-center space-x-2 mt-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(pageState.currentPage - 1)}
                    disabled={pageState.currentPage === 1}>
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                </Button>
                <span>
                    Page {pageState.currentPage} of {totalPages}
                </span>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(pageState.currentPage + 1)}
                    disabled={pageState.currentPage === totalPages}>
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
