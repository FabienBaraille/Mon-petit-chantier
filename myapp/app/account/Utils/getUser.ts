"use server";

import { prisma } from "@/lib/prisma";

export const getUserFromDb = async ({
  username
}: {
  username: string | undefined
}) => {
  return await prisma.user.findUnique({
    where: {
      name: username
    }
  })
}