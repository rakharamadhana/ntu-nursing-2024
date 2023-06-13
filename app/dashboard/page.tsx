
import EmptyState from "@/app/components/EmptyState";

import getCurrentUser from "../action/getCurrentUser";

//import DashboardClient from "./DashboardClient"

const DashboardPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
        <EmptyState
          title="Unauthorized"
          subtitle="Please login"
        />
    )
  }

  if (Number(currentUser.studentId) % 2 === 0) {
    return (
        <EmptyState
          title="Even Number"
          subtitle="Even Number"
        />
    );
  }

  if (Number(currentUser.studentId) % 2 === 1) {
    return (
        <EmptyState
          title="Odd Number"
          subtitle="Odd Number"
        />
    );
  }

  return (
    <></>
  );
}
 
export default DashboardPage;