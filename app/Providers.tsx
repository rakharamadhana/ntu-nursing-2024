"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

interface providerProps {
    children: ReactNode;
}

function Providers({ children }: providerProps) {
    return <SessionProvider>{children}</SessionProvider>;
}

export default Providers;