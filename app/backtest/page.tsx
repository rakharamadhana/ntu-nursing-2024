import EmptyState from "@/components/EmptyState";
import BackTestClient from "./BackTestClient";
import getCurrentUser from "@/app/action/getCurrentUser";


const BackTestPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const lastChar = currentUser.studentId.charAt(currentUser.studentId.length - 1);
  const isEven = Number(lastChar) % 2 === 0;

  if (isEven) {
    return (
      <div className="flex flex-col items-center pt-10">
          <BackTestClient className=""/>
      </div>
    );
  }

  if (!isEven) {
    return (
      <div className="flex flex-col items-center pt-10">
          <BackTestClient className=""/>
      </div>
    );
  }

  return <></>;
};

export default BackTestPage;
