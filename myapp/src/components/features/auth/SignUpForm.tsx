"use client";

import { useEffect, useState, ChangeEvent, MouseEvent } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { Strength } from "./strength/Strength";

import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useRouter } from "next/navigation";
import { MyLoadingButton } from "@/components/Theme/Custom/MyLoadingButton";
import toast from "react-hot-toast";
import { z } from "zod";
import { SignUpSchema } from "./auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";

type FormFields = z.infer<typeof SignUpSchema>;

export const SignUpForm = () => {

  const router = useRouter();

  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmation: ""
    },
    resolver: zodResolver(SignUpSchema)
  })
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = 
        await fetch("/api/auth/register", {
          body: JSON.stringify(data),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
      if (response.status === 500) {
        toast.error(response.statusText)
      } else {
        toast.success(response.statusText)
        setTimeout(() => {
          router.push('/account/login')
        }, 2500)
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} action="POST">
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <FormControl>
            <TextField
              id="username"
              label="Nom d'utilisateur"
              value={value}
              onChange={onChange}
              aria-describedby="username-helper"
            />
            {errors.username && <FormHelperText id="username-helper" >{errors.username.message}</FormHelperText>}
          </FormControl>
        )}
        name="username"
      />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <FormControl>
            <TextField
              id="email"
              label="Email"
              value={value}
              onChange={onChange}
              aria-describedby="email-helper"
            />
            {errors.email && <FormHelperText id="email-helper" >{errors.email.message}</FormHelperText>}
          </FormControl>
        )}
        name="email"
      />
      <Controller
        control={control}
        render={({ field }) => (
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
              value={field.value}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setPassword(event.target.value);
                field.onChange(event.target.value);
              }}
              aria-describedby="password-helper"
            />
            {errors.password != undefined && <FormHelperText id="password-helper" >{errors.password.message}</FormHelperText>}
          </FormControl>
        )}
        name="password"
      />
      {password != '' && <Strength password={password} />}
      <Controller
        control={control}
        render={({field: {value, onChange}}) => (
          <FormControl>
            <InputLabel htmlFor="confirmation">Confirmation</InputLabel>
            <OutlinedInput
              id="confirmation"
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
              label="Confirmation"
              value={value}
              aria-describedby="confirmation-helper"
              onChange={onChange}
            />
            {errors.confirmation && <FormHelperText id="confirmation-helper" >{errors.confirmation.message}</FormHelperText>}
          </FormControl>
        )}
        name="confirmation"
      />
      <MyLoadingButton 
        type="submit"
        loading={isSubmitting}
      >
        Créer
      </MyLoadingButton>
    </form>
  );
}