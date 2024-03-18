"use server";

import { prisma } from "@/lib/prisma";
import { adminQuery } from "./checkQuery";

const groupsData = {
  id: true,
  title: true,
  rank: true,
  _count: {
    select: {
      questions: true
    }
  }
}

export const getSortedGroups = async (order: {[key: string]: string} | undefined, limit: number, page: number) => {
  const isAutorized = await adminQuery();
  if (isAutorized) {
    return prisma.group.findMany({
      skip: (page*limit),
      take: limit,
      orderBy: order,
      select: groupsData
    })
  } else {
    throw new Error("Vous devez être identifié et administrateur");
  }
}

export const getGroupsPartialTitle = async (partialTitle: string) => {
  const isAutorized = await adminQuery();
  if (isAutorized) {
    return prisma.group.findMany({
      where: {
        title: {
          contains: partialTitle
        }
      },
      select: groupsData
    })
  } else {
    throw new Error("Vous devez être identifié et administrateur");
  }
}

export const getGroupById = async (id: string) => {
  const isAutorized = await adminQuery();
  if (isAutorized) {
    return prisma.group.findUnique({
      where: {
        id: id
      },
      select: {
        id: true,
        title: true,
        infos: true,
        rank: true,
        questions: {
          select: {
            id: true,
            question: {
              select: {
                id: true,
                title: true
              }
            }
          }
        }
      }
    })
  } else {
    throw new Error("Vous devez être identifié et administrateur");
  }
}