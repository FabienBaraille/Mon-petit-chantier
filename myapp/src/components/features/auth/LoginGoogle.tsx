"use client";

import { signIn } from "next-auth/react";
import GoogleIcon from '@mui/icons-material/Google';
import { useMutation } from '@tanstack/react-query';
import { MyLoadingButton } from '@/components/Theme/Custom/MyLoadingButton';

export type LoginGoogleProps = {};

export const LoginGoogle = (props: LoginGoogleProps) => {
  const mutation = useMutation({
    mutationFn: async () => signIn("google")
  })
  return (
    <MyLoadingButton
      onClick={() => mutation.mutate()}
      loading={mutation.isPending}
      startIcon={<GoogleIcon />}
    >
      Connecter avec Google
    </MyLoadingButton>
  )
}