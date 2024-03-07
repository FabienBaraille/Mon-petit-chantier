import { createSafeActionClient } from "next-safe-action";
import { getAuthSession } from "./auth";

export class ServerError extends Error {};

export const safeAction = createSafeActionClient();

export const adminAction = createSafeActionClient({
  handleReturnedServerError: (error) => {
    if (error instanceof ServerError) {
      return {
        serverError: error.message
      }
    }
    return {
      serverError: "Une erreur inattendue s'est produite."
    }
  },
  middleware: async () => {
    const session = await getAuthSession();
    if (!session) {
      throw new ServerError("Vous devez être connecté.")
    }
    if (session.user.role !== "ADMIN") {
      throw new ServerError("Vous devez être administrateur.")
    }
    return session.user.id;
  }
})