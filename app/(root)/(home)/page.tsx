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
        <div className="min-h-screen w-full flex flex-col">
            <header className="w-full flex justify-between items-center p-4 border-b-2 border-b-black">
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

            <div className="flex-grow relative">
                <Carousel className="absolute inset-0">
                    <CarouselContent className="h-full">
                        {images.map((image, index) => (
                            <CarouselItem key={index} className="h-full">
                                <div className="relative w-full h-full">
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        objectFit="cover"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-4" />
                    <CarouselNext className="right-4" />
                </Carousel>
            </div>
        </div>
    );
};

export default page;
