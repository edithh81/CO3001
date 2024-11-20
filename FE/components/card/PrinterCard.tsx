import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "../ui/button";
import { printerDetail } from "@/types";
import Link from "next/link";
const PrinterCard = ({ id, room, queue, info }: printerDetail) => {
    return (
        <Card className="bg-sky-300 rounded-lg px-4 flex justify-center items-center flex-col">
            <CardHeader>
                <CardTitle className="font-bold text-2xl">
                    Máy in {id}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription className="text-black">
                    <p>Phòng: {room}</p>
                    <p>Hàng đợi: {queue}</p>
                    <Popover>
                        <PopoverTrigger className="hover:underline">
                            Thông tin thêm
                        </PopoverTrigger>
                        <PopoverContent className="bg-white border border-blue-500 w-[300px]">
                            <Card className="m-0 shadow-none border-none py-2 flex justify-center items-center">
                                <CardContent className="flex flex-col gap-2 p-0 w-fit">
                                    <p className="">
                                        <span className="font-bold">
                                            Mẫu máy in:
                                        </span>{" "}
                                        {info.model}
                                    </p>
                                    <p>
                                        <span className="font-bold">
                                            Loại máy in:
                                        </span>{" "}
                                        {info.type}
                                    </p>
                                    <p>
                                        <span className="font-bold">
                                            Chức năng:
                                        </span>{" "}
                                        {info.functional}
                                    </p>
                                </CardContent>
                            </Card>
                        </PopoverContent>
                    </Popover>
                </CardDescription>
            </CardContent>
            <CardFooter>
                <Link href={`/upload/${id}`} className="w-full">
                    <Button className="bg-main hover:bg-[#030391]/90 text-white">
                        Chọn
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
};

export default PrinterCard;
