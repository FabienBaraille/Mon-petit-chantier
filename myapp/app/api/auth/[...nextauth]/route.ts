import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";

import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { getAuthUser } from "@/Utils/Request/getAuthUser";
import { env } from "@/lib/env";

import bcrypt from 'bcrypt';

const adapter = PrismaAdapter(prisma);

export const authOptions: NextAuthOptions = {
  adapter: adapter,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "username", type: "text", placeholder: "username"},
        password: { label: "password", type: "password"}
      },
      async authorize(credentials) {

        if (!credentials?.username || !credentials.password) {
          return null
        }

        const user = await getAuthUser(credentials?.username);
        if (!user) {
          throw new Error("Utilisateur non trouvé")
        }

        const passwordMatch = await bcrypt.compare(credentials.password, user?.password!);
        if (!passwordMatch) {
          throw new Error("Le mot de passe n'est pas correct")
        }
        return user;
      }
    }),
    GoogleProvider({
      clientId: env.GOOGLE_ID,
      clientSecret: env.GOOGLE_SECRET
    }),
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.status = user.status;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          role: token.role,
          status: token.status
        },
      };
    },
    redirect({baseUrl} : {baseUrl: string}) {
      baseUrl = "http://localhost:3000";
      return baseUrl
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/account/login'
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };