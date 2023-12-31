import { NextResponse } from "next/server";
import prisma from "@/config/prisma";
import OpenAiRepository from "@/app/(backend)/repository/openai";

export async function GET(
  req: Request,
  { params }: { params: { topicId: string } }
) {
  if (!params.topicId || params.topicId === undefined) {
    return NextResponse.json("Id not found", { status: 403 });
  }
  const response = await prisma.topicAnalyses.findUnique({
    where: { id: params.topicId },
    select: {
      description: true,
      Analyse: {
        select: {
          Form: { select: { Business: { select: { description: true } } } },
        },
      },
    },
  });
  const business = response?.Analyse?.Form.Business.description!;

  const solution = await OpenAiRepository.generateSolutionsByInsight(
    response?.description!,
    business
  );

  const update = await prisma.topicAnalyses.update({
    where: { id: params.topicId },
    data: { howToImprove: solution },
  });

  return NextResponse.json({message:"soluction created"}, { status: 201 });
}
