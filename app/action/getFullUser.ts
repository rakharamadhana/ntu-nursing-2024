import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/lib/prismadb";

export async function getSession() {
  return await getServerSession(authOptions)
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    const currentUser = session?.user

    if (!currentUser) {
      return null;
    }

    const fullUser = await prisma.user.findUnique({
        where: { studentId: currentUser.studentId }
    })
    if(fullUser){
      return {
        ...currentUser,
        kolb: fullUser.kolb
      }
    }
  } catch (error: any) {
    return null;
  }
}
