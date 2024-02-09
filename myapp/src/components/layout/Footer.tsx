import { SiteConfig } from "@/lib/site-config";
import { Link, Typography } from "@mui/material";

export type FooterProps = {

};

export const Footer = (props: FooterProps) => {
  return (
    <footer>
      <Link 
        underline="hover"
        variant="caption"
        color="#4F4F4F"
        href="/legal/privacy"
      >
        Infos Légales
      </Link>
      <Link 
        underline="hover"
        variant="caption"
        color="#4F4F4F"
        href="/legal/CGU"
      >
        C.G.U.
      </Link>
      <Typography variant="caption" color="#4F4F4F" >
        {SiteConfig.title} &copy; {new Date().getFullYear()} FabienB
      </Typography>
    </footer>
  )
}