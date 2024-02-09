import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

import NextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWTEncodeParams, JWTDecodeParams, decode, encode } from "next-auth/jwt";

import { randomBytes, randomUUID } from "crypto";
import Cookies from 'cookies';
import bcrypt from 'bcrypt';

import { env } from "@/lib/env";
import { getAuthUser } from "@/Utils/Request/getAuthUser";
import { getUserFromDb } from "@/Utils/Request/getUser";

const generateSessionToken = () => {
  return randomUUID?.() ?? randomBytes(15).toString("hex")
}

const fromDate = (time: number, date = Date.now()) => {
  return new Date(date + time * 1000)
}

export function authOptionsWrapper(req: NextApiRequest, res: NextApiResponse) {

  const isCredentialsCallback = req.query.nextauth?.includes('callback') && req.query.nextauth.includes('credentials') && req.method === 'POST';

  const cookies = new Cookies(req, res);

  const adapter = PrismaAdapter(prisma);

  const callbacks = {
    // SignIn callback to set session token and user Id in cookie
    async signIn({user} : {user: AdapterUser}) {
      if (isCredentialsCallback) {
        if (user) {
          const sessionToken = generateSessionToken();
          const expires = fromDate(30 * 24 * 60 * 60);
          await prisma.session.create({data : {userId: user.id, sessionToken, expires}});

          cookies.set("next-auth.session-token", sessionToken, {
            expires: expires,
          });
        }
      }
      return true
    },
    redirect({baseUrl} : {baseUrl: string}) {
      baseUrl = "http://localhost:3000/";
      return baseUrl
    },
    // Custom session object
    async session({session, user}) {

      const userFind = await getUserFromDb('', user.email);

      session.user.id = userFind[0].id;
      session.user.email = userFind[0].email;
      session.user.role = userFind[0].role ;
      session.user.image = userFind[0].image;
      session.user.name = userFind[0].name;
      session.user.status = userFind[0].status;

      return session
    },
    async jwt({ token, user }) {
      console.log('jwt callback');
      
      if (user) token.role = user.role;
      return token;
    },
  }

  const providers = [
    // Provider for signin with username/password
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
  ]
  const options: AuthOptions = {
    adapter: adapter,
    providers: providers,
    callbacks: callbacks,
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
      maxAge: 60 * 60 * 24 * 30,
      async encode(params: JWTEncodeParams) {
        if (isCredentialsCallback) {
          const cookie = cookies.get("next-auth.session-token");
          // console.log('cookie');

          if (cookie) return cookie;
          return "";
        }

        return encode(params);
      },
      async decode(params: JWTDecodeParams) {
        if (isCredentialsCallback) {
          return null;
        }
        return decode(params);
      },
    },
    pages: {
      signIn: '/account/login'
    },
    events: {
      async signOut({ session }) {
        const { sessionToken = "" } = session as unknown as {
          sessionToken?: string;
        };

        if (sessionToken) {
          await prisma.session.deleteMany({
            where: {
              sessionToken,
            },
          });
        }
      },
    },
  }
  return [req, res, options] as const;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return NextAuth(...authOptionsWrapper(req, res));
}