"use server";

import { adminAction } from "@/lib/safe-action";
import { z } from "zod";
import { ItemFormSchema } from "./item.schema";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const ItemActionCreateProps = z.object({
  data: ItemFormSchema
});

export const itemActionCreate = adminAction(
  ItemActionCreateProps,
  async ({data}) => {
    const item = await prisma.item.create({
      data: data
    })
    revalidatePath("/admin/items");
    return {
      message: 'Item crée avec succès.',
      data: item
    }
  }
)

const ItemActionUpdateProps = z.object({
  itemId: z.string().cuid(),
  data: ItemFormSchema
})

export const itemActionUpdate = adminAction(
  ItemActionUpdateProps,
  async ({itemId, data}) => {
    const item = await prisma.item.update({
      where: {
        id: itemId
      },
      data: data
    })
    revalidatePath("/admin/items");
    return {
      message: 'Item mis à jour avec succès.',
      data: item
    }
  }
)

