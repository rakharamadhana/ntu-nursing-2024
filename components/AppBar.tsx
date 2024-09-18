"use client";

import Link from "next/link";
import React from "react";
import LoginButton from "@/components/LoginButton";
import { useSession } from "next-auth/react";
import { IconType } from "react-icons";
import { AiOutlineHome } from "react-icons/ai"

const AppBar = () => {
    const { data: session } = useSession();
    return (
        <div className="bg-gradient-to-l from-slate-100 to-slate-300 p-2 flex gap-5 shadow-xl">
            <Link href={"/"} className="flex flex-row items-center px-4">
                <AiOutlineHome/>
            </Link>
            <LoginButton/>
        </div>

    )
};

export default AppBar;