import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AutoCarousel from "@/components/decoration/AutoCarousel";

interface image {
    src: string;
    alt: string;
}

const images: image[] = [
    {
        src: "/images/realbk.webp",
        alt: "realbk",
    },
    {
        src: "/images/reallifebk.JPEG",
        alt: "reallifebk",
    },
];

const page = () => {
    return (
        <div className="flex flex-col justify-between items-center w-full h-full">
            <header className="w-full flex justify-between items-center p-4 border-b border-b-black">
                <div className="flex justify-between items-center space-x-2">
                    <Image
                        src="/images/logobk.png"
                        alt="logo"
                        width={100}
                        height={100}
                    />
                    <p className="font-bold text-3xl">SPSS</p>
                </div>

                <Link href="/sign-in">
                    <Button variant="link" className="text-sky-500">
                        Đăng nhập
                    </Button>
                </Link>
            </header>
            <div className="flex justify-between h-full items-center px-32 gap-32">
                <div className="flex flex-col justify-center items-center space-y-14">
                    <div className="flex flex-col justify-center w-full items-start space-y-4">
                        <h1 className="font-bold text-4xl w-[500px]">
                            Smart Printing Service for HCMUT Student
                        </h1>
                        <p className="text-xl text-gray-600 max-w-lg">
                            Experience hassle-free printing with our innovative
                            solution designed specifically for HCMUT students.
                        </p>
                    </div>

                    <Image
                        src={"/images/printer-image.png"}
                        alt="printer-image"
                        width={200}
                        height={200}
                    />

                    <Link href={"/dashboard"}>
                        <Button className="w-[200px]">Dashboard</Button>
                    </Link>
                </div>
                <div className="flex justify-center items-center">
                    <AutoCarousel />
                </div>
            </div>
        </div>
    );
};

export default page;
