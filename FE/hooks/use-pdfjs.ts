"use client";
import { useEffect, useState } from "react";
import * as PDFJS from "pdfjs-dist/types/src/pdf";

export const usePDFJS = () => {
    const [pdfjs, setPDFJS] = useState<typeof PDFJS | null>(null);

    // Load the library once on mount (the webpack import automatically sets up the worker)
    useEffect(() => {
        import("pdfjs-dist/webpack.mjs").then(setPDFJS).catch((err) => {
            console.error("Failed to load PDF.js:", err);
        });
    }, []);

    return pdfjs;
};

export const calculatePageCount = async (
    pdfjs: typeof PDFJS,
    file: File
): Promise<number> => {
    if (!pdfjs) throw new Error("PDF.js is not loaded yet.");
    try {
        const fileType = file.name.split(".").pop()?.toLowerCase();
        if (fileType === "pdf") {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
            return pdf.numPages;
        }
        throw new Error("Unsupported file type. Only PDFs are supported.");
    } catch (error) {
        console.error("Error calculating page count:", error);
        throw error;
    }
};
