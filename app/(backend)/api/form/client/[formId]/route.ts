import { NextResponse } from "next/server";
import prisma from "@/config/prisma";
import crypto from "crypto";

export async function GET(
  req: Request,
  { params }: { params: { formId: string } }
) {
  if (!params.formId) {
    return NextResponse.json("Id not found", { status: 404 });
  }
  const response = await prisma.form.findUnique({
    where: { shortId: params.formId, status: "in_progress" },
    select: {
      id: true,
      Business: {
        select: {
          name: true,
        },
      },
      Questions: {
        select: {
          id: true,
          question: true,
          goal: true,
          options: true,
          inputType: true,
        },
      },
    },
  });

  return NextResponse.json(response, { status: 200 });
}

export async function POST(
  req: Request,
  { params }: { params: { formId: string } }
) {
  var data = await req.json();
  if (!params.formId) {
    return NextResponse.json("Id not found", { status: 404 });
  }
  const response = await prisma.userAnswers.create({
    data: {
      name: data.name,
      referenceCode: generateReferenceCode(),
      formId: params.formId,
      Answers: { createMany: { data: data.answears } },
    },
  });

  return NextResponse.json(response, { status: 201 });
}
function generateReferenceCode(length: number = 10): string {
  return crypto
    .randomBytes(length)
    .toString("hex")
    .slice(0, length)
    .toUpperCase();
}
export async function PATCH(
  req: Request,
  { params }: { params: { formId: string } }
) {
  console.log(req.url);
  if (!params.formId) {
    return NextResponse.json("Id not found", { status: 404 });
  }
  const response = await prisma.form.update({
    where: { shortId: params.formId, status: "in_progress" },
    data: {
      entrances: { increment: 1 },
    },
  });
  if (!response) {
    await prisma.form.update({
      where: {
        shortId: params.formId,
        AND: { status: { not: "in_progress" } },
      },
      data: {
        extraEntrances: { increment: 1 },
      },
    });
  }

  return NextResponse.json(response, { status: 200 });
}
