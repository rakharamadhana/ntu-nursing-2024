import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prismadb";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { studentId, password } = body;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { studentId },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: '該學號的用戶已經存在。' },
                { status: 400 }
            );
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create the new user
        const user = await prisma.user.create({
            data: {
                studentId,
                hashedPassword, // Ensure you use the correct field name
            },
        });

        return NextResponse.json(user);
    } catch (error: any) {
        if (error.code === 'P2002') {
            // Unique constraint failed error
            return NextResponse.json(
                { error: '該學號的用戶已經存在。' },
                { status: 400 }
            );
        }

        // Handle other errors
        return NextResponse.json(
            { error: 'An unexpected error occurred.' },
            { status: 500 }
        );
    }
}
