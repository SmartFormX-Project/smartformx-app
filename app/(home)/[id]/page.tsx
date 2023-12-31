// import "server-only";
"use client";
import Header from "@/components/Header";
import { Button } from "@nextui-org/button";
import {
  FiArrowLeft,
  FiThumbsDown,
  FiThumbsUp,
  FiKey,
  FiInfo,
} from "react-icons/fi";
import { TbChartDots3 } from "react-icons/tb";
import { BsLightbulb } from "react-icons/bs";
import Link from "next/link";
import { Form, TopicAnalyses } from "@/types/interfaces";
import { getStatusString } from "@/types/variables";
import FormDescription from "./widgets/FormInfo";
import SmartFormService from "@/app/(backend)/services/SmartFormService";
import GenerateInsightsButton from "./widgets/GenerateInsightsButton";
import useSWR from "swr";
import ShareFormModal from "@/components/ShareFormModal";
import { Tooltip, useDisclosure } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import LoaderComponent from "@/components/loaderAnalysing";
import { useEffect, useState } from "react";

const fetcher = (arg: any, ...args: any) =>
  fetch(arg, ...args).then((res) => res.json());

export default function InsightPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const url = SmartFormService.URL_GET_FORM_SERVER + id;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data, isLoading, error } = useSWR(url, fetcher);

  const form = data as Form;
  const session = useSession();

  let component;

  useEffect(() => {
    const abortC = new AbortController();

    const status = async () => {
      var res = await SmartFormService.checkAnalyseStatus(id, form.status);
      var newStatus = res.data.new_status as boolean;
      if (newStatus) location.reload();
    };

    if (form != null && form.status == "analysing") {
      const time = session.data?.user?.plan == "starter" ? 10000 : 60000;

      const intervalId = setInterval(() => {
        status();
      }, time);

      return () => {
        abortC.abort();
        clearInterval(intervalId);
      };
    }
  }, [form, session.data?.user?.plan, id]); // Run useEffect only once when the component mounts

  if (error) location.replace("/");
  if (isLoading)
    return (
      <div className="text-black">
        <div className="fixed top-0 right-0 h-screen w-screen z-50 flex flex-col justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-400"></div>
        </div>
      </div>
    );
  if (form.status)
    switch (form.status) {
      case "in_progress":
        component = (
          <h1>
            Aguardando a conclusão do formulario para geração das analises
          </h1>
        );
        break;
      case "form_done":
        component = <GenerateInsightsButton id={form.id ?? ""} />;
        break;
      case "analysing":
        component = <LoaderComponent />;
        break;
      default:
        break;
    }
  return (
    <div className="flex flex-col w-full h-full overflow-y-hidden">
      <Header
        busId={session.data?.user?.businessId ?? ""}
        name={session.data?.user?.name ?? ""}
        userId={session.data?.user?.id ?? ""}
      />
      <div className="flex items-center mt-4  cursor-default">
        <Link href={"/"}>
          <Button
            size="sm"
            variant="flat"
            radius="md"
            startContent={<FiArrowLeft />}
            isIconOnly
          />
        </Link>
        <div className="ml-4">
          <h1 className="text-black text-2xl font-bold">{form.title==="" ? "Sem titulo":form.title}</h1>
          <div className=" flex items-center">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </span>
            <span className="text-black text-base font-light ml-2">
              {getStatusString(form.status)}
            </span>
          </div>
        </div>
      </div>
      <div className="flex w-full h-full gap-4 mt-3  cursor-default">
        <FormDescription formData={form} onOpenModalShare={onOpen} />
        {!form.Analyse ? (
          <div
            className="border border-black/10 rounded-2xl w-full flex justify-center items-center text-black  animate-fade-up"
            style={{ animationDelay: "0.15s" }}
          >
            {component}
          </div>
        ) : (
          <>
            <div className="flex flex-col flex-auto gap-4">
              <div className="flex gap-4">
                <Insights
                  insights={form.Analyse.Topics}
                  isAvailableSolution={session.data?.user?.plan === "premium"}
                />
                <FeelingsAndKeyWords
                  keywords={form.Analyse.keywords}
                  summary={form.Analyse.summary}
                />
              </div>
              <div className="flex h-1/4 gap-4">
                {form.Analyse.Stats.map((e, i) => {
                  return (
                    <div
                      key={e.id}
                      className="border border-blue-400 text-black w-1/4 h-full rounded-2xl p-4 flex flex-col justify-between animate-fade-up"
                      style={{ animationDelay: `0.${15 * i}s` }}
                    >
                      <span className="uppercase text-[10px]">{e.title}</span>
                      <div className="flex items-center">
                        <h1 className="text-2xl font-bold mr-2">{e.value}</h1>
                        <Tooltip
                          classNames={{}}
                          showArrow={true}
                          content={e.info}
                          color="default"
                          closeDelay={0}
                        >
                          <button>
                            <FiInfo className="text-black/30 hover:text-black transition-colors" />
                          </button>
                        </Tooltip>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
      <ShareFormModal
        code={form.shortId!}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onSubmit={(close) => close()}
      />
    </div>
  );
}

const FeelingsAndKeyWords = ({
  keywords,
  summary,
}: {
  keywords: string[];
  summary: string;
}) => {
  return (
    <div className="w-1/2 max-h-[500px] text-black p-4 flex flex-col animate-fade-up">
      <div className="flex space-x-4 mb-4 items-center">
        <div className="bg-[#7928CA] text-white flex items-center justify-center rounded-lg h-10 w-10 text-xl">
          <TbChartDots3 />
        </div>
        <h1 className="font-medium text-xl text-[#7928CA]">
          Análise estratégica
        </h1>
      </div>
      <p className="text-black/50 text-xs font-light">{summary}</p>

      <div className="flex space-x-4 mb-4 mt-6 items-center">
        <div className="bg-[#7928CA] text-white flex items-center justify-center rounded-lg h-10 w-10 text-xl">
          <FiKey />
        </div>
        <h1 className="font-medium text-xl text-[#7928CA]">Palavras chave</h1>
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        {keywords.map((e, i) => {
          return (
            <div
              className="px-4 py-1 font-normal text-sm bg-purple-700 text-white  rounded-full"
              key={i}
            >
              {e}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Insights = ({
  insights,
  isAvailableSolution,
}: {
  insights: TopicAnalyses[];
  isAvailableSolution: boolean;
}) => {
  const [loadB, setLoadB] = useState(false);

  const updateLoading = () => setLoadB((prev) => !prev);
  const thumbs = insights.reduce(
    (count, e) => {
      e.type === "positivo" ? count.positive++ : count.negative++;
      return count;
    },
    { positive: 0, negative: 0 }
  );

  const generateSolution = async (id: string) => {
    updateLoading();
    var res = await SmartFormService.createSolution(id);
    if (res.status === 201) window.location.reload();
    else updateLoading();
  };

  return (
    <div
      className="max-h-[460px] text-black border-medium border-black/10 w-1/2 rounded-2xl relative p-4 flex flex-col overflow-hidden animate-fade-up"
      style={{ animationDelay: "0.35s" }}
    >
      <div className="flex justify-between mb-2 items-baseline">
        <h1 className="font-medium text-xl">Insights</h1>

        <div className="flex ">
          <div className="flex mr-3 items-baseline">
            <FiThumbsUp />
            <h2 className="h-min ml-1 font-bold">{thumbs.positive}</h2>
          </div>
          <div className="flex item-center items-baseline">
            <FiThumbsDown />
            <h2 className="h-min ml-1 font-bold">{thumbs.negative}</h2>
          </div>
        </div>
      </div>
      <div className="space-y-3 overflow-scroll">
        {insights.map((e, i) => {
          const isNegative = e.type == "negativo";
          return (
            <div key={i} className="flex justify-between items-center">
              <div className="mr-2">
                <h3
                  className={`font-normal text-base ${
                    isNegative
                      ? "text-[#ED1313]"
                      : e.type == "neutro"
                      ? "text-gray-400"
                      : "text-[#48BA7F]"
                  }`}
                >
                  {e.title}
                </h3>
                <p className="font-light text-xs">{e.description}</p>
                {e.howToImprove && (
                  <p className="bg-[#F5A524] mt-2 bg-opacity-5 text-[#F5A524] font-light text-xs p-2 rounded-lg">
                    {e.howToImprove}
                  </p>
                )}
              </div>

              {isAvailableSolution &&
                (isNegative || e.type == "neutro") &&
                !e.howToImprove && (
                  <Tooltip
                    color="default"
                    showArrow={true}
                    content="Gerar uma solução"
                  >
                    <Button
                      size="sm"
                      variant="flat"
                      color="warning"
                      isIconOnly
                      isLoading={loadB}
                      startContent={<BsLightbulb />}
                      onClick={() => generateSolution(e.id)}
                    />
                  </Tooltip>
                )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
