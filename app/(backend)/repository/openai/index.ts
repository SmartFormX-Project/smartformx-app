import { encodingForModel } from "tiktoken-node";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_TOKEN,
  organization: process.env.OPENAI_ORG,
});

class OpenAiRepositoryClass {
  async generateQuestions(
    formType: string,
    businessDescription: string,
    plan: number
  ): Promise<any[] | null> {
    const { model } = getConfig(plan, 1000, "completitions");

    var promptStr =
      `Gere as melhores 8 questões para um formulario de feedback do tipo "${formType}", do negócio "${businessDescription}". ` +
      `Varie os tipos(options e interval(1-5)) de resposta para obter o melhor e preciso feedback.` +
      `E retorne somente no seguinte formato JSON(one line): {questions: [{"question": string, "goal":(ex: qualidade), "type":(options ou interval), "options"(para answearType="options") : string[]}]}.`;

    const prompt = {
      model: model,
      prompt: promptStr,
      temperature: 0.5,
      max_tokens: 1000,
    };
    // var data = await fetcher(URL, {
    //   method: "POST",
    //   body: JSON.stringify(prompt),
    // });

    const res = await openai.completions.create({
      prompt: promptStr,
      model: model,
      temperature: 0.5,
      max_tokens: 1000,
    });

    try {
      var dataFromAi = getFromRequest(res, "completitions");
      const quests = proccessRawQuestions(dataFromAi);

      return quests;
    } catch (error) {
      console.log("formato invalido");
      console.log(error);
      return null;
    }
  }

  async generateSolutionsByInsight(
    insight: string,
    companyDescription: string,
    plan: number
  ): Promise<string | null> {
    const { model, max_tokens } = getConfig(plan, 0);

    const prompt = {
      model: model,
      prompt: `${companyDescription} {${insight}}, `,
      temperature: 0.5,
      max_tokens: 2000,
    };

    var data = await fetcher("", {
      method: "POST",
      body: JSON.stringify(prompt),
    });

    try {
      var dataFromAi = getFromRequest(data, "chat");

      let solution = "";
      console.log("start parsing to obj...");

      var dataObj = JSON.parse(JSON.stringify(dataFromAi));

      console.log("finish parsing...");
      return solution;
    } catch (error) {
      console.log("formato invalido");
      console.log(error);

      return null;
    }
  }
  async generateInsights(
    goals: string[],
    values: string,
    plan: number,
    insights: number
  ): Promise<{
    all_insights: { title: string; description: string; type: string }[];
    keywords: string[];
    sentiment: {
      feeling: string;
      explanation: string;
      satisfactionLevel: string;
    };
    stats: { title: string; data: string; info: string }[];
  } | null> {
    var origin: "chat" | "completitions" = plan == 1 ? "completitions" : "chat";
    var systemStr =
      "considere que você é especialista em analise de feedbacks e clientes";
    // let max = plan == "starter" ? 5 : plan == "essential" ? 8 : 12;

    var promptStr = `Dados os indexs ${goals}, para os valores: ${values}\n. faça uma análise aprofundada e detalhada desses feedbacks, forneça no máximo ${insights} insights, e identifique padrões ou tendências, palavras-chave, o principal sentimento, e 4 principais estatísticas. E retorne no seguinte formato JSON(one line): {all_insights(min 1 negativo): array[{title, description, type(pos ou neg)}]\n, keywords: array<string>[]\n, sentiment: {feeling, explanation, satisfactionLevel(%)}\n, stats: array[{title, data, info(sem virgulas)}]}`;

    var size = getTokensSize("gpt-3.5-turbo", promptStr + " " + systemStr);

    const { model, max_tokens, modelType } = getConfig(plan, size, origin);

    // console.log(size);
    // console.log({ URL, model, max_tokens, modelType });

    const response = await (modelType == "chat"
      ? openai.chat.completions.create({
          messages: [
            {
              role: "system",
              content: systemStr,
            },
            { role: "user", content: promptStr },
          ],
          model: model,
          temperature: 0.5,
          max_tokens: max_tokens,
        })
      : openai.completions.create({
          prompt: promptStr,
          model: model,
          temperature: 0.5,
          max_tokens: max_tokens,
        }));

    try {
      var dataFromAi = getFromRequest(response, modelType);

      const { all_insights, keywords, sentiment, stats } =
        proccessRawInsights(dataFromAi);

      // console.log(response.usage?.prompt_tokens);
      // console.log(response.usage?.completion_tokens);
      // console.log(response.usage?.total_tokens);

      return { all_insights, keywords, sentiment, stats };
    } catch (error) {
      console.log("formato invalido");
      console.log(error);
      console.log(response);

      return null;
    }
  }
}

