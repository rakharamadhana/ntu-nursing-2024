import { NextResponse } from "next/server";
import getCurrentUser from "@/app/action/getCurrentUser";
import prisma from "@/lib/prismadb";

export async function POST(
  request: Request, 
) {
  const body = await request.json();
  const { kolb } = body;

  const currentUser = await getCurrentUser();

  if (currentUser) {
    // Update user's kolb
    const updatedUser = await prisma.user.update({
      where: { studentId: currentUser.studentId },
      data: { kolb: kolb },
    });

    return NextResponse.json(updatedUser);
  } else {
    // Return error response if no user found
    return NextResponse.json({ error: "User not found" });
  }
}
