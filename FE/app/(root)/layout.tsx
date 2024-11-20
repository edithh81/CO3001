import React from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="relative w-full h-full flex flex-col justify-between">
            <Header />
            <div className="flex min-w-full flex-grow">{children}</div>
            <Footer />
        </main>
    );
};

export default layout;
