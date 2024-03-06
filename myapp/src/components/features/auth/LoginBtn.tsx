"use client";

import { Button, Link } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import { useWindowSize } from "@/Utils/customHook/useWindowSize";

export const LoginBtn = () => {

  const windowWidth = useWindowSize();

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
      {(windowWidth && windowWidth >= 600) ? 'Connexion' : <LoginIcon fontSize="small" />}
    </Button>)
}