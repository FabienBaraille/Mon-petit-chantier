"use server";

import { z } from "zod";
import { TipFormSchema } from "./tip.schema";
import { adminAction } from "@/lib/safe-action";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const TipCreateProps = z.object({
  data: TipFormSchema
})

export const tipActionCreate = adminAction(
  TipCreateProps,
  async ({data}) => {
    const tip = await prisma.tip.create({
      data: data
    });
    revalidatePath("/admin/tips");
    return {
      message: 'Astuce créée avec succès',
      data: tip
    }
  }
)

const TipUpdateProps = z.object({
  tipId: z.string().cuid(),
  data: TipFormSchema
})

export const TipActionUpdate = adminAction(
  TipUpdateProps,
  async ({tipId, data}) => {
    const tip = await prisma.tip.update({
      where: {
        id: tipId
      },
      data: data
    });
    revalidatePath("/admin/tips");
    return {
      message: 'Astuce mise à jour avec succès',
      data: tip
    }
  }
)