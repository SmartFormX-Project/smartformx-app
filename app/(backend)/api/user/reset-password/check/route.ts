import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prisma";
import { compare } from "bcrypt";

export async function GET(req: NextRequest) {

  const url = new URL(req.url)
  const params = url.searchParams;

  const token = params.get("wtk");
  const uid = params.get("ud");

  const user = await prisma.user.findUnique({ where: { id: uid! } });

  if (!user) return NextResponse.json("user not found", { status: 404 });

  const isValid = await compare(token!, user.tempToken!);

  if (!isValid) return NextResponse.json({ valid: false }, { status: 403 });

  return NextResponse.json({ valid: true }, { status: 200 });
}
