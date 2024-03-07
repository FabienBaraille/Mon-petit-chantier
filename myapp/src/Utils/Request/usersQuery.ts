"use server";

import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import bcrypt from 'bcrypt';

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

export const getUserByMail = async (userRole: string | undefined, partialEmail: string) => {
  if (userRole && userRole === "ADMIN") {
    return await prisma.user.findMany({
      where: {
        email: {
          contains: partialEmail
        }
      },
      select: userData
    })
  } else {
    return null
  }
};

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
};

export const getSortedUsers = async (userRole: string | undefined, order: {[key: string]: string} | undefined, limit: number, page: number) => {
  if (userRole && userRole === "ADMIN") {
    return await prisma.user.findMany({
      skip: ((page)*limit),
      take: limit,
      select: userData,
      orderBy: order
    })
  } else {
    return null
  }
};

export const getAllUsers = async (userRole: string | undefined) => {
  if (userRole && userRole === "ADMIN") {
    const usersList = await prisma.user.findMany({
      select: userData
    })
    return usersList
  } else {
    return null
  }
};
