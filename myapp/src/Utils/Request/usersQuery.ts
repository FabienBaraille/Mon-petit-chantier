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
}

export const getAuthUser = async (name: string) => {

  const userList: User[] = await prisma.$queryRaw`
    SELECT "u".* FROM "Account" as a
    INNER JOIN "User" as u
    ON "a"."userId" = "u"."id"
    WHERE "u"."name" = ${name}
  `
  return userList[0] || null
}

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

export const getSortedUsers = async (userRole: string | undefined, order: {[key: string]: string} | undefined, limit: number, page: number) => {
  if (userRole && userRole === "ADMIN") {
    const usersList = await prisma.user.findMany({
      skip: ((page)*limit),
      take: limit,
      select: userData,
      orderBy: order
    })
    const countUsers = await prisma.user.count({});
    return { usersList, totalUsers: countUsers }
  } else {
    return null
  }
}

export const getAllUsers = async (role: string | undefined) => {
  if (role && role === "ADMIN") {
    const usersList = await prisma.user.findMany({
      select: userData
    })
    return usersList
  } else {
    return null
  }
}

export const createUser = async ({
  username,
  email,
  password
}: {
  username: string,
  email: string,
  password: string | null
}) => {

  const userExist = await getUserFromDb(username, email);

  if (userExist.length > 0) {
    return { message: "Utilisateur déjà existant, veuillez changer de Pseudo et/ou d'email.", status: 500 }
  }

  const todayDate = new Date().toISOString();

  const salt = bcrypt.genSaltSync(10);

  const hashPassword = password ?  bcrypt.hashSync(password, salt) : null;

  const datas = {
    name: username,
    username,
    email,
    password: hashPassword,
    updatedAt: todayDate
  }
  try {
    const user = await prisma.user.create({
      data: datas
    })
    try {
      const account = await prisma.account.create({
        data: {
          userId: user.id,
          type: "credentials",
          provider: "credentials",
          providerAccountId: user.id,
        }
      })
      return {message: "Compte crée avec succès, vous pouvez vous connecter.", status: 200 };
    } catch (error) {
      return {message: "Impossible d'associer le compte, veuillez réessayer.", status: 500 }
    }
  } catch (error) {
    return { message: "Une erreur s'est produite, veuillez réessayer.", status: 500 }
  }
}