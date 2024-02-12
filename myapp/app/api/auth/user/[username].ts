import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'GET') {
    res.status(403).json({message: 'GET Only'})
  }

  const { username } = req.query;

  const account = await prisma.$queryRaw`
    SELECT "u"."id", "u"."username", "u"."role", "u"."status", "u"."image", "u"."status" FROM "Account" as a
    INNER JOIN "User" as u
    ON "a"."userId" = "u"."id"
    WHERE "u"."username" = ${username}
  `

  res.json(account)
}