"use client";

import { ChangeEvent, useState, MouseEvent } from "react";
import { Controller, useForm } from "react-hook-form";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { MyAppBtn } from "@/components/Theme/Custom/MyAppBtn";

export type LoginFormProps = {};

export const LoginForm = (props: LoginFormProps) => {

  const [showPassword, setShowPassword] = useState(false);

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
  const onSubmit = (data) => {
    console.log(data);
    // Pour le onSubmit, voir pour passer la méthode en props ? Ce qui permet de passer un server side component ?
  }

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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