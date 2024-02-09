"use client";

import { useState, MouseEvent } from "react";
import { Controller, useForm } from "react-hook-form";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { MyAppBtn } from "@/components/Theme/Custom/MyAppBtn";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export type LoginFormProps = {};

export const LoginForm = (props: LoginFormProps) => {

  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: ""
    },
  })
  const onSubmit = async(data: { username: any; password: any; }) => {
    try {
      const response = await signIn("credentials", {username: data.username, password: data.password, redirect: false});
      // Affichage d'erreur avec toast à faire
      if (response?.error) {
        setErrorMessage(response.error);
        setTimeout(() => {
          setErrorMessage('');
        }, 2000)
      } else {
        router.replace('/')
      }
    } catch (error: any) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage('');
      }, 2000)
    }
  }

  if (errorMessage !== '') {
    return <div>{errorMessage}</div>
  }

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit(onSubmit)} action="POST">
      <Controller
        control={control}
        rules={{
          required: true
        }}
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
        rules={{
          required: true
        }}
        render={({field: { onChange, value }}) => (
          <FormControl required>
            <InputLabel htmlFor="password">Mot de passe</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
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
      <MyAppBtn 
        type="submit"
      >
        Connecter
      </MyAppBtn>
    </form>
  )
}