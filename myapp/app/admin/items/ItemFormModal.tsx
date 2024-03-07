"use client";

import * as React from 'react';
import { useRouter } from "next/navigation";
import { Item } from "@prisma/client";

import { z } from 'zod';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

import toast from 'react-hot-toast';
import { Dialog, DialogTitle, MenuItem, Select, Slide, TextField } from "@mui/material";
import { TransitionProps } from '@mui/material/transitions';
import { MyLoadingButton } from '@/components/Theme/Custom/MyLoadingButton';

import { itemActionCreate, itemActionUpdate } from './items.action';
import { ItemFormSchema } from './item.schema';

export type ItemFormModalProps = {
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

type FormFields = z.infer<typeof ItemFormSchema>;

export const ItemFormModal = (props: ItemFormModalProps) => {

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm({
    defaultValues: {
      name: props.itemInfo ? props.itemInfo.name : "",
      unit: props.itemInfo ? props.itemInfo.unit : "",
      description: props.itemInfo ? props.itemInfo.description : "",
      rank: props.itemInfo ? props.itemInfo.rank : "",
      status: props.itemInfo ? props.itemInfo.status : "",
      order: props.itemInfo ? props.itemInfo.order : 0,
    },
    resolver: zodResolver(ItemFormSchema)
  })

  const onSubmit: SubmitHandler<FormFields> = async (datas) => {
    const { data, serverError } = props.itemId ?
      await itemActionUpdate({
        itemId: props.itemId,
        data: datas
      }) : 
      await itemActionCreate({
        data: datas
      });
    if (data) {
      toast.success(data.message);
      router.back();
      router.refresh();
    }

    if (serverError) {
      toast.error(serverError);
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
        {props.itemId ? "Modifier un item" : "Créer un item"}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)} className='p-2'>
        <Controller
          control={control}
          render={({ field: { onChange, value }}) => (
            <TextField
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
          render={({ field: { onChange, value }}) => (
            <TextField
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
          render={({ field: { onChange, value }}) => (
            <TextField
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
          render={({ field: { onChange, value }}) => (
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
          render={({ field: { onChange, value }}) => (
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
          render={({ field: { onChange, value }}) => (
            <TextField
              id="order"
              label="Ordre de l'item"
              value={value}
              onChange={(event) => event.target.value ? onChange(parseInt(event.target.value)) : onChange(0)}
              type="number"
            />
          )}
          name="order"
        />
        <MyLoadingButton type='submit' loading={isSubmitting}>{props.itemId ? "Modifier" : "Créer"}</MyLoadingButton>
      </form>
    </Dialog>
  )
}

