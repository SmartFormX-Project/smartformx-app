import { NextResponse } from "next/server";
import prisma from "@/config/prisma";
import { getServerSession } from "next-auth";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (!params.id) {
    return NextResponse.json("Id not found", { status: 404 });
  }
  const response = await prisma.user.findUnique({
    where: { id: params.id },
    select: {
      password: false,
      name: true,
      subscribeStatus: true,
      metadata: true,
      email: true,
    },
  });

  return NextResponse.json(response, { status: 200 });
}