"use client";

import Link from "next/link";
import React from "react";
import LoginButton from "@/app/LoginButton";
import { useSession } from "next-auth/react";

const AppBar = () => {
    const { data: session } = useSession();
    return (
        <div className="bg-gradient-to-b from-cyan-50 to-cyan-300 p-2 flex gap-5">
            <Link href={"/"}>Home</Link>
            <LoginButton />
        </div>
    )
};

export default AppBar;