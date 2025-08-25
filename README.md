import { AuthOptions, getServerSession } from "next-auth"
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_SECRET } from "./env"
import GoogleProvider from "next-auth/providers/google"
import { findOrCreateUser } from "@/components/featured/auth/services/auth.service";
import prisma from "../../lib/prisma";

const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET
        })
    ],
    secret: NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn({ user, account }) {
            await findOrCreateUser({
                email: user.email!,
                googleId: account?.providerAccountId || "",
                name: user.name || "",
                image: user.image || "",
            });
            return true;
        },
        async jwt({ token, user, account }) {
            if (account && user) {
                const dbUser = await prisma.user.findUnique({
                    where: { email: user.email! },
                });

                if (dbUser) {
                    token.userId = dbUser.id
                }
            }
            return token
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.userId as string
            }
            return session
        },
    },
    pages: {
        signIn: "/",
    },
}

const getSession = () => getServerSession(authOptions)
export { authOptions, getSession }