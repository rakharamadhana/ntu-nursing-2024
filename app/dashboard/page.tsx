import EmptyState from "@/components/EmptyState";
import DashboardClient from "./DashboardClient";
import getCurrentUser from "../action/getCurrentUser";


const DashboardPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
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
