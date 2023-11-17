import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";

interface Params {
    id: number;
  }

export async function GET(
    request: Request,
    { params }: { params: Params }
) {
  const { id } = params;
  let messengerId;
  if (typeof id !== "number") {
    messengerId = +id[0]
  }

  let chatfuel = await prisma.chatfuel.findUnique({
    where: { messengerId },
  });

  if (chatfuel) {
    return NextResponse.json(chatfuel);
  }

  return NextResponse.json('sorry not found');
}