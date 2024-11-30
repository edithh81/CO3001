import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <p className="text-4xl font-bold">404 Error.</p>
            <p className="text-gray-400 font-semibold text-2xl">
                This page cannot be found
            </p>
            <Link href={"/admin/dashboard"}>
                <Button variant={"link"}>Return to dashboard</Button>
            </Link>
        </div>
    );
};

export default page;
