import { getAuthSession } from "@/lib/auth";
import { LoginBtn } from "./LoginBtn";
import { LoggedMenu } from "./LoggedMenu";

export type AuthElementProps = {};

export const AuthElement = async (props: AuthElementProps) => {
  const session = await getAuthSession();
  const user = session?.user;

  return (
    !user ? <LoginBtn /> : <LoggedMenu user={user} />
  )
}