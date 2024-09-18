import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const { "messenger user id": messengerId, "student id": studentId, correct: score } = body;

  // Ensure that both messengerId and studentId are present
  if (!messengerId || !studentId) {
    return NextResponse.json({ error: "messengerId and studentId are required" }, { status: 400 });
  }

  let chatfuel = await prisma.chatfuel.findUnique({
    where: { messengerId },
  });

  if (chatfuel) {
    // Update the existing record with the new score
    chatfuel = await prisma.chatfuel.update({
      where: { messengerId },
      data: { correct: score, studentId }, // Update correct and studentId
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