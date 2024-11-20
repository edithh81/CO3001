import React from "react";
import Header from "@/components/Header";

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="relative w-full h-full flex flex-col justify-between">
            <Header />
            <div className="flex min-w-full justify-center items-center flex-grow">
                {children}
            </div>
        </main>
    );
};

export default layout;
