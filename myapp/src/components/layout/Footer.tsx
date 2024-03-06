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
      <Typography variant="caption" color="#4F4F4F" >
        {SiteConfig.title} &copy; {new Date().getFullYear()} FabienB
      </Typography>
      <Link 
        underline="hover"
        variant="caption"
        color="#4F4F4F"
        href="/legal/CGU"
      >
        C.G.U.
      </Link>
    </footer>
  )
}