import { z } from "zod";

export const GroupFormSchema = z.object({
  title: z.string().min(3).max(50),
  infos: z.string().min(1).nullable(),
  rank: z.number().int().nonnegative()
})