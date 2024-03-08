"use client";
import FormsService from "@/app/api/repository/FormService";
import { AppFetchJSON } from "@/app/api/repository/fetch";
import { Form, Question } from "@/types/interfaces";
import { Angry, Annoyed, Meh, Smile, Laugh } from "lucide-react";
import useSWR from "swr";

interface AnswerCount {
  answear: string;
  count: number;
}

interface QuestionAnswerCount {
  answers: AnswerCount[];
}

interface QuestionResult {
  questionId: string;
  ansCount: QuestionAnswerCount[];
}

export default function QuestionsWidget({ form }: { form: Form }) {
  const { data, isLoading } = useSWR(
    FormsService.FetchQuestionDataURL(form.id),
    AppFetchJSON
  );

  if (isLoading) return <h1>Loading...</h1>;
  if (data) {
    const questions = form.Questions as Question[];
    const answers = data as QuestionResult[];
    console.log(data);

    const allowTypes = ["interval", "options", "nps"];
    return (
      <div className="max-h-[77dvh] flex flex-col overflow-y-auto overflow-scroll">
        {questions.map((el) => {
          const ans = answers.find((a: any) => a.questionId == el.id);

          if (allowTypes.includes(el.inputType))
            return (
              <Question
                question={el.question}
                options={el.options}
                type={el.inputType}
                values={ans?.ansCount[0]!=undefined ? ans?.ansCount[0].answers : []}
              />
            );
        })}
      </div>
    );
  }
}

const Question = ({
  question,
  type,
  options,
  values,
}: {
  question: string;
  type: string;
  options?: string[];
  values: AnswerCount[];
}) => {
  const compareAndGetCount = (value: string) => {
    return values.find((v) => v.answear === value)?.count ?? 0;
  };
  return (
    <div className="flex flex-col m-auto">
      <h3 className="font-semibold mt-4 text-center">{question}</h3>
      {type === "interval" && (
        <div className="flex space-x-4 pt-2 justify-center">
          {iconsIntervalValues.map((e, i) => {
            return (
              <div className="flex flex-col items-center" key={i}>
                {e}
                <span className="rounded-full bg-black/60 text-white text-xs px-2 mt-2">
                  {compareAndGetCount((i + 1).toString())}
                </span>
              </div>
            );
          })}
        </div>
      )}
      {type === "options" && (
        <div className="flex space-x-4 pt-2 justify-center">
          {options!.map((e) => {
            return (
              <div className="flex flex-col items-center">
                <div className="bg-slate-100 px-2 rounded-full border text-sm text-center">
                  {e}
                </div>
                <span className="w-min rounded-full bg-black/60 text-white text-xs px-2 mt-2">
                  {compareAndGetCount(e)}
                </span>
              </div>
            );
          })}
        </div>
      )}
      {type === "nps" && (
        <div className="flex space-x-2 pt-2">
          {iconsNPSValues.map((e, i) => {
            return (
              <div className="flex flex-col items-center">
                {e}
                <span className="rounded-full bg-black/60 text-white text-xs px-2 mt-2">
                  {compareAndGetCount((i + 1).toString())}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const iconsIntervalValues = [
  <Angry key={1} size={40} className={" text-[#EC153B]"} />,
  <Annoyed key={2} size={40} className={" text-[#F35E79]"} />,
  <Meh key={3} size={40} className={" text-[#F1C93A]"} />,
  <Smile key={4} size={40} className={" text-[#48BA7F]"} />,
  <Laugh key={5} size={40} className={" text-[#1FC56F]"} />,
];

const iconsNPSValues = [
  <Angry key={1} size={50} fill="#EC153B" color="#fff" strokeWidth={1.5} />,
  <Angry key={1} size={50} fill="#EC153B" color="#fff" strokeWidth={1.5} />,
  <Angry key={1} size={50} fill="#EC153B" color="#fff" strokeWidth={1.5} />,
  <Angry key={1} size={50} fill="#EC153B" color="#fff" strokeWidth={1.5} />,
  <Angry key={1} size={50} fill="#EC153B" color="#fff" strokeWidth={1.5} />,
  <Angry key={1} size={50} fill="#EC153B" color="#fff" strokeWidth={1.5} />,
  <Meh key={2} size={50} fill={"#F1C93A"} color="#fff" strokeWidth={1.5} />,
  <Meh key={2} size={50} fill={"#F1C93A"} color="#fff" strokeWidth={1.5} />,
  <Smile key={3} size={50} fill={"#48BA7F"} color="#fff" strokeWidth={1.5} />,
  <Smile key={4} size={50} fill={"#48BA7F"} color="#fff" strokeWidth={1.5} />,
];
