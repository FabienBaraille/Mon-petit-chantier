import { getAuthSession } from "@/lib/auth";
import { Typography } from "@mui/material";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getAuthSession();

  if (session) {
    if (session.user.role === "ADMIN") {
      redirect("/admin")
    }
    if (session.user.role === "USER") {
      redirect("/user")
    }
  }

  return (
    <>
      <Typography variant="h2">Bienvenue</Typography>
      <Typography variant="body1">Vous voici sur le site mon petit chantier</Typography>
    </>
  )
}
