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
import  loginAPI  from "@/services/LoginAPI"
import { type } from "os";
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
            if (type === "student"){
                const response = await loginAPI(values, type);
                console.log(response)
            }
        } catch (error) {
            console.error(error);
            // suppose to display error message here (use toast)
        }
    }

    return (
        <Card className="w-[400px] h-fit">
            <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>
                    Provide login credentials to sign you in
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
                                        Username
                                    </FormLabel>
                                    <FormControl className="mt-1">
                                        <Input
                                            className="no-focus border"
                                            placeholder="Enter your username here"
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
                                        Password
                                    </FormLabel>
                                    <FormControl className="mt-1">
                                        <Input
                                            className="no-fcous border"
                                            placeholder="Enter your password here"
                                            type="password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">
                            Sign In
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default SignIn;
