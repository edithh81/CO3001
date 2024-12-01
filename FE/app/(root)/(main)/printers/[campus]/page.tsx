// @ts-nocheck
"use client";
import React, { useState, useEffect, use } from "react";
import { useParams } from "next/navigation";
import { printerCampus } from "@/lib/constants";
import { printerDetail } from "@/types";
import { set } from "zod";
import PrinterCard from "@/components/card/PrinterCard";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getPrintersByCampus } from "@/services/PrinterService";

// gonna fix type later, easy fix

const page = () => {
    const params = useParams();
    const campus = params.campus as string;
    const [initPrinterList, setInitPrinterList] = useState<printerDetail[]>([]);
    const [printerList, setPrinterList] = useState<printerDetail[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [displayPrinters, setDisplayPrinters] = useState<printerDetail[]>([]);
    const printerPerPage = 8;
    useEffect(() => {
        getPrintersByCampus(campus).then((res) => {
            if ("error" in res) {
                console.log("Error getting printers:", res.error);
            } else {
                const workingPrinters = res.filter(
                    (printer) => printer.status === "working"
                );
                setPrinterList(workingPrinters);
                setInitPrinterList(workingPrinters);
            }
        });
    }, []);

    useEffect(() => {
        setTotalPages(Math.ceil(printerList.length / printerPerPage));
        setDisplayPrinters(printerList.slice(0, printerPerPage));
    }, [printerList]);

    useEffect(() => {
        const start = (currentPage - 1) * printerPerPage;
        const end = start + printerPerPage;
        setDisplayPrinters(printerList.slice(start, end));
    }, [currentPage]);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    //perform some sorting here
    const handleSort = (value: string) => {
        if (value === "least-queue") {
            const SortedPrinters: printerDetail[] = [...initPrinterList].sort(
                (a, b) => a.queue - b.queue
            );
            setPrinterList(SortedPrinters);
        } else if (value.startsWith("type-")) {
            const type = value.split("-")[1];
            const sortedPrinters = [...initPrinterList].filter((printer) =>
                printer.info.type.includes(type)
            );
            setPrinterList(sortedPrinters);
        } else if (value.startsWith("func-")) {
            const func = value.split("-")[1];
            const sortedPrinters = [...initPrinterList].filter((printer) =>
                printer.info.functional.includes(func)
            );
            setPrinterList(sortedPrinters);
        } else if (value === "default") {
            setPrinterList(initPrinterList);
        }
    };

    return (
        <div className="flex flex-col h-full justify-between items-center w-full py-6">
            <div className="flex flex-col space-y-2 justify-center items-center">
                <h1 className="font-bold text-3xl">In ấn</h1>
                <p className="font-semibold text-xl">Chọn máy in</p>
            </div>

            <div className="w-full h-full flex justify-center items-start">
                <div className="flex flex-col justify-start items-start space-y-4">
                    <div className="w-full flex flex-col gap-4">
                        <div className="w-full flex justify-end items-center gap-2">
                            <p>Sắp xếp theo:</p>
                            <Select
                                onValueChange={(e) => {
                                    handleSort(e);
                                }}>
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Mặc định" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="default">
                                            Mặc định
                                        </SelectItem>
                                    </SelectGroup>
                                    <SelectGroup>
                                        <SelectLabel>Hàng đợi</SelectLabel>
                                        <SelectItem value="least-queue">
                                            Ít hàng đợi nhất
                                        </SelectItem>
                                    </SelectGroup>
                                    <SelectGroup>
                                        <SelectLabel>Loại máy in</SelectLabel>
                                        <SelectItem value="type-color">
                                            In màu
                                        </SelectItem>
                                        <SelectItem value="type-bw">
                                            Trắng đen
                                        </SelectItem>
                                    </SelectGroup>
                                    <SelectGroup>
                                        <SelectLabel>Chức năng</SelectLabel>
                                        <SelectItem value="func-single">
                                            In 1 mặt
                                        </SelectItem>
                                        <SelectItem value="func-double">
                                            In 2 mặt
                                        </SelectItem>
                                        <SelectItem value="func-scan">
                                            Scan
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex justify-center items-center w-full">
                        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                            {displayPrinters.length > 0 ? (
                                displayPrinters.map((printer) => (
                                    <PrinterCard
                                        key={printer.id}
                                        id={printer.id}
                                        room={printer.room}
                                        queue={printer.queue}
                                        info={printer.info}
                                        campusId={campus}
                                    />
                                ))
                            ) : (
                                <div className="flex justify-center items-center w-full">
                                    <p className="font-bold text-xl">
                                        Không có máy in nào.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Pagination className="mt-8">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (currentPage > 1) paginate(currentPage - 1);
                            }}
                        />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <PaginationItem key={i + 1}>
                            <PaginationLink
                                href="#"
                                isActive={currentPage === i + 1}
                                className={`${
                                    currentPage === i + 1
                                        ? "bg-main text-white hover:bg-[#030391]/90 hover:text-white"
                                        : "bg-gray-300 hover:bg-gray-300/90 text-black"
                                }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    paginate(i + 1);
                                }}>
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (currentPage < totalPages)
                                    paginate(currentPage + 1);
                            }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default page;
