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

// GET method - fetching the correct answers for a specific student and messenger ID
export async function GET(request: Request) {
  const apiKey = request.headers.get("x-api-key");

  // Check API Key for authorization
  if (!apiKey || apiKey !== SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Extract query parameters from the request URL
  const { searchParams } = new URL(request.url);
  const studentId = searchParams.get("studentId");

  // Ensure studentId parameter is present
  if (!studentId) {
    return NextResponse.json({ error: "Valid studentId is required" }, { status: 400 });
  }

  // Fetch the record from the database using Prisma
  const user = await prisma.user.findFirst({
    where: { studentId },
    select: {
      studentId: true, // Fetch the studentId
      kolb: true,      // Fetch the kolb field
    },
  });

  // If no record is found, return a 404 error
  if (!user) {
    return NextResponse.json({ error: "Record not found" }, { status: 404 });
  }

  // Return the studentId and kolb from the database
  return NextResponse.json({
    studentId: user.studentId,
    kolb: user.kolb,
  });
}