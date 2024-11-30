"use client";
import { useState, useEffect } from "react";
import StudentList from "@/components/list/StudentList";
import { Student } from "@/types";
import { getAllStudents } from "@/services/StudentService";
// This would typically come from an API or database
const mockStudents: Student[] = [
    { studentId: "2213046", name: "VÕ THANH TÂM", A3: 50, A4: 100 },
    { studentId: "2", name: "Bob Smith", A3: 30, A4: 80 },
    { studentId: "3", name: "Charlie Brown", A3: 40, A4: 90 },
    // Add more students as needed
];

export default function Home() {
    const [students, setStudents] = useState<Student[]>([]);
    useEffect(() => {
        getAllStudents().then((res) => {
            if ("error" in res) {
                console.log("Error getting students:", res.error);
            } else {
                setStudents(res);
            }
        });
        /* setStudents(mockStudents); */
    }, []);
    return (
        <main className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Student List</h1>
            <StudentList students={students} />
        </main>
    );
}
