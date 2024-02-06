"use client";

import { Button, Link } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';

export const LoginBtn = () => {

  // On regarde la taille de l'écran pour modifier le contenu du bouton de connexion
  const windowWidth = window.innerWidth;
  
  return (
    <Button
      LinkComponent={Link}
      href="/account/login"
      sx={{
        backgroundColor: '#DDEFF0',
        color: '#356069',
        border: 'solid 1px #356069',
        boxShadow: '3px 3px 10px -3px #5fa9b1',
        padding: "0.25rem 0.5rem",
        borderRadius: "1.2rem",
        '&:hover': {
          backgroundColor: '#356069',
          color: '#DDEFF0'
        }
      }}
    >
      {windowWidth >= 600 ? 'Connexion' : <LoginIcon fontSize="small" />}
    </Button>)
}