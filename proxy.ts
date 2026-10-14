import { jwtVerify } from "jose";
import { NextResponse, type NextRequest } from "next/server";

const SESSION_COOKIE = "session";
const LOGIN_PATH = "/login";
const PUBLIC_PATHS = ["/login", "/register", "/forgot-password"];
const ALWAYS_ALLOWED = ["/logout"];

if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET não está definido");
}
const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

const matches = (pathname: string, paths: string[]) =>
  paths.some((p) => pathname === p || pathname.startsWith(p + "/"));

async function isValidSession(token?: string) {
  if (!token) return false;
  try {
    await jwtVerify(token, secret, { algorithms: ["HS256"] });
    return true;
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (matches(pathname, ALWAYS_ALLOWED)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const isPublic = matches(pathname, PUBLIC_PATHS);
  const hasSession = await isValidSession(token);

  if (!hasSession && !isPublic) {
    const loginUrl = new URL(LOGIN_PATH, request.url);
    loginUrl.searchParams.set("callbackUrl", pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  if (hasSession && isPublic) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|ico)$).*)",
  ],
};
