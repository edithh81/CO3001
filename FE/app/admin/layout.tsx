import React from "react";
import Footer from "@/components/Footer";
import AuthProvider from "@/context/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="relative w-full h-full flex flex-col justify-between">
                <div className="flex min-w-full flex-grow">
                    <SidebarTrigger />
                    {children}
                </div>
                <Toaster />
            </main>
        </SidebarProvider>
    );
};

export default layout;
