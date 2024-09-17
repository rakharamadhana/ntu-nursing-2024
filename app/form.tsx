"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";

export const RegisterForm = () => {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { data: session } = useSession();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(process.env.DATABASE_URL);

    try {
      const res = await fetch("/api/user/register", {
        method: "POST",
        body: JSON.stringify({
          studentId,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        signIn();
      } else {
        setError((await res.json()).error);
      }
    } catch (error: any) {
      setError(error?.message);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="space-y-12 w-full sm:w-[400px]">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="studentId">學號</Label>
          <Input
            className="w-full"
            required
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            id="text"
            type="text"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="password">密碼</Label>
          <Input
            className="w-full"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
          />
        </div>
        {error && <Alert>{error}</Alert>}
        <div className="w-full">
          <div className="divide-y divide-dashed divide-slate-300">
            <Button className="w-full mb-5" size="lg">
              註冊
            </Button>
            <div className="w-full mb-5"></div>
          </div>
        </div>
      </form>
      <Button
        className="w-full"
        size="lg"
        onClick={() =>
          signIn(session?.user.studentId, {
            callbackUrl: `/`,
          })
        }
      >
        登入
      </Button>
    </div>
  );
};
