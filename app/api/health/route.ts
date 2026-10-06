import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"

export async function GET() {
    const users = await prisma.user.count();
    return NextResponse.json({ok: true, users});
}