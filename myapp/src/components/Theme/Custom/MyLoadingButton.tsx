import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton";
import { styled } from "@mui/material";

// Style custom pour les boutons avec état de chargement

export const MyLoadingButton = styled(LoadingButton)<LoadingButtonProps>(({ theme }) => ({
  backgroundColor: '#DDEFF0',
  color: '#356069',
  border: 'solid 1px #356069',
  boxShadow: '3px 3px 10px -3px #5fa9b1',
  padding: "0.5rem 1rem",
  borderRadius: "1.5rem",
  width: "100%",
  '&:hover': {
    backgroundColor: '#356069',
    color: '#DDEFF0'
  }

}))