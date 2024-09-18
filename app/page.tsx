import Image from "next/image";
import Link from "next/link";
import { AiOutlineDashboard } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { RegisterForm } from "./form";
import getCurrentUser from "./action/getCurrentUser";

export default async function Home() {
  const currentUser = await getCurrentUser();
  if (currentUser?.studentId) {
    return (
      <div className="h-[90vh] w-screen flex justify-center items-center bg-slate-200 flex-col">
        <div className="flex justify-center items-center bg-slate-50 flex-col h-auto rounded-lg m-5 p-5">
          <div className="text-[20px] bold ">團隊會議與家庭會議線上課程</div>
          <div className="p-5">
            歡迎同學們來此學習團隊會議與家庭會議線上課程，
            此堂課團隊會議與家庭會議著重在前兩階段，評估以及確認問題，
            後半段的處置與照護及持續照護將不在此範圍內，
            接著會先請同學進行三份問卷及一份測驗題填寫，
            問卷包含：學習動機、學習滿意度以及學習風格，
            測驗題為護理疼痛相關知識，
            待作答完成後，會根據你的學習風格給予你學習教材、學習練習，
            課程時間統一限制於<p className="inline text-red-400">50分鐘</p>
            內完成，請同學們放輕鬆按照提示依序作答，別忘記把握時間喔！
          </div>
          <Link href="/dashboard">
            <Button>開始測驗</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-200">
      <div className="sm:shadow-xl px-8 pb-8 pt-12 bg-slate-50 rounded-xl space-y-12">
        <h1 className="font-semibold text-2xl">用學號創建帳戶</h1>
        <RegisterForm />
        <p className="text-center"></p>
      </div>
    </div>
  );
}
