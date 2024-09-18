import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

const SECRET_KEY = process.env.CHATFUEL_API_SECRET_KEY; // Get the secret from .env

export async function POST(request: Request) {
  // Check for the secret key in the headers
  const apiKey = request.headers.get("x-api-key");

  // Verify if the key in the request matches the secret key
  if (!apiKey || apiKey !== SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { "messenger user id": messengerId, "student id": studentId, correct: score } = body;

  if (!messengerId || !studentId) {
    return NextResponse.json({ error: "messengerId and studentId are required" }, { status: 400 });
  }

  let chatfuel = await prisma.chatfuel.findUnique({
    where: { messengerId },
  });

  if (chatfuel) {
    chatfuel = await prisma.chatfuel.update({
      where: { messengerId },
      data: { correct: score, studentId },
    });

    return NextResponse.json(chatfuel);
  }

  chatfuel = await prisma.chatfuel.create({
    data: {
      messengerId,
      studentId,
      correct: score,
    },
  });

  return NextResponse.json(chatfuel);
}
