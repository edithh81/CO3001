"use client";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
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
        url: "./dashboard",
        icon: Home,
    },
    {
        title: "Printing Orders",
        url: "./printing-orders",
        icon: Inbox,
    },
    {
        title: "Buy paper Orders",
        url: "./buy-paper-orders",
        icon: Calendar,
    },
    {
        title: "Printers List",
        url: "./printer-list",
        icon: Search,
    },
    {
        title: "Printing Specifications",
        url: "./specifications",
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
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="font-bold text-xl">
                        Bảng điều khiển
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="flex flex-col space-y-4">
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
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
                <SidebarFooter>
                    <Button
                        className="text-white"
                        onClick={() => handleLogout()}>
                        Log out
                    </Button>
                </SidebarFooter>
            </SidebarContent>
        </Sidebar>
    );
}
