import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
interface campusProps {
    id: string;
    campusName: string;
    total: number;
    available: number;
}
import Link from "next/link";
const CampusCard = ({ id, campusName, total, available }: campusProps) => {
    return (
        <Card className="rounded-xl p-4 shadow-md bg-sky-300 w-[500px] max-md:w-[300px] h-fit flex flex-col justify-center items-center gap-4">
            <CardHeader>
                <CardTitle className="font-bold text-3xl max-md:text-2xl flex justify-center items-center">
                    Cơ sở {campusName}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-start items-start text-xl max-md:text-lg">
                <p>Tổng số máy: {total}</p>
                <p>Máy sẵn dùng: {available}</p>
            </CardContent>
            <CardFooter>
                <Link href={`/printers/${id}`} className="w-full">
                    <Button className="bg-main hover:bg-[#030391]/90 px-10 py-6 font-bold w-full text-lg">
                        Chọn
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
};

export default CampusCard;
