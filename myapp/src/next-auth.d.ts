import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string,
      email: string,
      image?: string,
      name: string,
      role?: string,
      status?: string,
      username?: string
    }
    & DefaultSession['user'];
  }
  interface User {
    id: string,
    email: string,
    image?: string,
    name: string,
    role?: string,
    status?: string,
    username?: string
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: string;
    status?: string,
  }
}