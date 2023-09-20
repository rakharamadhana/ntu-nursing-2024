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

  // Even Number
  const lastChar = currentUser.studentId.charAt(currentUser.studentId.length - 1);
  const isEven = Number(lastChar) % 2 === 0;

  if (isEven) {
    switch (fullUser.kolb) {
      case '收斂型':
        return (
          <>
            <ReflectiveFormClient />
          </>
        );
      case '分散型':
        return (
          <>
            <ChatbotClient />
          </>
        );
      case '同化型':
        return (
          <>
            <ChatbotClient />
          </>
        );
      case '調適型':
        return (
          <>
            <ReflectiveFormClient />
          </>
        );
      default: 
        return <EmptyState title="Error" subtitle="學習風格錯誤請重新測驗" />
    }
  }

  // Odd Number
  if (!isEven) {
    switch (fullUser.kolb) {
      case '收斂型':
        return (
          <>
            <ChatbotClient />
          </>
        );
      case '分散型':
        return (
          <>
            <ReflectiveFormClient />
          </>
        );
      case '同化型':
        return (
          <>
            <ReflectiveFormClient />
          </>
        );
      case '調適型':
        return (
          <>
            <ChatbotClient />
          </>
        );
      default: 
        return <EmptyState title="Error" subtitle="學習風格錯誤請重新測驗" />
    }
  }

  return <></>;
};

export default DashboardPage;
