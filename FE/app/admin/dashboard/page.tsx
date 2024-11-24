"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

const page = () => {
    const { isAdmin, adminLogout } = useAuth();

    return <div>page</div>;
};

export default page;
