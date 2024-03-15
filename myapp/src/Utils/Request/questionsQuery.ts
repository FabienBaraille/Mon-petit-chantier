"use server";

import { prisma } from "@/lib/prisma";
import { adminQuery } from "./checkQuery";

export const getAllQuestions = async () => {
  const isAutorized = await adminQuery();
  if (isAutorized) {
    return await prisma.question.findMany();
  } else {
    throw new Error("Vous devez être identifié et administrateur");
  }
}

export const getSortedQuestion = async (order: {[key: string]: string} | undefined, limit: number, page: number) => {
  const isAutorized = await adminQuery();
  if (isAutorized) {
    return await prisma.question.findMany({
      skip: (page*limit),
      take: limit,
      orderBy: order
    });
  } else {
    throw new Error("Vous devez être identifié et administrateur");
  }
}

export const getQuestionPartialTitle = async (partialTitle: string) => {
  const isAutorized = await adminQuery();
  if (isAutorized) {
    return await prisma.question.findMany({
      where: {
        title: {
          contains: partialTitle
        }
      }
    });
  } else {
    throw new Error("Vous devez être identifié et administrateur");
  }
}

export const getQuestionById = async (id: string) => {
  const isAutorized = await adminQuery();
  if (isAutorized) {
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
    throw new Error("Vous devez être identifié et administrateur");
  }
}