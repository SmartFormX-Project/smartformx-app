import AnalyseService from "@/app/api/repository/AnalyseService";
import PaymentService from "@/app/api/repository/PaymentService";
import CircleWaveLoader from "@/app/components/CircleWave";
import DNALoader from "@/app/components/DNALoader";
import { block_analyse, emp_analyse, stars } from "@/assets";
import { Form } from "@/types/interfaces";
import { Button } from "@nextui-org/react";
import {
  Activity,
  Angry,
  Annoyed,
  BarChart,
  Key,
  Laugh,
  Lock,
  Meh,
  PauseOctagon,
  Smile,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";

export default function AnalyseWidget({
  data,
  isBlocked = false,
  t
}: {
  data: Form;
  isBlocked?: boolean;
  t:any
}) {
  const startAnlyse = async () => {
    const res = await AnalyseService.createAnalyses(data?.id);

    if (res.status === 200) location.reload();
  };

  if (isBlocked) return <UnavailableState />;
  if (data.status == "open" || data.status == "paused") return <BlockedState />;
  if (data.status == "analysing") return <LoadingState />;

  return data.Analyse == undefined ? (
    <EmptyState onStartAnalyse={startAnlyse} />
  ) : (
    <DataState insights={data.Analyse.Topics} t={t} keywords={data.Analyse.keywords} result={data.Analyse.summary} />
  );
  // return <DataState insights={ins} keywords={keywors} result={result} />;
}

const DataState = ({
  keywords,
  insights,
  result,
  isMobile,
  t
}: {
  keywords: string[];
  insights: any[];
  result: string;
  isMobile?: boolean;
  t:any
}) => {
  const thumbs = insights.reduce(
    (count, e) => {
      e.type === "positivo" ? count.positive++ : count.negative++;
      return count;
    },
    { positive: 0, negative: 0 }
  );
  return (
    <div
      className={`
          w-full
      text-black p-4 px-6 flex flex-col animate-fade-up max-h-[77dvh] overflow-y-auto overflow-scroll`}
    >
      <div className="flex space-x-2 mb-4 items-center">
        <div className="bg-[#7928CA] text-white flex items-center justify-center rounded-lg h-9 w-9 text-xl">
          <Key size={18} />
        </div>
        <h1 className="font-medium text-xl text-[#7928CA]">{t("home-details.tabs.analyse.keywords")}</h1>
      </div>
      <div className="flex flex-wrap gap-2">
        {keywords.map((e, i) => {
          return (
            <div
              className="px-4 py-1 font-normal text-sm bg-black/10 text-black  rounded-full"
              key={i}
            >
              #{e}
            </div>
          );
        })}
      </div>
      <div className="flex items-center w-full justify-between mt-7">
        <div className="flex space-x-2 items-center mb-2">
          <div className="bg-[#7928CA] text-white flex items-center justify-center rounded-lg h-9 w-9 text-xl">
            <BarChart size={18} />
          </div>
          <h1 className="font-medium text-xl text-[#7928CA]">Insights</h1>
        </div>
        <div className="flex justify-between items-center mt-2 text-black/30">
          <div className="flex items-baseline">
            <div className="flex mr-3 items-baseline">
              <ThumbsUp size={18} />
              <h2 className="h-min ml-1 font-bold">{thumbs.positive}</h2>
            </div>
            <div className="flex item-center items-baseline">
              <ThumbsDown size={18} />
              <h2 className="h-min ml-1 font-bold">{thumbs.negative}</h2>
            </div>
          </div>
        </div>
      </div>
      <Insights insights={insights} />

      <div className="flex space-x-2 mb-4 items-center mt-6">
        <div className="bg-[#7928CA] text-white flex items-center justify-center rounded-lg h-9 w-9 text-xl">
          <Activity size={18} />
        </div>
        <h1 className="font-medium text-xl text-[#7928CA]">{t("home-details.tabs.analyse.result")}</h1>
      </div>
      <p className="text-black/50 text-sm font-light">{result}</p>
    </div>
  );
};
const EmptyState = ({ onStartAnalyse }: { onStartAnalyse: () => void }) => {
  return (
    <div className="w-full flex flex-col items-center mt-4">
      <Image alt="" src={emp_analyse} className="ml-10" />
      <h2 className="mt-6 font-semibold text-xl">
        Você ainda não analisou as respostas!
      </h2>
      <span className="mt-2 text-foreground-400">
        Clique no botão abaixo para analisar todas as respostas
      </span>
      <Button
        startContent={<Activity />}
        color="primary"
        radius="full"
        onClick={onStartAnalyse}
        className="mt-10"
      >
        Iniciar analise
      </Button>
    </div>
  );
};
const LoadingState = () => {
  return (
    <div className="w-full flex flex-col items-center mt-4">
      {/* <Image alt="" src={emp_analyse} className="ml-10" /> */}
      <CircleWaveLoader />
      {/* <DNALoader /> */}
      <h2 className="mt-6 font-semibold text-xl">
        Todas as resposas estão sendo analisadas!
      </h2>

      <span className="mt-2">Isso pode levar um tempinho...</span>
    </div>
  );
};

const BlockedState = () => {
  return (
    <div className="w-full flex flex-col items-center mt-10">
      <PauseOctagon size={200} strokeWidth={1.5} className="text-primary-300" />
      <h2 className="mt-6 font-semibold text-xl">Aguarde as respostas!</h2>
      <span className="mt-2 text-foreground-400">
        Para inciar a analise das respostas você deve fechar o formulário.
      </span>
      {/* <Button
        color="primary"
        radius="full"
        className="mt-10"
        startContent={<Image alt="" src={stars} />}
      >
        Atualizar agora
      </Button> */}
    </div>
  );
};
const UnavailableState = () => {
  return (
    <div className="w-full flex flex-col items-center mt-4">
      <Image alt="" src={block_analyse} />
      <h2 className="mt-6 font-semibold text-xl">Faça um upgrade!</h2>
      <span className="mt-2 text-foreground-400">
        Atualize seu plano e obtenha uma analise completa com inteligencia
        artificial
      </span>
      <Button
        // color="primary"
        className="bg-white text-primary-500 mt-10"
        variant="bordered"
        radius="full"
        onClick={async () => await PaymentService.goToStripeCustomerPortal()}
        startContent={<Image alt="" src={stars} />}
      >
        Atualizar agora
      </Button>
    </div>
  );
};

const Insights = ({
  insights,
  isMobile = false,
}: {
  insights: any[];
  isMobile?: boolean;
}) => {
  return (
    <div
      className={` text-black border-black/10 w-full 
         relative flex flex-col animate-fade-up`}
      style={{ animationDelay: "0.35s" }}
    >
      <div className="space-y-3 overflow-scroll max-h-max">
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
