import { getServerSession } from "next-auth/next"

import { authOptions } from "@/pages/api/auth/[...nextauth]";

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

    return {
      ...currentUser
    };
  } catch (error: any) {
    return null;
  }
}
