import { env } from '@/lib/env';
import { prisma } from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUserFromDb } from '../../../app/account/Utils/getUser';

const bcrypt = require('bcryptjs');

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  theme: {
    logo: '/images/logo-text.png',
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "username", type: "text", placeholder: "username"},
        password: { label: "password", type: "password"}
      },
      async authorize(credentials) {
        let user = null;
        user = await getUserFromDb({
          username: credentials?.username
        });

        // if (!user) {
        //   throw new Error("Utilisateur non trouvé")
        // }

        // if (user.password !== credentials?.password) {
        //   throw new Error("Le mot de passe n'est pas correct")
        // }

        return user;
      }
    }),
    GoogleProvider({
      clientId: env.GOOGLE_ID,
      clientSecret: env.GOOGLE_SECRET
    }),
  ],
  // session: {
  //   strategy: "jwt",
  // },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      session.user.image = user.image;
      return session;
    },
    redirect({baseUrl}) {
      baseUrl = "http://localhost:3000/";
      return baseUrl
    }
  },
  pages: {
    signIn: '/auth/signin'
  },
  // debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);
