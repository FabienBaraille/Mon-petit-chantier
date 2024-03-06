"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

export type EditElmtButtonProps = {elmtId: string};

export const EditElmtButton = (props: EditElmtButtonProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const baseUrl = usePathname();

  const handleEdit = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('show', 'true');
    newSearchParams.set('itemid', props.elmtId);
    const url = `${baseUrl}?${newSearchParams.toString()}`;
    router.push(url);
  }

  return (
    <IconButton className="classic-button" onClick={handleEdit}>
      <EditIcon fontSize="small" />
    </IconButton>
  )
}