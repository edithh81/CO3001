"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { SignInSchema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Link from "next/link";

type SignInProps = {
    type: string;
};

const SignIn = ({ type }: SignInProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    /* useEffect(() => {
        if (isLoggedIn) {
            const callbackUrl = searchParams.get("callbackUrl");
            router.replace(callbackUrl || "/dashboard");
        }
    }, [isLoggedIn, router, searchParams]); */

    const form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof SignInSchema>) {
        // do validation here
        try {
            // encrypt password before sending
            /* await login(values.username, values.password).then((res) => {
                if (res.status === 'success') {
                    setIsLoggedInSuccess(true);
                } else {
                    setIsLoggedInSuccess(false);
                }
            }); */
            /* await login(values.username, values.password)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                }); */
            // router.push("/dashboard");
        } catch (error) {
            console.error(error);
            // suppose to display error message here (use toast)
        }
    }

    return (
        <Card className="w-[400px] h-fit">
            <CardHeader>
                <CardTitle>Đăng nhập</CardTitle>
                <CardDescription>
                    Vui lòng cung cấp thông tin đăng nhập của bạn
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex w-full flex-col gap-5">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem className="flex w-full flex-col">
                                    <FormLabel className="paragraph-semibold">
                                        {type == "student"
                                            ? "BKNetID"
                                            : "Tên đăng nhập"}
                                    </FormLabel>
                                    <FormControl className="mt-1">
                                        <Input
                                            className="no-focus border"
                                            placeholder={`${
                                                type == "student"
                                                    ? "Ví dụ: hcmut.spss"
                                                    : "admin"
                                            }`}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="flex w-full flex-col">
                                    <FormLabel className="paragraph-semibold">
                                        Mật khẩu
                                    </FormLabel>
                                    <FormControl className="mt-1">
                                        <Input
                                            className="no-focus border"
                                            placeholder="Nhập mật khẩu"
                                            type="password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-full bg-main hover:bg-main/90 active:bg-main/95">
                            Đăng nhập
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default SignIn;
