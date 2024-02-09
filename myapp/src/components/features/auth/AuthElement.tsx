"use client";

import { LoginBtn } from "./LoginBtn";
import { LoggedMenu } from "./LoggedMenu";
import { useSession } from "next-auth/react";

export type AuthElementProps = {};

export const AuthElement = (props: AuthElementProps) => {

  const session = useSession();
  
  const user = session.data?.user;

  return (
    !user ? <LoginBtn /> : <LoggedMenu user={user} />
  )
}