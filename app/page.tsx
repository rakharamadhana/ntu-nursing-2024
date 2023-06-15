import Image from "next/image";
import Link from "next/link";
import { AiOutlineDashboard } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { RegisterForm } from "./form";
import getCurrentUser from "./action/getCurrentUser";

export default async function Home() {
  const currentUser = await getCurrentUser()
  if(currentUser?.studentId){
    return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
      <Link href="/dashboard">
        <Button>開始測驗</Button>
      </Link>
    </div>
  );
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
      <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12">
        <h1 className="font-semibold text-2xl">Create your Account</h1>
        <RegisterForm />
        <p className="text-center"></p>
      </div>
    </div>
  )
  
}
