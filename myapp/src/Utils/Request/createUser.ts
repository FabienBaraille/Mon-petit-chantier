import { prisma } from "@/lib/prisma";
import { getUserFromDb } from "./getUser";
import bcrypt from 'bcrypt';

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
    // return {message: 'Compte crée avec succès, vous pouvez maintenant vous connecter.', status: 200 };
  } catch (error) {
    return { message: "Une erreur s'est produite, veuillez réessayer.", status: 500 }
  }
}