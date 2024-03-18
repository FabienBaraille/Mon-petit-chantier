"use client";

import { z } from "zod";
import { GroupInfoData } from "./page";
import { GroupFormSchema } from "./group.schema";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { groupActionCreate, groupActionUpdate } from "./group.action";
import toast from "react-hot-toast";
import { Dialog, DialogTitle, TextField } from "@mui/material";
import { Transition } from "@/components/features/modal/transition";
import { MyLoadingButton } from "@/components/Theme/Custom/MyLoadingButton";

export type GroupFormModalProps = {
  groupId: string | null,
  groupInfos: GroupInfoData | null
};

type FormFields = z.infer<typeof GroupFormSchema>;

export const GroupFormModal = (props: GroupFormModalProps) => {

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm({
    defaultValues: {
      title: props.groupInfos ? props.groupInfos.title : "",
      infos: props.groupInfos ? props.groupInfos.infos : null,
      rank: props.groupInfos ? props.groupInfos.rank : 0
    },
    resolver: zodResolver(GroupFormSchema)
  })

  const onSubmit: SubmitHandler<FormFields> = async (datas) => {
    const { data, serverError } = props.groupId ? 
    await groupActionUpdate({
      groupId: props.groupId,
      data: datas
    }) :
    await groupActionCreate({
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
        {props.groupId ? "Modifier le groupe" : "Créer le groupe"}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)} className="p-2">
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <TextField
              id="title"
              label="Titre"
              value={value}
              onChange={onChange}
            />
          )}
          name="title"
        />
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <TextField
              id="infos"
              label="Informations"
              value={value}
              onChange={onChange}
              multiline
              minRows={4}
            />
          )}
          name="infos"
        />
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <TextField
              id="rank"
              label="Rang"
              value={value}
              onChange={(event) => (!event.target.value || parseInt(event.target.value) < 0 ) ? onChange(0) : onChange(parseInt(event.target.value))}
              type="number"
            />
          )}
          name="rank"
        />
        <MyLoadingButton type="submit" loading={isSubmitting}>
          {props.groupId ? "Modifier" : "Créer"}
        </MyLoadingButton>
      </form>
    </Dialog>
    
  )
}