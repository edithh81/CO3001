"use client";
import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

type Image = {
    src: string;
    alt: string;
};

const images: Image[] = [
    {
        src: "/images/realbk.webp",
        alt: "realbk",
    },
    {
        src: "/images/reallifebk.JPEG",
        alt: "reallifebk",
    },
];

export default function AutoCarousel() {
    return (
        <Carousel
            plugins={[Autoplay({ delay: 4000 })]}
            className="max-w-2xl min-w-[300px] ">
            <CarouselContent className="items-center">
                {images.map((image, index) => (
                    <CarouselItem key={index}>
                        <div className="relative">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                width={1000}
                                height={1000}
                                className="rounded-lg"
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}
