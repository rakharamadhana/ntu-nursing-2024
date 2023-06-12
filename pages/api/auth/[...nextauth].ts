import NextAuth ,{ NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from 'bcrypt';

import prisma from "@/app/libs/prismadb";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                name: {label: "Username", type: "text", placeholder: "someone" },
                studentId: { label: "Student ID", type: "text", placeholder: "10859001" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                // Add logic here look up the user from the credentials supplied
                if (!credentials?.studentId || !credentials.password) {
                    throw new Error('Invalid credentials');
                }

                const user = await prisma.user.findUnique({
                    where: {
                      studentId: credentials.studentId,
                    }
                });

                if (!user || !user?.hashedPassword) {
                    throw new Error('Invalid credentials');
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );
                if (!isCorrectPassword) {
                    throw new Error('Invalid Password');
                }

                return user
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async jwt({token, user}: any) {
            if(user) {
                token.studentId = user.studentId
            }
            console.log("user :" + JSON.stringify(user))
            console.log("token :" + JSON.stringify(token))
            return token;
        },
        async session({ session, token, user }: any) {
            // Send properties to the client, like an access_token and user id from a provider
            session.user.studentId = token.studentId;
            
            return session
        }
    }

    // pages: {
    //     signIn: "/auth/signIn"
    // }
}

export default NextAuth(authOptions);