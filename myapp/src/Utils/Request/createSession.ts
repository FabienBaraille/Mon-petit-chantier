import { prisma } from "@/lib/prisma"

export const createSession = async({
  userId,
  sessionToken,
  expires
}: {
  userId: string,
  sessionToken: string,
  expires: Date
}) => {
  try {
    const session = prisma.session.create({
      data: {
        sessionToken,
        userId,
        expires
      }
    })
    return session
  } catch (error) {
    console.log(error);
  }
}