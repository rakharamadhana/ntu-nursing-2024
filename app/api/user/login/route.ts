import { NextResponse } from "next/server";

export async function POST(
  request: Request, 
) {
  const body = await request.json();
  const { 
    name,
    studentId,
    password,
   } = body;
  const user = {
    name: name,
    studentId: studentId, 
    password: password,
  }

  return NextResponse.json(user);
}
