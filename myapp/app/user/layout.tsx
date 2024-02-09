import { PropsWithChildren } from "react";
// import { withRoles } from "../Utils/withRoles";

export default function userLayout({ children }: PropsWithChildren) {

  return (
    <>
      {children}
    </>
  )
}

// export default withRoles(userLayout, 'user');