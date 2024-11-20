"use client";
import React, { use, useState, useEffect } from "react";

const page = ({ params }: { params: Promise<{ printerId: string }> }) => {
    const { printerId } = use(params);
    return <div>page</div>;
};

export default page;
