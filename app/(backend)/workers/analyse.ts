// src/workers/sample.worker.ts

import { Worker, Queue } from "bullmq";
import Redis from "ioredis";
import prisma from "../../../config/prisma";
import OpenAiRepository from "../../../app/(backend)/repository/openai";

import dotenv from 'dotenv'; 
dotenv.config();
const connection = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});
export const analyseQueue = new Queue("analyseQueueForm", {
  connection,
  defaultJobOptions: {
    attempts: 1,
    removeOnComplete: true,
    backoff: {
      type: "exponential",
      delay: 5000,
    },
  },
});

const worker = new Worker(
  "analyseQueueForm",
  async (job) => {
    const { goals, jsonQuestions, formId, levelPlan, maxInsights } = job?.data;
    console.log("start analysing: " + formId);
    var startTime = performance.now();

    const response = await OpenAiRepository.generateInsights(
      goals ?? [],
      jsonQuestions,
      levelPlan,
      maxInsights
    );

    if (response) {
      try {
        const a = await prisma.analyse.create({
          data: {
            formId: formId,
            feeling: response.sentiment.feeling,
            feelingDesc: response.sentiment.explanation,
            satisfationLevel: response.sentiment.satisfactionLevel,
            keywords: response.keywords,
            stats: { createMany: { data: response.stats } },
            topics: {
              createMany: { data: response.all_insights },
            },
          },
        });

        await prisma.form.update({
          data: { status: "analysed" },
          where: { id: formId },
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("unable to process form data: " + formId);
    }
    var endTime = performance.now();
    console.log(`Took ${(endTime - startTime) / 1000} seconds`);
  },
  {
    connection,
    concurrency: 5,
    removeOnComplete: { count: 1000 },
    removeOnFail: { count: 5000 },
  }
);

export default worker;
