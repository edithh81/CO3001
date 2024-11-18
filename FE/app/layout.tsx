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
        <html lang="vi" className="no-scrollbar">
            <body className="">{children}</body>
        </html>
    );
}
