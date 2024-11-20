import React from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
    return  (
        <div className="w-full h-auto flex justify-between items-center bg-main p-4">
            {/* Navigation Links */}
            <div className="flex flex-1 text-white space-x-6 justify-center">
                <Link href="/" className="px-4 hover:underline">
                    Trang chủ
                </Link>
                <Link href="#" className="px-4 hover:underline">
                    In ấn
                </Link>
                <Link href="/history" className="px-4 hover:underline">
                    Lịch sử in ấn
                </Link>
                <Link href="#" className="px-4 hover:underline">
                    Thanh toán
                </Link>
            </div>
        </div>
    );
};

export default Header;
