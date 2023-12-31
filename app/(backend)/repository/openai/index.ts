import { encodingForModel } from "tiktoken-node";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
  organization: "org-HRMnDOgvRiZ44AKp6hhopSvw",
});

type Question = {
  question: string;
  inputType: "options" | "interval";
  goal: string;
  options?: string[];
};
type ResponseInsight = {
  all_insights: {
    title: string;
    description: string;
    type: string;
  }[];
  stats: {
    title: string;
    info: string;
    value: string;
  }[];
  extra: string;
  keywords: string[];
  usage: string;
};
class OpenAiRepositoryClass {
  async generateQuestions(
    formType: string,
    businessDescription: string,
    plan: number
  ): Promise<Question[] | null> {
    var promptStr =
      `Gere as melhores 8 questões para um formulario de feedback do tipo "${formType}", do negócio "${businessDescription}". ` +
      `Varie os tipos(options e interval(1-5)) de resposta para obter melhores feedback. cada questão deve conter: question, goal, inputType e options(se inputType!="interval").`;

    const gptResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0613",
      messages: [
        {
          role: "system",
          content:
            "considere que você é um especialista em experiência do cliente",
        },
        { role: "user", content: promptStr },
      ],

      functions: [
        {
          name: "createQuestionsObj",
          parameters: {
            type: "object",
            properties: {
              questions: {
                type: "array",
                items: {
                  question: { type: "string" },
                  goal: { type: "string" },
                  inputType: {
                    type: "string",
                    description: "tipo de entrada",
                    enum: ["interval", "options"],
                  },
                  "options(if 'type' == options)": "array",
                },
              },
            },
            required: ["questions"],
          },
        },
      ],
      function_call: { name: "createQuestionsObj" },
      temperature: 0.4,
    });

    try {
      const res = gptResponse.choices[0].message.function_call?.arguments;
      var quests: Question[] = JSON.parse(res!).questions;

      return quests;
    } catch (error) {
      console.log("formato invalido");
      console.log(error);
      return null;
    }
  }

  async generateSolutionsByInsight(
    insight: string,
    companyDescription: string
  ): Promise<string | null> {
    var promptStr = `Para esse tipo de empresa: ${companyDescription}. Gere uma unica ideia que soluciona esse problema: ${insight}. Não precisa descrever muito.`;

    const gptResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      max_tokens: 500,
      messages: [
        {
          role: "system",
          content:
            "você é um especialista em experiência do cliente e solução de problemas",
        },
        { role: "user", content: promptStr },
      ],
      temperature: 0.4,
    });

    try {
      let solution = gptResponse.choices[0].message.content!;

      return solution;
    } catch (error) {
      console.log("formato invalido");
      console.log(error);
      console.log(gptResponse.choices[0].message.content!);

      return null;
    }
  }
  async generateInsights(
    goals: string[],
    values: string,
    level: number,
    maxInsights: number
  ): Promise<ResponseInsight | null> {
    var systemStr =
      "considere que você é especialista em experiencia e comportamento do cliente, e analista de feedbacks. Sua funçao é Gerar analises contendo: insights com titulo, descriçao e se é negativo ou positivo apenas;palavras chaves precisas e contudentes da analise; resultado da analise, indice de satisfação e contexto de tendencias; nas stats obter titulo, um valor e explicação simples para o dado.";
    var promptStr = `Dados os feedbacks sendo: as colunas ${goals}, para os valores: ${values}\n. faça uma análise aprofundada e detalhada desses feedbacks, forneça no máximo ${maxInsights} insights, identifique padrões ou tendências, palavras-chave, 4 principais estatísticas e o resultado.`;

    const config =
      level != 3
        ? { model: "gpt-3.5-turbo", max: level == 2 ? 4000 : 2500 }
        : { model: "gpt-4", max: 2500 };

    const gptResponse = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemStr,
        },
        { role: "user", content: promptStr },
      ],
      model: config.model,
      temperature: 0.5,
      max_tokens: config.max,
      functions: [
        {
          name: "createInsightsObj",
          parameters: {
            type: "object",
            properties: {
              insights: {
                type: "array",
                description: "insights gerados a partir dos feedbacks",
                items: {
                  insightTitle: "string",
                  insightDescription: "string",
                  insightType: {
                    type: "string",
                    enum: ["positivo", "negativo"],
                  },
                },
              },
              keywords: {
                type: "array",
                description:
                  "palavras chaves obtidos da analise e dos feedbacks",
                items: {},
              },

              stats: {
                type: "array",
                description: "estatisticas obtidas a partir da analises",
                items: {
                  title: "string",
                  data: "string",
                  info: "string",
                },
              },
              extra: {
                type: "string",
                description:
                  "relatorio de pontos criticos e sentimentos identificados da analise e priorização de Ações",
                items: {
                  sastifaction: "string",
                  trend: "string",
                },
              },
            },

            required: ["insights", "keywords", "stats", "extra"],
          },
        },
      ],
      function_call: { name: "createInsightsObj" },
    });

    try {
      var usage = JSON.stringify(gptResponse.usage);
      const res = gptResponse.choices[0].message.function_call!.arguments;

      let { insights, keywords, stats, extra } = JSON.parse(res);

      const all_insights = (insights as []).map((e: any) => {
        return {
          title: e.title,
          description: e.description,
          type: e.sentiment,
        };
      });
      stats = (stats as []).map((e: any) => {
        return {
          title: e.title,
          value: String(e.value),
          info: e.explanation,
        };
      });

      return { all_insights, keywords, extra, stats, usage };
    } catch (error) {
      console.log("formato invalido");
      console.log(error);
      console.log(gptResponse);

      return null;
    }
  }
}
var OpenAiRepository = new OpenAiRepositoryClass();
export default OpenAiRepository;
