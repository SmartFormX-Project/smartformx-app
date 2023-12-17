import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prisma";
import { hash } from "bcrypt";
import crypto from "crypto";
import EmailSenderRepository from "@/app/(backend)/repository/mailsender";

export async function POST(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  const email = params.email;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return NextResponse.json("user not found", { status: 404 });

  let resetToken = crypto.randomBytes(32).toString("hex");
  const _hash = await hash(resetToken, 10);

  await prisma.user.update({ where: { email }, data: { tempToken: _hash } });
  let link =
    process.env.NEXT_PUBLIC_URL_BASE +
    "new-password?wtk=" +
    resetToken +
    "&ud=" +
    user.id;

  await EmailSenderRepository.sendForgotPasswordEmail({
    link,
    name: user.name,
    to: email,
  });

  return NextResponse.json({ message: "sent email" }, { status: 200 });
}
