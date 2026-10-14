"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma/client";
import { createSession } from "@/lib/session";

type RegisterState =
  | { error?: string; values?: { username: string; email: string } }
  | undefined;

export async function register(
  _prev: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const username = String(formData.get("username") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  const values = { username, email };

  if (username.length > 30) {
    return { error: "Username must have at most 30 characters", values };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Invalid email", values };
  }

  if (password.length < 8) {
    return { error: "Password must have at least 8 characters", values };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match", values };
  }

  const exists = await prisma.user.findFirst({
    where: { OR: [{ username }, { email }] },
    select: { username: true },
  });
  if (exists) {
    return { error: "Username or email already in use", values };
  }

  const passwordHash = await bcrypt.hash(password, 12);
  try {
    const user = await prisma.user.create({
      data: { username, email, passwordHash },
    });
    await createSession(user.id);
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2002"
    ) {
      return { error: "Username or email already in use", values };
    }

    throw e;
  }

  redirect("/chat");
}
