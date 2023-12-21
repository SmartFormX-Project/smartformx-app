import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prisma";
import { compare, hash } from "bcryptjs";

export async function POST(req: NextRequest, res: NextResponse) {
  const params = req.nextUrl.searchParams;

  const { newPassword } = await req.json();

  // const token = params.get("wtk");
  const uid = params.get("ud");

  const user = await prisma.user.findUnique({ where: { id: uid! } });

  if (!user) return NextResponse.json("user not found", { status: 404 });

  // const isValid = await compare(token!, user.tempToken!);

  // if (!isValid) return NextResponse.json("invalid token", { status: 404 });

  await prisma.user.update({
    where: { id: uid! },
    data: { password: await hash(newPassword, 10), tempToken: null }, //apaga o tempToken
  });

  return NextResponse.json({ status: 200 });
}
