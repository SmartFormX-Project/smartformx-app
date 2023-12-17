import { NextResponse } from "next/server";
import prisma from "@/config/prisma";

export async function POST(req: Request) {
  const { name, category, description, clients, userId } = await req.json();

  const buss = await prisma.business.create({
    data: { name, category, description, clients,  },
  });
  return NextResponse.json(buss, { status: 201 });
}
