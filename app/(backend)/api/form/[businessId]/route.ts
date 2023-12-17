import { NextResponse } from "next/server";
import prisma from "@/config/prisma";

export async function GET(
  req: Request,
  { params }: { params: { businessId: string } }
) {
  if (!params.businessId) {
    console.log("no id provided");
    return NextResponse.json([], { status: 404 });
  }
  const response = await prisma.form.findMany({
    where: { businessId: params.businessId },
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      status: true,
      createdAt: true,
    },
  });

  return NextResponse.json(response, { status: 200 });
}
