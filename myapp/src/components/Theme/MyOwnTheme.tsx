import { createTheme } from "@mui/material";
import { Kanit } from "next/font/google";

// Personnalisation du thème
// Utilisation de la font Kanit et réglage des couleurs de base

const kanit = Kanit({
  weight: ["400", "600", "800"],
  style: ["normal"],
  subsets: ["latin"]
})

export const MyOwnTheme = createTheme({
  typography: {
    allVariants: {
      fontFamily: kanit.style.fontFamily,
    }
  },
  palette: {
    primary: {
      light: '#448d96',
      main: '#356069',
      dark: '#2d444c',
      contrastText: '#fff',
    },
    secondary: {
      light: '#f49d0c',
      main: '#bc560a',
      dark: '#78340f',
      contrastText: '#000',
    },
  },
  components: {
    
  },
});

// Réglage pour titre h1 responsive pour titre du site

MyOwnTheme.typography.h1 = {
  fontFamily: kanit.style.fontFamily,
  fontSize: '1.7rem',
  fontWeight: '600',
  '@media (min-width:600px)': {
    fontSize: '2rem',
    fontWeight: '900',
  },
  [MyOwnTheme.breakpoints.up('md')]: {
    fontSize: '2.6rem',
  },
}