import Image from "next/image";
import React from "react";

const Footer = () => {
    return (
        <div className="w-full flex justify-between items-center bg-[#030391] p-4">
            <div className="flex flex-col justify-center items-center">
                <Image
                    src={"/images/logowithborder.png"}
                    alt="logo"
                    width={100}
                    height={100}
                />
                <p className="text-white text-base">
                    Student Smart Printing Service
                </p>
            </div>

            <div className="flex flex-col justify-start items-start text-white">
                <p className="font-bold text-base">
                    Thông tin liên hệ và hỗ trợ
                </p>
                <p>028 3865 1670</p>
                <p>hcmut.spss@hcmut.edu.vn</p>
            </div>
        </div>
    );
};

export default Footer;