import { MenuItem, Divider } from "@mui/material";
import Link from "next/link";

export type MenuOptionsUserProps = {

};

export const MenuOptionsUser = (props: MenuOptionsUserProps) => {

  // Chercher tous les chantiers de l'utilisateur, pourquoi pas utiliser la props pour passer l'id de l'utilisateur
  return (
    <>
      {/* Boucle sur tous les chantiers trouvés si chantier */}
      <MenuItem component={Link} href="/user/project/1">Chantier 1</MenuItem>
      <Divider />
      <MenuItem component={Link} href="/user/project/create/" >Nouveau chantier</MenuItem>
    </>
  )
}