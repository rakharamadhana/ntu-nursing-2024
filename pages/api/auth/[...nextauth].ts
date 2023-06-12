import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                name: { label: "Username", type: "text", placeholder: "B10831001" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                // Add logic here look up the user from the credentials supplied

                const res = await fetch("http://localhost:3000/api/user/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: credentials?.name,
                        password: credentials?.password,
                    }),
                });
                const user = await res.json();
                console.log(JSON.stringify(user))

                if(user) {
                    return user;
                } else {
                    return null;
                }
            }
        })
    ],

    // callbacks: {
    //     async session({ session, token, user }) {
    //         // Send properties to the client, like an access_token and user id from a provider

    //     }
    // }

    // pages: {
    //     signIn: "/auth/signIn"
    // }
}

export default NextAuth(authOptions)