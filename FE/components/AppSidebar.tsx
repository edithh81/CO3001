"use client";
import {
    Calendar,
    Home,
    NotebookText,
    Search,
    Settings,
    Printer,
    PrinterCheck,
    User,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
// Menu items.
const items = [
    {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: Home,
    },
    {
        title: "Printing Orders",
        url: "/admin/printing-orders",
        icon: PrinterCheck,
    },
    {
        title: "Buy paper Orders",
        url: "/admin/buy-paper-orders",
        icon: NotebookText,
    },
    {
        title: "Printers List",
        url: "/admin/printer-list",
        icon: Printer,
    },
    {
        title: "Students",
        url: "/admin/student",
        icon: User,
    },
    {
        title: "Printing Specifications",
        url: "/admin/specifications",
        icon: Settings,
    },
];

export function AppSidebar() {
    const { adminLogout } = useAuth();
    const router = useRouter();
    const handleLogout = () => {
        adminLogout();
        router.push("/");
    };
    return (
        <Sidebar>
            <SidebarContent className="flex flex-col justify-between min-h-screen py-6 items-start w-full">
                <SidebarGroup>
                    <SidebarGroupLabel className="font-bold text-xl">
                        Bảng điều khiển
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="flex flex-col space-y-6 pt-6">
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title} className="">
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon className="hover:text-white hover:bg-white text-white" />
                                            <Button
                                                variant="link"
                                                className="text-white font-semibold text-lg p-0">
                                                {item.title}
                                            </Button>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarFooter className="flex justify-center items-center w-full">
                    <Button
                        className="text-white w-3/4 bg-blue-400 hover:bg-blue-400/90 "
                        onClick={() => handleLogout()}>
                        Log out
                    </Button>
                </SidebarFooter>
            </SidebarContent>
        </Sidebar>
    );
}
