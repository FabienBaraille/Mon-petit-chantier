"use server";

import { prisma } from "@/lib/prisma";
import { adminQuery } from "./checkQuery";

const itemData = {
  id: true,
  name: true,
  rank: true,
  unit: true,
  status: true
}

export const getAllItems = async () => {
  const isAutorized = await adminQuery();
  if (isAutorized) {
    return prisma.item.findMany({
      select: itemData
    })
  } else {
    throw new Error("Vous devez être identifié et administrateur");
  }
}

export const getSortedItems = async (order: {[key: string]: string} | undefined, limit: number, page: number) => {
  const isAutorized = await adminQuery();
  if (isAutorized) {
    return prisma.item.findMany({
      skip: (page*limit),
      take: limit,
      select: itemData,
      orderBy: order
    })
  } else {
    throw new Error("Vous devez être identifié et administrateur");
  }
}

export const getItemsPartialName = async (partialName: string) => {
  const isAutorized = await adminQuery();
  if (isAutorized) {
    return prisma.item.findMany({
      where: {
        name: {
          contains: partialName
        }
      },
      select: itemData
    })
  } else {
    throw new Error("Vous devez être identifié et administrateur");
  }
}

export const getItemById = async (id: string) => {
  const isAutorized = await adminQuery();
  if (isAutorized) {
    return prisma.item.findUnique({
      where: {
        id: id
      }
    })
  } else {
    throw new Error("Vous devez être identifié et administrateur");
  }
}
