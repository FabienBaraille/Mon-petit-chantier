"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const createUser = async ({
  username,
  email,
  password
}: {
  username: string,
  email: string,
  password: string
}) => {

  const todayDate = new Date().toISOString();

  const bcrypt = require('bcryptjs');
  const salt = bcrypt.genSaltSync(10);

  const hashPassword = bcrypt.hashSync(password, salt);

  const datas = {
    name: username,
    email: email,
    password: hashPassword,
    updatedAt: todayDate
  }
  try {
    const user = await prisma.user.create({
      data: datas
    })
    return {
      error: false,
      message: 'Compte crée avec succès, vous pouvez maintenant vous connecter.',
      content: user
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          error: true,
          message: "Une erreur s'est produite.",
          content: error.meta?.target
        };
      }
    }
    console.log(error);
  }
}