function getConfig(
  plan: number,
  tokens: number,
  origin: "chat" | "completitions" = "chat"
): {
  // URL: string;
  model: string;
  max_tokens: number;
  modelType: "chat" | "completitions";
} {
  var models_tokens: any = {
    "gpt-2.5": 4096,
    "gpt-3.5-turbo": 4096,
    "gpt-3.5-turbo-16k": 16385,
    "gpt-4": 8192,
    "gpt-4-32k": 32768,
  };

  var max_tokens = 1200;
  var model = "";

  if (origin == "completitions") {
    return {
      // URL: process.env.OPENAI_URL_COMPLETITIONS as string,
      model: "gpt-3.5-turbo-instruct",
      max_tokens: max_tokens,
      modelType: origin,
    };
  }

  switch (plan) {
    case 1:
      model = "gpt-3.5-turbo";
      break;
    case 2:
      if (tokens > 3000) model = "gpt-3.5-turbo-16k";
      else model = "gpt-3.5-turbo";
      break;
    case 3:
      // if (tokens > 7000) model = "gpt-4-32k";
      model = "gpt-4";
      break;

    default:
      break;
  }

  return {
    // URL: process.env.OPENAI_URL_CHAT as string,
    model: model,
    max_tokens: max_tokens,
    modelType: origin,
  };
}

function getFromRequest(data: any, from: "chat" | "completitions") {
  return (
    from == "completitions"
      ? data.choices[0].text
      : data.choices[0].message.content
  ) as string;
}

async function fetchWithTimeout(resource: any, options: any = {}) {
  const { timeout = 120000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(id);

  return response;
}

const fetcher = (url: any, arg: any, ...args: any) =>
  fetch(url, {
    ...arg,
    headers: {
      "OpenAI-Organization": process.env.OPENAI_ORG as string,
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_TOKEN}`,
    },
    ...args,
  } as any).then((res) => res.json());

function proccessRawQuestions(data: any) {
  const proccessed = JSON.parse(data);

  return proccessed.questions;
}
function proccessRawInsights(data: any) {
  var dataObj = JSON.parse(JSON.stringify(data));

  return dataObj
    .split("\n\n")
    .filter((line: any) => line.trim() !== "")
    .map((line: string) => {
      const lineStr = line
        .split("\n")
        .filter((line: any) => line.trim() !== "");
      var proccessedData = lineStr.map((e) => e.trim()).join("");

      proccessedData = proccessedData.replaceAll("info:", '"info":');
      proccessedData = proccessedData.replaceAll("data:", '"data":');
      proccessedData = proccessedData.replaceAll("title:", '"title":');
      proccessedData = proccessedData.replaceAll(
        "description:",
        '"description":'
      );
      proccessedData = proccessedData.replaceAll("type:", '"type":');
      proccessedData = proccessedData.replace(
        "all_insights:",
        '"all_insights":'
      );
      proccessedData = proccessedData.replace("keywords:", '"keywords":');
      proccessedData = proccessedData.replace("stats:", '"stats":');
      proccessedData = proccessedData.replace("sentiment:", '"sentiment":');

      proccessedData = proccessedData.replaceAll("feeling:", '"feeling":');
      proccessedData = proccessedData.replaceAll(
        "explanation:",
        '"explanation":'
      );
      proccessedData = proccessedData.replaceAll(
        "satisfactionLevel:",
        '"satisfactionLevel":'
      );

      return JSON.parse(proccessedData);
    })[0];
}

function getTokensSize(model: string, prompt: string) {
  var enc = encodingForModel(model);
  return enc.encode(prompt).length;
}
var OpenAiRepository = new OpenAiRepositoryClass();
export default OpenAiRepository;
