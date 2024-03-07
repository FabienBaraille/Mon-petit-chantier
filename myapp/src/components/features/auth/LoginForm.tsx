"use client";

import { useState, MouseEvent } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MyLoadingButton } from "@/components/Theme/Custom/MyLoadingButton";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "./auth.schema";
import { z } from "zod";

export type LoginFormProps = {};
type FormFields = z.infer<typeof LoginSchema>;

export const LoginForm = (props: LoginFormProps) => {

  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      username: "",
      password: ""
    },
    resolver: zodResolver(LoginSchema)
  })
  const onSubmit: SubmitHandler<FormFields> = async(data) => {
    try {
      const response = await signIn("credentials", {username: data.username, password: data.password, redirect: false});

      if (response?.error) {
        toast.error(response.error)
      } else {
        router.push('/');
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit(onSubmit)} action="POST">
      <Controller
        control={control}
        render={({field: { onChange, value }}) => (
          <TextField
            required
            id="username"
            label="Nom d'utilisateur"
            value={value}
            onChange={onChange}
          />
        )}
        name="username"
      />
      <Controller
        control={control}
        render={({field: { onChange, value }}) => (
          <FormControl>
            <InputLabel htmlFor="password">Mot de passe</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    className="classic-button"
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Mot de passe"
              value={value}
              onChange={onChange}
            />
          </FormControl>
        )}
        name="password"
      />
      <MyLoadingButton 
        type="submit"
        loading={isSubmitting}
      >
        Connecter
      </MyLoadingButton>
    </form>
  )
}