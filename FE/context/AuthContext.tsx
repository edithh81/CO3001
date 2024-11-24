"use client";
import React, { useState, useEffect, useContext, createContext } from "react";
import { StudentResponse as StudentInfo } from "@/types";
import Cookies from "js-cookie";
import loginAPI from "@/services/LoginAPI";

type StudentData = Omit<StudentInfo, "avatar">;

interface AuthContextProps {
    isLoggedIn: boolean;
    studentInfo: StudentData;
    studentAvatar: string;
    isAdmin: boolean;
    adminLogin: (
        username: string,
        password: string
    ) => { message: string } | { error: string };
    adminLogout: () => void;
    login: (
        values: { username: string; password: string },
        type: string
    ) => Promise<{ message: string } | { error: string }>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

interface AuthProviderProps {
    children: React.ReactNode;
}

const COOKIE_NAME = "studentData";
const COOKIE_OPTIONS = {
    expires: 1,
    sameSite: "strict" as const,
    path: "/",
};

const COOKIE_NAME_ADMIN = "adminData";

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [student, setStudent] = useState<StudentData>({} as StudentData);
    const [studentAvatar, setStudentAvatar] = useState<string>("");
    const [isInitialized, setIsInitialized] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        const storeStudent = Cookies.get(COOKIE_NAME);
        const storeAdmin = Cookies.get(COOKIE_NAME_ADMIN);
        if (storeAdmin) {
            setIsAdmin(true);
        }
        if (storeStudent) {
            setStudent(JSON.parse(storeStudent));
            setIsLoggedIn(true);
        }
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        const avatar = localStorage.getItem("studentAvatar");
        setStudentAvatar(avatar || "");
    }, [student]);

    const updateAuthState = (studentData: StudentInfo, isLoggedIn: boolean) => {
        const { avatar, ...rest } = studentData;
        if (isLoggedIn) {
            localStorage.setItem("studentAvatar", avatar);
            Cookies.set(
                COOKIE_NAME,
                JSON.stringify({ ...rest }),
                COOKIE_OPTIONS
            );
        } else {
            localStorage.removeItem("studentAvatar");
            Cookies.remove(COOKIE_NAME, { path: "/" });
        }
        console.log("dữ liệu sinh viên", avatar, rest);
        setStudent({ ...rest } as StudentData);
        setIsLoggedIn(isLoggedIn);
    };

    useEffect(() => {
        console.log("đã get", student);
    }, [student]);

    const login = async (
        values: { username: string; password: string },
        type: string
    ): Promise<{ message: string } | { error: string }> => {
        try {
            const response = await loginAPI(values, type);
            console.log("return ở context", response);
            if (response.success && response.data) {
                console.log("data từ context", response.data);
                updateAuthState(response.data, true);
                return { message: "Login successfully" };
            } else {
                return { error: "Invalid credentials" };
            }
        } catch (error) {
            console.log("API Error:", error);
            return { error: "Something went wrong. Try again later" };
        }
    };

    const adminLogin = (
        username: string,
        password: string
    ): { message: string } | { error: string } => {
        if (
            username == process.env.NEXT_PUBLIC_ADMIN_USERNAME &&
            password == process.env.NEXT_PUBLIC_ADMIN_PASSWORD
        ) {
            setIsAdmin(true);
            Cookies.set(COOKIE_NAME_ADMIN, "admin", COOKIE_OPTIONS);
            return { message: "Login successfully" };
        } else {
            return { error: "Invalid credentials" };
        }
    };

    const adminLogout = () => {
        setIsAdmin(false);
        Cookies.remove(COOKIE_NAME_ADMIN, { path: "/" });
    };

    const logout = async () => {
        updateAuthState({} as StudentInfo, false);
    };

    if (!isInitialized) {
        return (
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900" />
            </div>
        );
    }

    return (
        <AuthContext.Provider
            value={{
                isAdmin,
                adminLogin,
                adminLogout,
                isLoggedIn,
                studentInfo: student,
                studentAvatar,
                login,
                logout,
            }}>
            {" "}
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;