import { Button, ButtonProps, styled } from "@mui/material";

// Style des boutons utilisés dans l'application
// Dès qu'il y a un bouton à mettre en place, il faudra utiliser ce composant custom

export const MyAppBtn = styled(Button)<ButtonProps>(({ theme }) => ({
  backgroundColor: '#DDEFF0',
  color: '#356069',
  border: 'solid 1px #356069',
  boxShadow: '3px 3px 10px -3px #5fa9b1',
  padding: "0.5rem 1rem",
  borderRadius: "1.5rem",
  '&:hover': {
    backgroundColor: '#356069',
    color: '#DDEFF0'
  }
}))