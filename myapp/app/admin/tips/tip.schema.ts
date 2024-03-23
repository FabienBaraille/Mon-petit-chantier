import { z } from "zod";

export const TipFormSchema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().min(1).nullable(),
  link: z.string().nullable(),
  groupId: z.string().cuid().nullable(),
  questionId: z.string().cuid().nullable(),
  itemId: z.string().cuid().nullable(),
})

export const TipFormInitSchema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().min(1).nullable(),
  link: z.string().nullable(),
  referenceId: z.string().cuid().nullable()
})