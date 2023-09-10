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

  if (Number(currentUser.studentId) % 2 === 0) {
    return (
      <div className="flex flex-col items-center pt-10">
          <DashboardClient className=""/>
      </div>
    );
  }

  if (Number(currentUser.studentId) % 2 === 1) {
    return (
      <div className="flex flex-col items-center pt-10">
          <DashboardClient className=""/>
      </div>
    );
  }

  return <></>;
};

export default DashboardPage;
