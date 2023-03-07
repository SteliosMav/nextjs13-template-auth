import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import { compare } from "bcrypt";
import { getUserByEmail } from "@/lib/prisma/users";

const nextAuthConfig: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile: (profile, tokens) => {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: "USER",
        };
      },
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
          const res = await getUserByEmail(email);
          const authenticatedUser = res.data;
          if (
            authenticatedUser &&
            authenticatedUser.emailVerified &&
            authenticatedUser.password
          ) {
            const passwordMatches = await compare(
              password,
              authenticatedUser.password
            );
            return passwordMatches ? { ...authenticatedUser } : null;
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
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      const role: Role =
        user && "role" in user && user.role ? (user.role as Role) : "USER";
      const next: any = { ...token, role };
      if (user) next.userId = user.id;
      return next;
    },
    async session({ token, session }) {
      return {
        ...session,
        user: {
          ...session.user,
          role: token.role as Role,
          id: token.userId as string,
        },
      };
    },
  },
};

export default nextAuthConfig;
