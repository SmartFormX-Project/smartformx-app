import { NextResponse } from "next/server";
import prisma from "@/config/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (!params.id || params.id === undefined) {
    return NextResponse.json("Id not found", { status: 403 });
  }
  const response = await prisma.form.findUnique({
    where: { id: params.id },
    include: {
      analyse: true,
      _count: { select: { userAnswear: true } },
      questions: {
        select: { question: true, goal: true },
      },
    },
  });
  return NextResponse.json(response, { status: 200 });
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  var status = await req.json();
  if (!params.id) {
    return NextResponse.json("Id not found", { status: 404 });
  }
  const response = await prisma.form.update({
    where: { id: params.id },
    data: { status },
  });

  return NextResponse.json(response, { status: 200 });
}
