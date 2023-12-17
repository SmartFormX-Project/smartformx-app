import { NextResponse } from "next/server";
import prisma from "@/config/prisma";
import tiktoken from "tiktoken-node";

import { analyseQueue } from "@/app/(backend)/workers/analyse";

export async function GET(
  req: Request,
  { params }: { params: { formId: string } }
) {
  if (!params.formId) {
    return NextResponse.json("Id not found", { status: 403 });
  }

  const formId = params.formId;

  const form = await prisma.form.findUnique({
    where: { id: formId },
    select: {
      questions: {
        select: {
          Answears: { select: { answear: true }, take: 45 },
          goal: true,
        },
      },
      bus: {
        select: { user: { select: { metadata: true, subscribeStatus: true } } },
      },
    },
  });

  if (!form) NextResponse.json("Form not found", { status: 404 });

  // incomplete, incomplete_expired, trialing, active, past_due, canceled, or unpaid
  if (form?.bus.user?.subscribeStatus != "active" &&form?.bus.user?.subscribeStatus != "trialing")
    return NextResponse.json({ type: "subscribe_issues" }, { status: 403 });

  var goals = form?.questions.map((element) => element.goal);

  const result = ProcessQuestionsToAIForm(form?.questions ?? []);

  const jsonQuestions = JSON.stringify(result);
  var enc = tiktoken.encodingForModel("gpt-3.5-turbo");
  const tokens = enc.encode(jsonQuestions).length;

  const { insights, level, answers } = JSON.parse(
    form?.bus.user?.metadata as string
  );

  const levelPlan = parseInt(level);
  const maxInsights = parseInt(insights);

  await analyseQueue.add("analyseQueueForm", {
    formId,
    goals,
    jsonQuestions,
    tokens,
    levelPlan,
    maxInsights,
  });

  await prisma.form.update({
    data: { status: "analysing" },
    where: { id: params.formId },
  });

  return NextResponse.json({ message: "processing analyse" }, { status: 200 });
}

function ProcessQuestionsToAIForm(questions: any[]) {
  return questions
    .map(({ Answears, goal }: any) =>
      Answears.map((answear: any, index: any) => ({
        [`${goal}Answear${index + 1}`]: answear.answear,
      }))
    )
    .reduce((acc, curr) => {
      for (let i = 0; i < curr.length; i++) {
        acc[i] = { ...acc[i], ...curr[i] };
      }
      return acc;
    }, [])
    .map(Object.values);
}
