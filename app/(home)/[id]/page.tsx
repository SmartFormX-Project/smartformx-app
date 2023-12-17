// import "server-only";
"use client";
import Header from "@/components/Header";
import { Button } from "@nextui-org/button";
import { FiArrowLeft, FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import { FaFaceLaugh, FaFaceFrown } from "react-icons/fa6";
import { BsLightbulb } from "react-icons/bs";
import Link from "next/link";
import { Form } from "@/types/interfaces";
import { getStatusString } from "@/types/variables";
import FormDescription from "./widgets/FormInfo";
import SmartFormService from "@/app/(backend)/services/SmartFormService";
import GenerateInsightsButton from "./widgets/GenerateInsightsButton";
import useSWR from "swr";
import ShareFormModal from "@/components/ShareFormModal";
import { useDisclosure } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import LoaderComponent from "@/components/loaderAnalysing";
import { useEffect } from "react";

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
      <div className="flex items-center mt-4">
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
          <h1 className="text-black text-2xl font-bold">{form.title}</h1>
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
      <div className="flex w-full h-full gap-4 mt-3">
        <FormDescription formData={form} onOpenModalShare={onOpen} />
        {!form.analyse ? (
          <div
            className="border border-black/10 rounded-2xl w-full flex justify-center items-center text-black  animate-fade-up"
            style={{ animationDelay: "0.15s" }}
          >
            {component}
          </div>
        ) : (
          <>
            <div className="flex flex-col flex-auto gap-4">
              <div className="flex h-3/4 gap-4">
                <Insights insights={form.analyse.topics} />
                <FeelingsAndKeyWords
                  keywords={form.analyse.keywords}
                  description={form.analyse.feelingDesc}
                  feeling={form.analyse.feeling}
                />
              </div>
              <div className="flex h-1/4 gap-4">
                {form.analyse.stats.map((e, i) => {
                  return (
                    <div
                      key={e.id}
                      className="border-medium border-blue-400 w-1/4 h-full rounded-2xl p-4 flex flex-col justify-between animate-fade-up"
                      style={{ animationDelay: `0.${15 * i}s` }}
                    >
                      <span className="uppercase">{e.title}</span>
                      <div>
                        <h1 className="text-2xl font-bold">{e.data}</h1>
                        <p className="text-[11px] font-light">{e.info}</p>
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
  feeling,
  description,
}: {
  keywords: string[];
  feeling: string;
  description: string;
}) => {
  return (
    <div className="w-1/2 max-h-[500px] text-black p-4 flex flex-col animate-fade-up">
      <div>
        <h1 className="font-medium text-xl mb-3">Sentimento Predominante</h1>
        <div className="flex">
          <div className="flex flex-col justify-center items-center">
            <FaFaceLaugh size={120} color="rgba(0,0,0,.05)" className="mb-2" />
            <span className="font-normal">{feeling}</span>
          </div>
          <p className="font-light text-sm ml-3">{description}</p>
        </div>
      </div>
      <div className=" mt-8 flex flex-col justify-around rounded-2xl">
        <h1 className="font-medium text-xl mb-4">Palavras chave</h1>
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
    </div>
  );
};

const Insights = ({ insights }: { insights: any[] }) => {
  return (
    <div
      className="max-h-[500px] text-black border-medium border-black/10 w-1/2 rounded-2xl relative p-4 flex flex-col overflow-hidden animate-fade-up"
      style={{ animationDelay: "0.35s" }}
    >
      <div className="flex justify-between mb-2 items-baseline">
        <h1 className="font-medium text-xl">Insights</h1>

        <div className="flex ">
          <div className="flex mr-3 items-baseline">
            <FiThumbsUp />
            <h2 className="h-min ml-1 font-bold">4</h2>
          </div>
          <div className="flex item-center items-baseline">
            <FiThumbsDown />
            <h2 className="h-min ml-1 font-bold">1</h2>
          </div>
        </div>
      </div>
      <div className="space-y-3 overflow-scroll">
        {insights.map((e, i) => {
          return (
            <div key={i} className="flex justify-between items-center">
              <div className="mr-2">
                <h3 className="font-normal text-base text-[#ED1313]">
                  #{i + 1} sadadasd asdasda ad
                </h3>
                <p className="font-light text-xs">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  eu urna at nibh viverra tincidunt eu.Lorem ipsum
                </p>
              </div>
              <Button
                size="sm"
                variant="flat"
                color="warning"
                startContent={<BsLightbulb />}
                isIconOnly
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
const PositiveInsight = () => {
  return (
    <div className=" bg-green-300 w-1/2 rounded-2xl overflow-clip relative p-4 flex flex-col justify-between">
      <div>
        <header className="flex items-center  text-black">
          <FiThumbsUp />
          <p className="text-xl ml-1 font-light">Positivos</p>
        </header>
        <div className="mt-3 space-y-3">
          {[0, 0, 0, 0].map((e, i) => {
            return (
              <div key={i} className="flex items-center rounded-xl text-black">
                <div className="rounded-sm bg-white w-2 h-10 mr-2"></div>
                <div>
                  <h3 className="font-semibold text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </h3>
                </div>
                <Button size="sm" className=" mr-2">
                  Detalhes
                </Button>
                {/* <Button
                  size="sm"
                  variant="flat"
                  color="warning"
                  startContent={<BsLightbulb />}
                  isIconOnly
                /> */}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col overflow-clip w-fit">
        <h2 className="font-semibold text-black text-xl mb-1">
          Sentimento predominante
        </h2>
        <h1 className="text-4xl font-extrabold mb-1 drop-shadow-[0_1.4px_0.8px_rgba(0,0,0,1)] text-green-300">
          Felicidade
        </h1>

        <p className="text-xs text-black/50 font-light overflow-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu urna
          at nibh viverra tincidunt eu.Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nunc eu urna at nibh viverra tincidunt eu.Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Nunc eu urna at nibh s
        </p>
      </div>

      <FaFaceLaugh
        size={260}
        color="rgba(0,0,0,.05)"
        className="absolute -bottom-8 -right-9 -z-0"
      />
    </div>
  );
};

const NegativeInsight = () => {
  return (
    <div className="bg-red-300 w-1/2 rounded-2xl relative overflow-clip p-4 flex flex-col justify-between">
      <div>
        <header className="flex items-center  text-black">
          <FiThumbsDown />
          <p className="text-xl ml-1 font-light">Negativos</p>
        </header>
        <div className="mt-3 space-y-3">
          {[0, 0, 0, 0].map((e, i) => {
            return (
              <div key={i} className="flex items-center rounded-xl text-black">
                <div className="rounded-sm bg-white w-2 h-10 mr-2"></div>
                <div>
                  <h3 className="font-semibold text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </h3>
                </div>
                <Button size="sm" className=" mr-2">
                  Detalhes
                </Button>
                <Button
                  size="sm"
                  // variant="flat"
                  color="warning"
                  startContent={<BsLightbulb />}
                  isIconOnly
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col overflow-clip w-fit">
        <h2 className="font-semibold text-black text-xl mb-1">
          Sentimento predominante
        </h2>
        <h1 className="text-4xl font-extrabold mb-1 drop-shadow-[0_1.4px_0.8px_rgba(0,0,0,1)] text-red-300">
          Angústia
        </h1>

        <p className="text-xs text-black/50 font-light overflow-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu urna
          at nibh viverra tincidunt eu.Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nunc eu urna at nibh viverra tincidunt eu.Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Nunc eu urna at nibh s
        </p>
      </div>
      <FaFaceFrown
        size={260}
        color="rgba(0,0,0,.05)"
        className="absolute -bottom-8 -right-9"
      />
    </div>
  );
};
