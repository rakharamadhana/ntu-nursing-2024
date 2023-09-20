import EmptyState from "@/components/EmptyState";
import DashboardClient from "./DashboardClient";
import getCurrentUser from "../action/getCurrentUser";
import { Button } from '@/components/ui/button'

const DashboardPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <>
        <EmptyState title="尚未登入" subtitle="請至首頁註冊" button/>
      </>
    )
  }

  const lastChar = currentUser.studentId.charAt(currentUser.studentId.length - 1);
  const isEven = Number(lastChar) % 2 === 0;

  if (isEven) {
    return (
      <div className="flex flex-col items-center pt-10">
          <DashboardClient className=""/>
      </div>
    );
  }

  if (!isEven) {
    return (
      <div className="flex flex-col items-center pt-10">
          <DashboardClient className=""/>
      </div>
    );
  }

  return <></>;
};

export default DashboardPage;
