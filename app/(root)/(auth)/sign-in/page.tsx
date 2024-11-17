import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <Card className="rounded-xl shadow-xl w-fit flex flex-col justify-start items-center space-y-6 p-2">
                <CardHeader>
                    <Image
                        src="/images/logobk.png"
                        alt="logo"
                        width={300}
                        height={300}
                    />
                </CardHeader>
                <CardContent className="flex flex-col space-y-4 justify-start items-center">
                    <h1 className="font-bold text-xl">Đăng nhập</h1>
                    <div className="flex flex-col space-y-2 w-full">
                        <Link href={"/sign-in/spso"}>
                            <Button className="w-full flex justify-center items-center bg-white hover:bg-white/90 active:bg-white/95">
                                <p className="text-sky-500">
                                    Đăng nhập với tư cách Admin
                                </p>
                            </Button>
                        </Link>

                        <Link href={"/sign-in/student"}>
                            <Button className="w-full flex justify-center items-center bg-white hover:bg-white/90 active:bg-white/95">
                                <p className="text-sky-500">
                                    Đăng nhập với tư cách Sinh viên
                                </p>
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default page;
