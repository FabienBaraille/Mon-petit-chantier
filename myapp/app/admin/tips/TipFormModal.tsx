"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

import toast from "react-hot-toast";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { Dialog, DialogTitle, MenuItem, Select, TextField } from "@mui/material";

import { GroupData } from "../groups/page";
import { ItemData } from "../items/page";
import { QuestionData } from "../questions/page";
import { TipData } from "./page";
import { TipFormInitSchema } from "./tip.schema";
import { TipActionUpdate, tipActionCreate } from "./tip.action";

import { Transition } from "@/components/features/modal/transition";
import { MyLoadingButton } from "@/components/Theme/Custom/MyLoadingButton";

import { getAllGroups } from "@/Utils/Request/groupsQuery";
import { getAllItems } from "@/Utils/Request/itemsQuery";
import { getAllQuestions } from "@/Utils/Request/questionsQuery";

export type TipFormModalProps = {
  tipId: string | null,
  tipInfos: TipData | null,
  referenceType: string | null,
  referenceId: string | null,
  referenceList: ItemData[] | GroupData[] | QuestionData[],
};

type FormFields = z.infer<typeof TipFormInitSchema>;

export const TipFormModal = (props: TipFormModalProps) => {

  const router = useRouter();

  const [typeReference, setTypeReference] = useState<string>(props.referenceType ? props.referenceType : "itemId");
  const [referenceList, setReferenceList] = useState<ItemData[] | GroupData[] | QuestionData[]>(props.referenceList);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm({
    defaultValues: {
      title: props.tipInfos ? props.tipInfos.title : "",
      description: props.tipInfos ? props.tipInfos.description : null,
      link: props.tipInfos ? props.tipInfos.link : null,
      referenceId: props.referenceId ? props.referenceId : null,
    }
  })

  const onSubmit: SubmitHandler<FormFields> = async (datas) => {
    const modifiedDatas = {
      title: datas.title,
      description: datas.description,
      link: datas.link,
      itemId: typeReference === "itemId" ? datas.referenceId : null,
      groupId: typeReference === "groupId" ? datas.referenceId : null,
      questionId: typeReference === "questionId" ? datas.referenceId : null,
    }
    const { data, serverError } = props.tipId ?
    await TipActionUpdate({
      tipId: props.tipId,
      data: modifiedDatas
    }) :
    await tipActionCreate({
      data: modifiedDatas
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
  const handleChangeType = async (ref: string) => {
    setTypeReference(ref);
    let newReferenceList = null;
    if (ref === "groupId") {
      newReferenceList = await getAllGroups();
    }
    if (ref === "itemId") {
      newReferenceList = await getAllItems();
    }
    if (ref === "questionId") {
      newReferenceList = await getAllQuestions();
    }
    if (newReferenceList) {
      setReferenceList(newReferenceList);
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
        {props.tipId ? "Modifier l'astuce" : "Créer une astuce"}
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
          render={({field: {onChange, value}}) => (
            <TextField
              id="link"
              label="Lien utile"
              value={value}
              onChange={onChange}
            />
          )}
          name="link"
        />
        <Select
          id="reftype"
          label="Référence"
          value={typeReference}
          onChange={(event) => handleChangeType(event.target.value)}
        >
          <MenuItem value="itemId">Item</MenuItem>
          <MenuItem value="groupId">Groupe</MenuItem>
          <MenuItem value="questionId">Question</MenuItem>
        </Select>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <Select
              id="referenceId"
              label="Elément de référence"
              value={value}
              onChange={onChange}
            >
              {referenceList.map((reference, index) => <MenuItem key={`${typeReference}${index}`} value={reference.id} >{reference.name ? reference.name : reference.title}</MenuItem>)}
            </Select>
          )}
          name="referenceId"
        />
        <MyLoadingButton type="submit" loading={isSubmitting}>
          {props.tipId ? "Modifier" : "Créer"}
        </MyLoadingButton>
      </form>
    </Dialog>
  )
}