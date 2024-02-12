import { prisma } from "@/lib/prisma"
import { User } from "@prisma/client";

export const getAuthUser = async (name: string) => {

  const userList: User[] = await prisma.$queryRaw`
    SELECT "u".* FROM "Account" as a
    INNER JOIN "User" as u
    ON "a"."userId" = "u"."id"
    WHERE "u"."name" = ${name}
  `
  return userList[0] || null
}