"use client";
import * as React from 'react';
import { MyAppBtn } from "@/components/Theme/Custom/MyAppBtn";
import { Dialog, DialogTitle, MenuItem, Select, Slide, TextField } from "@mui/material";
import { Item } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Controller, useForm } from "react-hook-form";
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from "next/navigation";
import { TransitionProps } from '@mui/material/transitions';

export type ItemModalProps = {
  isEdit: boolean,
  itemId: string | null,
  itemInfo: Item | null
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ItemModal = (props: ItemModalProps) => {

  const session = useSession();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: props.itemInfo ? props.itemInfo.name : "",
      unit: props.itemInfo ? props.itemInfo.unit : "",
      description: props.itemInfo ? props.itemInfo.description : "",
      rank: props.itemInfo ? props.itemInfo.rank : "",
      status: props.itemInfo ? props.itemInfo.status : "",
      order: props.itemInfo ? props.itemInfo.order : "",
    }
  })

  const onSubmit = async (data: {
    name: string,
    unit: string | null,
    description: string | null,
    rank: string,
    status: string,
    order: string | number | null
  }) => {
    if (props.isEdit) {
      console.log("edit");
    } else {
      console.log("create");
    }
  }

  return (
    <Dialog 
      onClose={router.back}
      open
      TransitionComponent={Transition}
      keepMounted
      fullWidth
    >
      <DialogTitle sx={{p:2}}>
        {props.isEdit ? "Modifier un item" : "Créer un item"}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)} action="POST" className='p-2'>
        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, value}}) => (
            <TextField
              required
              id="name"
              label="Nom de l'item"
              value={value}
              onChange={onChange}
            />
          )}
          name="name"
        />
        <Controller
          control={control}
          render={({ field: { onChange, value}}) => (
            <TextField
              required
              id="unit"
              label="Unité"
              value={value}
              onChange={onChange}
            />
          )}
          name="unit"
        />
        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, value}}) => (
            <TextField
              required
              id="description"
              label="Description"
              value={value}
              onChange={onChange}
              multiline
              minRows={4}
            />
          )}
          name="description"
        />
        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, value}}) => (
            <Select
              id="rank"
              label="Rang"
              value={value}
              onChange={onChange}
            >
              <MenuItem value="CATEGORY">Catégory</MenuItem>
              <MenuItem value="PRODUCT">Produit</MenuItem>
              <MenuItem value="BY_PRODUCT">Par produit</MenuItem>
            </Select>
          )}
          name="rank"
        />
        <Controller
          control={control}
          render={({ field: { onChange, value}}) => (
            <Select
              id="status"
              label="Statut"
              value={value}
              onChange={onChange}
            >
              <MenuItem value="UNABLED">Activé</MenuItem>
              <MenuItem value="DISABLED">Désactivé</MenuItem>
            </Select>
          )}
          name="status"
        />
        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, value}}) => (
            <TextField
              required
              id="order"
              label="Ordre de l'item"
              value={value}
              onChange={onChange}
              type="number"
            />
          )}
          name="order"
        />
        <MyAppBtn type="submit">{props.isEdit ? "Modifier" : "Créer"}</MyAppBtn>
      </form>
    </Dialog>
  )
}

