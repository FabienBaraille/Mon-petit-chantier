import { Link } from "@mui/material";
import { AuthElement } from "../features/auth/AuthElement";
import Image from "next/image";

export type HeaderProps = {};

export const Header = (props: HeaderProps) => {
  return (
    <header>
      <div className="img-container"><Image src="/images/logo.png" width={50} height={32} alt="app logo" /></div>
      <Link href='/' variant="h1">Mon petit Chantier</Link>
      <AuthElement />
    </header>
  )
}