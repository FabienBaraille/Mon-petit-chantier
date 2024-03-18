"use server";

import { z } from "zod";
import { GroupFormSchema } from "./group.schema";
import { adminAction } from "@/lib/safe-action";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const GroupCreateProps = z.object({
  data: GroupFormSchema
});

export const groupActionCreate = adminAction(
  GroupCreateProps,
  async ({data}) => {
    const group = await prisma.group.create({
      data: data
    });
    revalidatePath("/admin/groups");
    return {
      message: 'Groupe créée avec succès',
      data: group
    }
  }
);

const GroupUpdateProps = z.object({
  groupId: z.string().cuid(),
  data: GroupFormSchema
});

export const groupActionUpdate = adminAction(
  GroupUpdateProps,
  async ({groupId, data}) => {
    const group = await prisma.group.update({
      where: {
        id: groupId
      },
      data: data
    });
    revalidatePath("/admin/groups");
    return {
      message: "Groupe mis à jour avec succès",
      data: group
    }
  }
)