import Redis from "ioredis";
import prisma from "@/config/prisma";
import OpenAiRepository from "./app/(backend)/repository/openai";

export const register = async () => {
  //This if statement is important, read here: https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { Worker } = await import("bullmq");
    /**
      This is a simple redis connection using ioredis that looks like this:
      */

    const connection = new Redis(process.env.REDIS_URL!);
    //   const { connection } = await import("./route/to/your/connection");

    new Worker(
      "analyseForm",
      async (job): Promise<any> => {
        const { goals, jsonQuestions, formId, levelPlan, maxInsights } = job?.data;

        const response = await OpenAiRepository.generateInsights(
          goals ?? [],
          jsonQuestions,
          levelPlan,
          maxInsights
        );

        if (!response) {
          console.log("error");
          //     return NextResponse.json(
          //       "Error processing information: not possible generate insights",
          //       { status: 400 }
          //     );
        } else {
          await prisma.analyse.create({
            data: {
              formId: formId,
              summary: response.extra,
              usage: response.usage,
              keywords: response.keywords,
              Stats: { createMany: { data: response.stats } },
              Topics: {
                createMany: { data: response.all_insights },
              },
            },
          });

          await prisma.form.update({
            data: { status: "analysed" },
            where: { id: formId },
          });
        }

        console.log("Task executed successfully");
      },
      {
        connection,
        concurrency: 10,
        removeOnComplete: { count: 1000 },
        removeOnFail: { count: 5000 },
      }
    );
  }
};
