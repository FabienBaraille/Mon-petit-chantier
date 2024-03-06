import { LoginBtn } from "./LoginBtn";
import { LoggedMenu } from "../loggedMenu/LoggedMenu";
import { getAuthSession } from "@/lib/auth";

export type AuthElementProps = {};

export const AuthElement = async (props: AuthElementProps) => {

  const session = await getAuthSession();

  const user = session?.user;

  return (
    !user ? <LoginBtn /> : <LoggedMenu user={user} />
  )
}