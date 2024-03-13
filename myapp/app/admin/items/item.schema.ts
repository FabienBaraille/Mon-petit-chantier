import { z } from "zod";

export const ItemRank = ['CATEGORY', 'PRODUCT', 'BY_PRODUCT'] as const;
export const ItemStatus = ['ENABLED', 'DISABLED'] as const;

export const ItemFormSchema = z.object({
  name: z.string().min(3).max(50),
  unit: z.string().min(1).max(10).nullable(),
  description: z.string().min(1).nullable(),
  rank: z.enum(ItemRank),
  status: z.enum(ItemStatus),
  order: z.number().nonnegative().lte(10).nullable()
})