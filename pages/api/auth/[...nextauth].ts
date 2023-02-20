import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) return null;
        const { email, password } = credentials;
        try {
          const authenticatedUser = await prisma.user.findFirstOrThrow({
            where: { email },
          });
          if (authenticatedUser && authenticatedUser.password === password) {
            return { ...authenticatedUser };
          } else {
            return null;
          }
        } catch {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      const role: Role =
        user && "role" in user && user.role ? (user.role as Role) : "USER";
      return { ...token, role };
    },
    async session({ token, session }) {
      return { ...session, user: { ...session.user, role: token.role } };
    },
  },
};

export default NextAuth(authOptions);
