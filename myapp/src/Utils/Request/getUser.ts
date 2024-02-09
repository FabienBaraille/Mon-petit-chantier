"use server";

import { prisma } from "@/lib/prisma";

export const getUserFromDb = async (username: string, email: string) => {
  return await prisma.user.findMany({
    where: {
      OR: [
        {
          username: username
        },
        {
          email: email
        },
      ]
    }
  })
}