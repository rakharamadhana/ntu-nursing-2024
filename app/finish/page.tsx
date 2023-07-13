'use client'
import { useSession } from "next-auth/react"

const FinishPage = () => {
    const { data: session } = useSession();

    return (
        <div className="bg-slate-50 rounded-lg p-5 m-5 text-[40px]">
            🏅🏅🏅🏅🏅🏅🏅🏅🏅🏅🏅🏅🏅🏅🏅🏅
            🏅🏅🏅🏅🏅🏅🏅🏅
            學號：{session?.user.studentId} 已經完成
            🏅🏅🏅🏅🏅🏅🏅🏅🏅🏅🏅🏅🏅🏅🏅🏅
            🏅🏅🏅🏅🏅🏅🏅🏅🏅🏅🏅🏅
        </div>
    )
}

export default FinishPage;