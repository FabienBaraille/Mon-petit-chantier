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
    </>
  )
}