import { getAuthSession } from "@/lib/auth";

export const adminQuery = async (): Promise<boolean> => {
  const session = await getAuthSession();
  if (!session) {
    return false;
  }
  if (session.user.role !== "ADMIN") {
    return false;
  }
  return true;
}

export const userQuery = async (): Promise<boolean> => {
  const session = await getAuthSession();
  if (!session) {
    return false;
  }
  if (session.user.role !== "USER") {
    return false;
  }
  return true;
}