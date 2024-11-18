import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
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
            <div className="flex justify-between w-full h-full items-center px-32">
                <div className="font-bold text-2xl">
                    Smart Printing Service for HCMUT Student
                </div>
                <div className="flex justify-center items-center">
                    <AutoCarousel />
                </div>
            </div>
        </div>
    );
};

export default page;
