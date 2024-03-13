"use client";

import * as React from 'react';
import { useRouter } from "next/navigation";

import { z } from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { Dialog, DialogTitle, TextField } from "@mui/material";

import { QuestionInfoData } from "./page";
import { QuestionFormSchema } from "./question.schema";
import { questionActionCreate, questionActionUpdate } from "./question.action";

import { Transition } from '@/components/features/modal/transition';
import { MyLoadingButton } from "@/components/Theme/Custom/MyLoadingButton";

export type QuestionFormModalProps = {
  questionId: string | null,
  questionInfos: QuestionInfoData | null
};

type FormFields = z.infer<typeof QuestionFormSchema>;

export const QuestionFormModal = (props: QuestionFormModalProps) => {

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm({
    defaultValues: {
      title: props.questionInfos ? props.questionInfos.title : "",
      infos: props.questionInfos ? props.questionInfos.infos : ""
    },
    resolver: zodResolver(QuestionFormSchema)
  })

  const onSubmit: SubmitHandler<FormFields> = async (datas) => {
    const { data, serverError } = props.questionId ?
      await questionActionUpdate({
        questionId: props.questionId,
        data: datas
      }) :
      await questionActionCreate({
        data: datas
      })

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
        {props.questionId ? "Modifier la question" : "Créer une question"}
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
        <MyLoadingButton type="submit" loading={isSubmitting}>
          {props.questionId ? "Modifier" : "Créer"}
        </MyLoadingButton>
      </form>
    </Dialog>
  )
}