import React from "react";
import SignIn from "@/components/form/SignIn";
const page = () => {
    return (
        <div className="w-full flex h-full justify-center items-center">
            <SignIn type="admin" />
        </div>
    );
};

export default page;
