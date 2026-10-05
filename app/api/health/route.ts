import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"

export async function GET() {
    const {rows} = await pool.query("SELECT NOW() as agora");
    return NextResponse.json({ok: true, now: rows[0].agora})
}