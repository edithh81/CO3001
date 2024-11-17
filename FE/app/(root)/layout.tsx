import React from "react";
import Footer from "@/components/Footer";

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="relative w-full h-full flex flex-col justify-between">
            <div className="flex w-full flex-1">{children}</div>
            <Footer />
        </main>
    );
};

export default layout;
