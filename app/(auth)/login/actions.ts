"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";

export async function login(_prev: unknown, formData: FormData) {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const user = await prisma.user.findUnique({ where: { username } });
  const ok = user && (await bcrypt.compare(password, user.passwordHash));

  if (!ok) return { error: "Invalid credentials" };

  await createSession(user.id);
  const raw = String(formData.get("callbackUrl") ?? "/");
  const safe = raw.startsWith("/") && !raw.startsWith("//") ? raw : "/";
  redirect(safe);
}
