import { NextResponse } from "next/server";
import prisma from "@/config/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (!params.id) {
    return NextResponse.json("Id not found", { status: 404 });
  }

  const response = await prisma.business.findUnique({
    where: { id: params.id },
    select: {
      category: true,
      clients: true,
      createdAt: true,
      description: true,
      name: true,
    },
  });
  return NextResponse.json(response, { status: 200 });
}
