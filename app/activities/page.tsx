import EmptyState from "@/components/EmptyState";
import getCurrentUser from "@/app/action/getCurrentUser";
import getFullUser from "@/app/action/getFullUser";
import ReflectiveFormClient from "./ReflectiveFormClient";
import ChatbotClient from "./ChatbotClient";

const DashboardPage = async () => {
  const currentUser = await getCurrentUser();
  const fullUser = await getFullUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  if (!fullUser?.kolb) {
    return <EmptyState title="Ｕnable to read kolb result" subtitle="Please finish the kolb test first" />;
  }

  return (
      <>
        <ChatbotClient />
      </>);
};

export default DashboardPage;
