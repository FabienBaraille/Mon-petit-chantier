"use server";

import { z } from "zod";
import { QuestionFormSchema } from "./question.schema";
import { adminAction } from "@/lib/safe-action";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const QuestionActionCreateProps = z.object({
  data: QuestionFormSchema
});

export const questionActionCreate = adminAction(
  QuestionActionCreateProps,
  async ({data}) => {
    const question = await prisma.question.create({
      data: data
    })
    revalidatePath("/admin/questions");
    return {
      message: 'Question créée avec succès',
      data: question
    }
  }
)

const QuestionActionUpdateProps = z.object({
  questionId: z.string().cuid(),
  data: QuestionFormSchema
})

export const questionActionUpdate = adminAction(
  QuestionActionUpdateProps,
  async ({questionId, data}) => {
    const question = await prisma.question.update({
      where: {
        id: questionId
      },
      data: data
    });
    revalidatePath("/admin/questions");
    return {
      message: "Question mise à jour avec succès",
      data: question
    }
  }
)