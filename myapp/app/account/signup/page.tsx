import { SignUpForm } from "@/components/features/auth/SignUpForm";
import { Card, CardContent, Divider, Typography } from "@mui/material";

export default function SignUp() {
  return (
    <Card className="flex flex-col items-center gap-2 sm:w-96">
      <Typography variant="h4" mt={1} px={1} >Création de compte</Typography>
      <Divider className="w-full" />
      <CardContent className="flex flex-col items-center gap-2">
        <SignUpForm />
      </CardContent>
    </Card>
  )
}