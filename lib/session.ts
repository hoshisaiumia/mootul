import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const key = new TextEncoder().encode(process.env.SESSION_SECRET);

export async function createSession(userId: string) {
  console.log("SECRET length:", process.env.SESSION_SECRET?.length);
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(key);

  (await cookies()).set("session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getSession() {
  const token = (await cookies()).get("session")?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, key);
    return payload as { userId: string };
  } catch {
    return null;
  }
}

export async function deleteSession() {
  (await cookies()).delete("session");
}
