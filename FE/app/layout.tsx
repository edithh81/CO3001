import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "HCMUT SPSS",
    description: "Stupid printing system",
    icons: "favicon.ico",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full no-scrollbar">
            <body className="bg-white h-full">{children}</body>
        </html>
    );
}