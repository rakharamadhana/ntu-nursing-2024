import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const { "messenger user id": messengerId } = body;

  let chatfuel = await prisma.chatfuel.findUnique({
    where: { messengerId },
  });

  if (chatfuel) {
    chatfuel = await prisma.chatfuel.update({
      where: { messengerId },
      data: { correct: { increment: 1 } },
    });

    return NextResponse.json(chatfuel);
  }

  chatfuel = await prisma.chatfuel.create({
    data: {
      messengerId,
      correct: 1,
    },
  });

  return NextResponse.json(chatfuel);
}