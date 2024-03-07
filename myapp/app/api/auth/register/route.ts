import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';

import { getUserFromDb } from "@/Utils/Request/usersQuery";
import { SignUpSchema } from "@/components/features/auth/auth.schema";

// API route for User and Account creation

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const checking = SignUpSchema.safeParse(body);

    if (checking.success) {
      const { username, email, password } = body;
      const userExist = await getUserFromDb(username, email);

      if (userExist.length > 0) {
        return NextResponse.json(null, {status: 500, statusText: "Utilisateur déjà existant, veuillez changer de Pseudo et/ou d'email."});
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
          return NextResponse.json(null, {status: 200, statusText: "Compte crée avec succès, vous pouvez vous connecter."});
        } catch (error) {
          return NextResponse.json(null, {status: 500, statusText: "Impossible d'associer le compte, veuillez réessayer."});
        }
      } catch (error) {
        return NextResponse.json(null, {status: 500, statusText: "Une erreur s'est produite, veuillez réessayer."});
      }
    }
    const serverErrors = Object.fromEntries(
      checking.error?.issues?.map((issue) => [issue.path[0], issue.message]) || []
    );
    return NextResponse.json({ errors: serverErrors });
  } catch (error) {
    return NextResponse.json(null, { status: 500, statusText: "Une erreur s'est produite, veuillez réessayer" })
  }
}