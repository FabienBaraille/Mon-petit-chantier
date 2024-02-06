import { LoginForm } from "@/components/features/auth/LoginForm";
import { LoginGoogle } from "@/components/features/auth/LoginGoogle";
import { Card, CardContent, Divider, Link, Typography } from "@mui/material";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center">
      <Card className="m-4 flex flex-col items-center gap-2 shadow-lg sm:w-96">
        <Typography variant="h4" className="mt-2" >Connexion</Typography>
        <Divider className="w-full" />
        <CardContent className="flex flex-col items-center gap-4">
          <LoginForm />
          <Divider className="w-full" />
          <LoginGoogle />
        </CardContent>
      </Card>
      <Link href='/account/signup'>{`Je n'ai pas de compte`}</Link>
    </div>
  )
}