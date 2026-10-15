"use client";

import { User } from "@/lib/generated/prisma/client";
import React, { createContext, useContext } from "react";

export type CurrentUser = Pick<
  User,
  "id" | "email" | "username" | "avatarUrl" | "createdAt"
>;

const UserContext = createContext<CurrentUser | null>(null);

export function UserProvider({
  user,
  children,
}: {
  user: CurrentUser;
  children: React.ReactNode;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  const user = useContext(UserContext);
  if (!user) {
    throw new Error("useUser should be used inside a <UserProvider>");
  }

  return user;
}
