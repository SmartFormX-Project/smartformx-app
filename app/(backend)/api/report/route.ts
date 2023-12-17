import { NextResponse } from "next/server";
import prisma from "@/config/prisma";

export async function POST(req: Request) {
  const { title, category, description, userId } = await req.json();

  const buss = await prisma.reports.create({
    data: { title, category, description, userId },
  });
  return NextResponse.json(buss, { status: 201 });
}
