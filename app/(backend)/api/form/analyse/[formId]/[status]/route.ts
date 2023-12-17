import { NextResponse } from "next/server";
import prisma from "@/config/prisma";
import tiktoken from "tiktoken-node";

import { analyseQueue } from "@/app/(backend)/workers/analyse";

export async function GET(
  req: Request,
  { params }: { params: { formId: string; status: string } }
) {
  if (!params.formId) {
    return NextResponse.json("Id not found", { status: 404 });
  }

  const formId = params.formId;
  const status = params.status;

  const form = await prisma.form.findUnique({
    where: { id: formId },
    select: { status: true },
  });

  const new_status = form?.status != status;

  return NextResponse.json({ new_status }, { status: 200 });
}
