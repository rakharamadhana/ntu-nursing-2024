import { NextResponse } from "next/server";

export async function POST(
  request: Request, 
) {
  const body = await request.json();
  const { 
    name,
    password,
   } = body;
  const user = {
    name: name,
    password: password,
  }

  return NextResponse.json(user);
}
