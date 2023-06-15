"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const LoginButton = () => {
    const { data: session } = useSession();
    console.log(JSON.stringify(session));
    return (
        <div className="ml-auto flex gap-2">
            {session?.user ? (
                <>
                    <p className="text-neutral-500"> {session.user.studentId}</p>
                    <button className="text-neutral-400" onClick={() => signOut()}>
                        登出
                    </button>
                </>
            ) : (
                <button className="text-neutral-400" onClick={() => signIn(session?.user.studentId, {
                    callbackUrl: `/`,
                  })}>
                    登入
                </button>
            )}
        </div>
    );
};

export default LoginButton;