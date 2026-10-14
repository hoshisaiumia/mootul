import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { getSession } from "./session";

export const getCurrentUser = cache(async () => {
  const session = await getSession();
  if (!session) return null;

  return prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, username: true, email: true },
  });
});
