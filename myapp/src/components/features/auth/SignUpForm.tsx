"use client";

import { useEffect, useState, ChangeEvent, MouseEvent } from "react";
import { Controller, useForm } from "react-hook-form";

import { Strength } from "./strength/Strength";

import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { MyAppBtn } from "@/components/Theme/Custom/MyAppBtn";
import { createUser } from "../../../Utils/Request/createUser";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

export type SignUpFormProps = {};

export const SignUpForm = (props: SignUpFormProps) => {

  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirmation, setConfirmation] = useState<string>('');
  const [comparison, setComparison] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');
  const [successMessage, setSuccessMessage] = useState<string | undefined>('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    setComparison(password !== confirmation)
  }, [password, confirmation])

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: ""
    },
  })
  const onSubmit = async (data: { 
    username: string; 
    email: string; 
    password: string;
  }) => {
    try {
      const response = await (
        await fetch("/api/auth/register", {
          body: JSON.stringify(data),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();

      if (response?.error) {
        setErrorMessage(response.error);
        setTimeout(() => {
          setErrorMessage('');
        }, 2000)
      }
      setSuccessMessage("Compte crée avec succès, vous pouvez vous connecter.");
      setTimeout(() => {
        setSuccessMessage('');
        signIn();
      }, 2000)
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

  if (successMessage !== '') {
    return <div>{successMessage}</div>
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} action="POST">
      <Controller
        control={control}
        rules={{
          required: true
        }}
        render={({ field: { onChange, value } }) => (
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
          required: true,
          pattern: /^\S+@\S+$/i
        }}
        render={({ field: { onChange, value } }) => (
          <TextField
            required
            type="email"
            id="email"
            label="Email"
            value={value}
            onChange={onChange}
          />
        )}
        name="email"
      />
      <Controller
        control={control}
        rules={{
          required: true, 
          pattern: /^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{12,}$/i
        }}
        render={({ field }) => (
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
              value={field.value}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setPassword(event.target.value);
                field.onChange(event.target.value);
              }}
              aria-describedby="password-helper"
            />
            {errors.password != undefined && 
              <>
                <FormHelperText id="password-helper" >Le mot de passe doit contenir 12 caractères,</FormHelperText>
                <FormHelperText id="password-helper" >1 majuscule, 1 minuscule et 1 caractère spéciale.</FormHelperText>
              </>
            }
          </FormControl>
        )}
        name="password"
      />
      {password != '' && <Strength password={password} />}
      <FormControl 
        required 
        error={comparison}
      >
        <InputLabel htmlFor="confirmation">Confirmation</InputLabel>
        <OutlinedInput
          id="confirmation"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                className="icon-btn"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Confirmation"
          value={confirmation}
          aria-describedby="confirmation-helper"
          onChange={(event: ChangeEvent<HTMLInputElement>) => setConfirmation(event.target.value)}
        />
        {comparison && <FormHelperText id="confirmation-helper" >Les mots de passe doivent être identiques.</FormHelperText>}
      </FormControl>
      <MyAppBtn 
        type="submit"
        disabled={comparison}
      >
        Créer
      </MyAppBtn>
    </form>
  );
}