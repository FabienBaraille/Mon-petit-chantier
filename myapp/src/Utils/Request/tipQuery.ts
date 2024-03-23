"use server";

import { prisma } from "@/lib/prisma";
import { adminQuery } from "./checkQuery";

export const getSortedTips = async (order: {[key: string]: string} | undefined, limit: number, page: number) => {
  const isAutorized = await adminQuery();
  if (isAutorized) {
    return prisma.tip.findMany({
      skip: (page*limit),
      take: limit,
      orderBy: order
    })
  } else {
    throw new Error("Vous devez être identifié et administrateur");
  }
}

export const getTipsPartialTitle = async (partialTitle: string) => {
  const isAutorized = await adminQuery();
  if (isAutorized) {
    return prisma.tip.findMany({
      where: {
        title: {
          contains: partialTitle
        }
      }
    })
  } else {
    throw new Error("Vous devez être identifié et administrateur");
  }
}

export const getTipById = async (id: string) => {
  const isAutorized = await adminQuery();
  if (isAutorized) {
    return prisma.tip.findUnique({
      where: {
        id: id
      }
    })
  } else {
    throw new Error("Vous devez être identifié et administrateur");
  }
}