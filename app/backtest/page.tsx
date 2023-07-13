import EmptyState from "@/components/EmptyState";
import BackTestClient from "./BackTestClient";
import getCurrentUser from "@/app/action/getCurrentUser";


const BackTestPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  if (Number(currentUser.studentId) % 2 === 0) {
    return (
      <div className="flex flex-col items-center pt-10">
          <BackTestClient className=""/>
      </div>
    );
  }

  if (Number(currentUser.studentId) % 2 === 1) {
    return (
      <div className="flex flex-col items-center pt-10">
          <BackTestClient className=""/>
      </div>
    );
  }

  return <></>;
};

export default BackTestPage;
