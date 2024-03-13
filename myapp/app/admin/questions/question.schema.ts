import { z } from "zod";

export const QuestionFormSchema = z.object({
  title: z.string().min(3).max(50),
  infos: z.string().nullable()
})