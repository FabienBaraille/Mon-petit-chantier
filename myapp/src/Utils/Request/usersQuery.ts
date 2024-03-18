"use server";

import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import { adminQuery } from "./checkQuery";

const userData = {
  id: true,
  name: true,
  username: true,
  email: true,
  role: true,
  status: true
};

export const getAuthUser = async (name: string) => {

  const userList: User[] = await prisma.$queryRaw`
    SELECT "u".* FROM "Account" as a
    INNER JOIN "User" as u
    ON "a"."userId" = "u"."id"
    WHERE "u"."name" = ${name}
  `
  return userList[0] || null
};

export const getUserByMail = async (partialEmail: string) => {
  const isAutorized = await adminQuery();
  if (isAutorized) {
    return prisma.user.findMany({
      where: {
        email: {
          contains: partialEmail
        }
      },
      select: userData
    })
  } else {
    throw new Error("Vous devez être identifié et administrateur");
  }
};

export const getUserFromDb = async (username: string, email: string) => {
  return prisma.user.findMany({
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
};

export const getSortedUsers = async (order: {[key: string]: string} | undefined, limit: number, page: number) => {
  const isAutorized = await adminQuery();
  if (isAutorized) {
    return prisma.user.findMany({
      skip: ((page)*limit),
      take: limit,
      select: userData,
      orderBy: order
    })
  } else {
    throw new Error("Vous devez être identifié et administrateur");
  }
};

export const getAllUsers = async () => {
  const isAutorized = await adminQuery();
  if (isAutorized) {
    return prisma.user.findMany({
      select: userData
    })
  } else {
    throw new Error("Vous devez être identifié et administrateur");
  }
};
