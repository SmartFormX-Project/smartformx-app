import { NextResponse } from "next/server";
import prisma from "@/config/prisma";
import short from "short-uuid";
import OpenAiRepository from "../../repository/openai";
type Question = {
  question: string;
  type: string;
  goal: string;
  options?: [];
}

export async function POST(req: Request) {
  const { type, businessId, title, description } = await req.json();

  if (!businessId) return NextResponse.json("id not provided", { status: 404 });

  const bus = await prisma.business.findUnique({
    where: { id: businessId },
    select: {
      description: true,
      user: { select: { metadata: true, subscribeStatus: true } },
    },
  });

  if (!bus) return NextResponse.json("account not found", { status: 404 });

  if (
    bus.user?.subscribeStatus != "active" &&
    bus.user?.subscribeStatus != "trialing"
  )
    return NextResponse.json({ type: "subscribe_issues" }, { status: 403 });

  const questions: Question[] | null = await OpenAiRepository.generateQuestions(
    type,
    bus.description ?? "",
    1
  );

  if (questions) {
    const translator = short();
    var value = 1;
    let shortId = "";

    while (value != 0) {
      shortId = translator.new();
      value = await prisma.form.count({ where: { shortId } });
    }

    const { answers }: any = bus.user.metadata;

    const limit = parseInt(answers);

    const response = await prisma.form.create({
      data: {
        category: type,
        businessId,
        title: title,
        description: description,
        shortId: shortId,
        limitAns: limit,
        questions: { createMany: { data: questions } },
      },
    });
    return NextResponse.json(response.id, { status: 201 });
  }
  return NextResponse.json({}, { status: 500 });
}
