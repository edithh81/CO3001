import api from "@/api";
import { Student } from "@/types";
import axios from "axios";

export const getStudentInfo = async (
    studentId: string
): Promise<Student | { error: string }> => {
    try {
        const response = await axios.get(`/students/student/${studentId}`);
        if (!response) {
            return { error: "Student not found" };
        }
        return { error: "Not implement" };
    } catch (error) {
        console.log("Error getting student info:", error);
        return { error: "Internal server error" };
    }
};

export const getAllStudents = async (): Promise<
    Student[] | { error: string }
> => {
    try {
        const response = await api.get(`/students/getAll`);
        return response.data.data;
    } catch (error) {
        console.log("Error getting all students:", error);
        return { error: "Internal server error" };
    }
};

// export const addStudent = async (student: Student) => {
//     try {
//         const response = await api.post(`/students/add`, student);
//         return response.data;
//     } catch (error) {
//         console.log("Error adding student:", error);
//         return { error: "Internal server error" };
//     }
// };

export const updateStudentBalance = async (
    studentId: string,
    amount: number,
    type: string
) => {
    try {
        const response = await api.put(`/students/updatePaper`, {
            studentId,
            amount,
            type,
        });
        return response.data;
    } catch (error) {
        console.log("Error editing paper of student:", error);
        return { error: "Internal server error" };
    }
};
