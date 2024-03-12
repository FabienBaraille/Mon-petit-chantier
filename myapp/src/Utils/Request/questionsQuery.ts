"use server";

import { prisma } from "@/lib/prisma";

export const getAllQuestions = async (userRole: string | undefined) => {
  if (userRole && userRole === "ADMIN") {
    return await prisma.question.findMany();
  } else {
    return null;
  }
}

export const getSortedQuestion = async (userRole: string | undefined, order: {[key: string]: string} | undefined, limit: number, page: number) => {
  if (userRole && userRole === "ADMIN") {
    return await prisma.question.findMany({
      skip: (page*limit),
      take: limit,
      orderBy: order
    });
  } else {
    return null;
  }
}

export const getQuestionPartialTitle = async (userRole: string | undefined, partialTitle: string) => {
  if (userRole && userRole === "ADMIN") {
    return await prisma.question.findMany({
      where: {
        title: partialTitle
      }
    });
  } else {
    return null;
  }
}

export const getQuestionById = async (userRole: string | undefined, id: string) => {
  if (userRole && userRole === "ADMIN") {
    return await prisma.question.findUnique({
      where: {
        id: id
      },
      select: {
        id: true,
        title: true,
        infos: true,
        // Select all linked items
        items: {
          select: {
            id: true,
            item: {
              // Only getting id and name of the linked items
              select: {
                id: true,
                name: true
              }
            }
          }
        },
        // Select all groups related
        groups: {
          select: {
            id: true,
            group: {
              // Only getting id and title of the related groups
              select: {
                id: true,
                title: true
              }
            }
          }
        }
      }
    });
  } else {
    return null;
  }
}