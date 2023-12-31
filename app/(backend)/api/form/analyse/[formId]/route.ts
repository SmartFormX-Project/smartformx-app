import { NextResponse } from "next/server";
import prisma from "@/config/prisma";
import tiktoken from "tiktoken-node";

import { analyseQueue } from "@/app/(backend)/workers/analyse";

import { Questions } from "@prisma/client";

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
      Questions: {
        select: {
          Answers: { select: { answear: true }, take: 45 },
          goal: true,
        },
      },
      Business: {
        select: { User: { select: { metadata: true, subscribeStatus: true } } },
      },
    },
  });

  if (!form) NextResponse.json("Form not found", { status: 404 });

  // incomplete, incomplete_expired, trialing, active, past_due, canceled, or unpaid
  if (
    form?.Business.User?.subscribeStatus != "active" &&
    form?.Business.User?.subscribeStatus != "trialing"
  )
    return NextResponse.json({ type: "subscribe_issues" }, { status: 403 });

  var goals = form.Questions.map((element: any) => element.goal);

  const result = ProcessQuestionsToAIForm(form?.Questions ?? []);

  const jsonQuestions = JSON.stringify(result);
  
  var enc = tiktoken.encodingForModel("gpt-3.5-turbo");
  const tokens = enc.encode(jsonQuestions).length;

  const metadata = form?.Business.User?.metadata!;
  const { insights, level }: any = metadata;
  

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

  return NextResponse.json({ message: "processing analyse" }, { status: 201 });
}

function ProcessQuestionsToAIForm(questions: any[]) {
 console.log(questions);
  return questions
    .map(({ Answers, goal }: any) =>
    Answers.map((Answer: any, index: any) => ({
        [`${goal}Answear${index + 1}`]: Answer.answear,
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
