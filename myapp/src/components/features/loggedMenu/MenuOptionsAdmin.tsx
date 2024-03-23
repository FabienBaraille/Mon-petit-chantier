import Link from "next/link";
import { MenuItem } from "@mui/material";

export type MenuOptionsAdminProps = {

};

export const MenuOptionsAdmin = (props: MenuOptionsAdminProps) => {
  return (
    <>
      <MenuItem component={Link} href="/admin" >Home</MenuItem>
      <MenuItem component={Link} href="/admin/users">Utilisateurs</MenuItem>
      <MenuItem component={Link} href="/admin/items">Items</MenuItem>
      <MenuItem component={Link} href="/admin/questions">Questions</MenuItem>
      <MenuItem component={Link} href="/admin/groups">Groupes</MenuItem>
      <MenuItem component={Link} href="/admin/tips">Astuces</MenuItem>
    </>
  )
}