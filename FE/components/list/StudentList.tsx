"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Student } from "@/types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface StudentListProps {
    students: Student[];
}

export default function StudentList({ students }: StudentListProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();
    const studentsPerPage = 10;

    const filteredStudents = students.filter(
        (student) =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.studentId.includes(searchTerm)
    );

    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = filteredStudents.slice(
        indexOfFirstStudent,
        indexOfLastStudent
    );

    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

    return (
        <div>
            <Input
                type="text"
                placeholder="Tìm kiếm sinh viên bằng tên hoặc MSSV"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4"
            />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>MSSV</TableHead>
                        <TableHead>Tên sinh viên</TableHead>
                        <TableHead>Số giấy A3</TableHead>
                        <TableHead>Số giấy A4</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentStudents.map((student) => (
                        <TableRow
                            key={student.studentId}
                            onClick={() =>
                                router.push(
                                    `/admin/student/${student.studentId}`
                                )
                            }>
                            <TableCell>{student.studentId}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.A3}</TableCell>
                            <TableCell>{student.A4}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Pagination className="mt-4">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage((prev) => Math.max(prev - 1, 1));
                            }}
                            className={
                                currentPage === 1
                                    ? "pointer-events-none opacity-50"
                                    : ""
                            }
                        />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentPage(index + 1);
                                }}
                                isActive={currentPage === index + 1}>
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage((prev) =>
                                    Math.min(prev + 1, totalPages)
                                );
                            }}
                            className={
                                currentPage === totalPages
                                    ? "pointer-events-none opacity-50"
                                    : ""
                            }
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
