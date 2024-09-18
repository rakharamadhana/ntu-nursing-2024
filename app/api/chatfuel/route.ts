import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const { "messenger user id": messengerId, "student_id": studentId, "correct": score } = body;

  let chatfuel = await prisma.chatfuel.findUnique({
    where: { messengerId },
  });

  if (chatfuel) {
    chatfuel = await prisma.chatfuel.update({
      where: { messengerId },
      data: { correct: score }, // Directly set the correct field to the new score
    });

    return NextResponse.json(chatfuel);
  }

  // Create a new record if it doesn't exist
  chatfuel = await prisma.chatfuel.create({
    data: {
      messengerId,
      studentId,
      correct: score, // Set the initial correct score from the request
    },
  });

  return NextResponse.json(chatfuel);
}
