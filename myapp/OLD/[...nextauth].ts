import { env } from '@/lib/env';
import { prisma } from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { randomUUID, randomBytes } from 'crypto';
import { createSession } from '../../../src/Utils/Request/createSession';
import { getAuthUser } from '@/Utils/Request/getAuthUser';
import { getUserFromDb } from '@/Utils/Request/getUser';

import Cookies from 'cookies';
import { NextRequest, NextResponse } from 'next/server';

const bcrypt = require('bcryptjs');

const generateSessionToken = () => {
  return randomUUID?.() ?? randomBytes(15).toString("hex")
}

const fromDate = (time: number, date = Date.now()) => {
  return new Date(date + time * 1000)
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
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

        let user = null;
        user = await getAuthUser(credentials?.username);

        if (!user) {
          console.log('Utilisateur non trouvé');
          return null
          // throw new Error("Utilisateur non trouvé")
        }

        const passwordMatch = await bcrypt.compare(credentials.password, user.password);

        if (!passwordMatch) {
          console.log('Mot de passe faux');
          return null
          // throw new Error("Le mot de passe n'est pas correct")
        }

        // const sessionToken = generateSessionToken();
        // const expires = fromDate(30 * 24 * 60 * 60);
        // const session = await createSession({userId: user.id, sessionToken: sessionToken, expires: expires});
        // console.log('cookies !');
        // Pourquoi les cookies ne fonctionnent pas ?
        // cookies().set("next-auth.session-token", sessionToken, {
        //   expires: expires,
        // });

        const userAccount = {
          id: user.id,
          email: user.email,
          image: user.image,
          name: user.username,
          role: user.role,
          status: user.status
        }

        return userAccount;
      }
    }),
    GoogleProvider({
      clientId: env.GOOGLE_ID,
      clientSecret: env.GOOGLE_SECRET
    }),
  ],
  session: {
    strategy:  "database"
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({user, account, profile, email, credentials}) {

      if (credentials) {
        if (user) {
          const sessionToken = generateSessionToken();
          const expires = fromDate(30 * 24 * 60 * 60);
          await createSession({userId: user.id, sessionToken: sessionToken, expires: expires});
          const cookies = new Cookies(NextRequest, NextResponse);

        }
      }

      
        console.log('cookies !');

      return true;
    },
    async jwt({token, user}) {
      console.log('JWT');

      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }

      return token;
    },
    async session({session, user}) {

      const userFind = await getUserFromDb('', user.email);

      session.user.id = userFind[0].id;
      session.user.email = userFind[0].email;
      session.user.role = userFind[0].role ;
      session.user.image = userFind[0].image;
      session.user.name = userFind[0].name;
      session.user.username = userFind[0].username;
      session.user.status = userFind[0].status;

      return session
    },
    redirect({baseUrl}) {
      baseUrl = "http://localhost:3000/";
      return baseUrl
    }
  },
  pages: {
    signIn: '/account/login'
  }
};


export default NextAuth(authOptions);