import { NextResponse } from "next/server";
import prisma from "@/config/prisma";
import short from "short-uuid";
import OpenAiRepository from "../../repository/openai";
import { insertFictionAnswearInDb } from "@/utils/scripts/form-ans";

export async function GET(req: Request) {

  await insertFictionAnswearInDb();

  return NextResponse.json("done", { status: 200 });
}
export async function POST(req: Request) {
  const { type, businessId, title, description } = await req.json();

  if (!businessId) return NextResponse.json("id not provided", { status: 404 });

  const bus = await prisma.business.findUnique({
    where: { id: businessId },
    select: {
      description: true,
      User: { select: { metadata: true, subscribeStatus: true } },
    },
  });

  if (!bus) return NextResponse.json("account not found", { status: 404 });

  if (
    bus.User?.subscribeStatus != "active" &&
    bus.User?.subscribeStatus != "trialing"
  )
    return NextResponse.json({ type: "subscribe_issues" }, { status: 403 });

  var questions = await OpenAiRepository.generateQuestions(
    type,
    bus.description ?? "",
    1
  );
  if (questions) {
    
    questions = questions.map((obj) => {
      if (obj.options === null) {
        delete obj.options;
      }
      return obj;
    });

    const translator = short();
    var value = 1;
    let shortId = "";

    while (value != 0) {
      shortId = translator.new();
      value = await prisma.form.count({ where: { shortId } });
    }

    const { answers }: any = bus.User.metadata;

    const limit = parseInt(answers);

    const response = await prisma.form.create({
      data: {
        category: type,
        businessId,
        title: title,
        description: description,
        shortId: shortId,
        limitAns: limit,
        Questions: { createMany: { data: questions } },
      },
    });

    return NextResponse.json(response.id, { status: 201 });
  }
  return NextResponse.json({}, { status: 500 });
}
