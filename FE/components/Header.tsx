"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { StudentResponse as Student } from "@/types";
import { PhoneIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const navLinks = [
    {
        name: "Trang chủ",
        url: "/dashboard",
    },
    {
        name: "Lịch sử in ấn",
        url: "/history/printing",
    },
    {
        name: "Thanh toán",
        url: "/buy-paper",
    },
];

const Header = () => {
    const {
        studentInfo: { studentId, name },
        studentAvatar,
        logout,
    } = useAuth();

    console.log("thông tin: ", studentId, name);

    const [isLargeScreen, setIsLargeScreen] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const checkScreenSize = () => {
            setIsLargeScreen(window.innerWidth >= 768);
        };
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    const handleLogout = async () => {
        await logout().then((res) => router.push("/"));
    };
    /* const student: Student = {
        studentId: "12345678",
        name: "Nguyen Van A",
        avatar: "https://via.placeholder.com/150",
    }; */
    return (
        <div className="w-full flex justify-between max-md:justify-center items-center bg-main p-2 relative">
            {/* Navigation Links */}
            <Link href={"/dashboard"}>
                <div className="flex justify-between gap-2 max-md:gap-1 items-center">
                    <Image
                        src={"/images/logobk.png"}
                        alt="logo"
                        width={80}
                        height={80}
                    />
                    <p className="font-bold text-3xl text-white">SPSS</p>
                </div>
            </Link>

            {isLargeScreen ? (
                <div className="flex justify-between items-center flex-grow">
                    <div className="flex flex-1 text-white space-x-6 justify-center font-bold">
                        {navLinks.map((link) => (
                            <Link href={link.url} key={link.name}>
                                <Button
                                    variant="link"
                                    className="text-white font-bold text-lg">
                                    {link.name}
                                </Button>
                            </Link>
                        ))}
                    </div>
                    <div className="flex gap-4 justify-between items-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Image
                                    src={"/icons/bell.svg"}
                                    alt="avatar"
                                    width={24}
                                    height={24}
                                    className="rounded-full"
                                />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Thông báo</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Thông báo 1</DropdownMenuItem>
                                <DropdownMenuItem>Thông báo 2</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarImage
                                        src={
                                            `data:image/png;base64,${studentAvatar}` ||
                                            "/images/avatar.png"
                                        }
                                    />
                                    <AvatarFallback>ST</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>
                                    Thông tin sinh viên
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    MSSV: {studentId}
                                </DropdownMenuItem>
                                <DropdownMenuItem>Tên: {name}</DropdownMenuItem>
                                <Separator />
                                <DropdownMenuItem onClick={handleLogout}>
                                    Đăng xuất
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            ) : (
                <Sheet>
                    <SheetTrigger className="absolute right-4 top-23">
                        <Image
                            src={"/icons/menu.svg"}
                            alt="Menu"
                            width={30}
                            height={30}
                        />
                    </SheetTrigger>
                    <SheetContent className="w-[250px]">
                        <SheetHeader>
                            <SheetTitle className="text-xl">Menu</SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col space-y-4">
                            <div className="flex flex-col justify-start items-start">
                                {navLinks.map((link) => (
                                    <div className="w-full" key={link.name}>
                                        <Link href={link.url}>
                                            <Button
                                                variant="ghost"
                                                className="font-bold text-md p-0 m-0">
                                                {link.name}
                                            </Button>
                                        </Link>
                                        <Separator />
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between items-center gap-2 h-[20px]"></div>
                        </div>
                    </SheetContent>
                </Sheet>
            )}
        </div>
    );
};

export default Header;
