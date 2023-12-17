import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prisma";
import { compare, hash } from "bcrypt";
import crypto from "crypto";

export async function POST(req: NextRequest, res: NextResponse) {
  const { email } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return NextResponse.json("user not found", { status: 404 });

  let resetToken = crypto.randomBytes(32).toString("hex");
  const _hash = await hash(resetToken, 10);
  //send _hash to database
  await prisma.user.update({ where: { email }, data: {} });
  //add api path
  let link = "confirm-email?wtk=" + resetToken + "&ud=" + user.id;

  return NextResponse.json(link, { status: 200 });
}
//aDICIONAR ROTA BACKEND
export async function GET(req: NextRequest, res: NextResponse) {
  const params = req.nextUrl.searchParams;

  const token = params.get("wtk");
  const uid = params.get("ud");

  const user = await prisma.user.findUnique({ where: { id: uid! } });

  if (!user) return NextResponse.json("user not found", { status: 404 });

  const isValid = await compare(token!, user.tempToken!);

  if (!isValid) return NextResponse.json("invalid token", { status: 404 });

  await prisma.user.update({
    where: { id: uid! },
    data: { verifiedEmail: true, tempToken: null },
  });
  return NextResponse.redirect(new URL("/signup"));
}
