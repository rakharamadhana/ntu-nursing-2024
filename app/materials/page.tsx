import EmptyState from "@/components/EmptyState";
import getCurrentUser from "@/app/action/getCurrentUser";
import getFullUser from "../action/getFullUser";
import DivergentClient from "./DivergentClient";
import ConvergentClient from "./ConvergentClient";

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
            <DivergentClient />
          </>
        );
      case '分散型':
        return (
          <>
            <ConvergentClient />
          </>
        );
      case '同化型':
        return (
          <>
            <DivergentClient />
          </>
        );
      case '調適型':
        return (
          <>
            <ConvergentClient />
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
           <ConvergentClient />
          </>
        );
      case '分散型':
        return (
          <>
            <DivergentClient />
          </>
        );
      case '同化型':
        return (
          <>
           <ConvergentClient />
          </>
        );
      case '調適型':
        return (
          <>
            <DivergentClient />
          </>
        );
      default: 
        return <EmptyState title="Error" subtitle="學習風格錯誤請重新測驗" />
    }
  }

  return <></>;
};

export default DashboardPage;
