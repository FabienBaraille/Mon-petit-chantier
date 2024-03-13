"use server";

import { prisma } from "@/lib/prisma";

const itemData = {
  id: true,
  name: true,
  rank: true,
  unit: true,
  status: true
}

export const getAllItems = async (userRole: string | undefined) => {
  if (userRole && userRole === 'ADMIN') {
    return await prisma.item.findMany({
      select: itemData
    })
  } else {
    return null
  }
}

export const getSortedItems = async (userRole: string | undefined, order: {[key: string]: string} | undefined, limit: number, page: number) => {
  if (userRole && userRole === "ADMIN") {
    return await prisma.item.findMany({
      skip: (page*limit),
      take: limit,
      select: itemData,
      orderBy: order
    })
  } else {
    return null;
  }
}

export const getItemsPartialName = async (userRole: string | undefined, partialName: string) => {
  if (userRole && userRole === "ADMIN") {
    return await prisma.item.findMany({
      where: {
        name: {
          contains: partialName
        }
      },
      select: itemData
    })
  } else {
    return null;
  }
}

export const getItemById = async (userRole: string | undefined, id: string) => {
  if (userRole && userRole === 'ADMIN') {
    return await prisma.item.findUnique({
      where: {
        id: id
      }
    })
  } else {
    return null
  }
}
