
"use client";
import { Button } from "@nextui-org/button";
import {
  FiArrowLeft,
} from "react-icons/fi";
import Link from "next/link";
import { Form } from "@/types/interfaces";
import { getStatusString } from "@/types/variables";
import FormDescription from "./widgets/FormInfo";
import GenerateInsightsButton from "./widgets/GenerateInsightsButton";
import useSWR from "swr";
import ShareFormModal from "@/components/ShareFormModal";
import { useDisclosure } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import LoaderComponent from "@/components/loaderAnalysing";
import { useEffect } from "react";
import MobileHomePage from "./page-mobile";
import InsightsDetails from "./widgets/InsightDetails";
import AnalyseAndKeyWords from "./widgets/AnalyseAndKeywords";
import StatsComponent from "./widgets/Stats";
import { AppFetchJSON } from "@/app/api/repository/fetch";
import FormsService from "@/app/api/repository/FormService";
import AnalyseService from "@/app/api/repository/AnalyseService";

export default function InsightPage(
  {
  params: { id },
}: {
  params: { id: string };
}
) {
  
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data, isLoading, error } = useSWR(FormsService.FetchSingleFormURL(id), AppFetchJSON);

  const form = data as Form;
  const session = useSession();

  let component;

  useEffect(() => {
    const abortC = new AbortController();

    const status = async () => {
      var res = await AnalyseService.checkAnalyseStatus(id, form.status);
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
      case "closed":
        component = <GenerateInsightsButton id={form.id ?? ""} />;
        break;
      case "analysing":
        component = <LoaderComponent />;
        break;
      default:
        component = <LoaderComponent />;
        break;
    }
  let isMobile = window.matchMedia("(max-width: 600px)").matches;
  return (
    <div className="flex flex-col w-full h-full overflow-y-hidden">
      <div className="flex items-center mt-4  cursor-default">
        <Link href={"/"}>
          <Button
            size="sm"
            variant="bordered"
            className="border-[#9999]"
            color="default"
            radius="md"
            startContent={<FiArrowLeft color="#9999" size={20} />}
            isIconOnly
          />
        </Link>
        <div className="ml-4">
          <h1 className="text-black text-2xl font-bold">
            {form.title === "" ? "Sem titulo" : form.title}
          </h1>
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

      {isMobile ? (
        <MobileHomePage
          isBlockedPremiumFeatures={session.data?.user?.plan?.toLocaleLowerCase() === "free"}
          formData={form}
          onOpenModalShare={onOpen}
          isAvailableSolution={session.data?.user?.plan === "premium"}
          noAnalyseComponent={component}
        />
      ) : (
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
                  <InsightsDetails
                    insights={form.Analyse.Topics}
                    isAvailableSolution={session.data?.user?.plan === "premium"}

                  />
                  <AnalyseAndKeyWords
                    keywords={form.Analyse.keywords}
                    summary={form.Analyse.summary}
                    isBlocked={session.data?.user?.plan?.toLocaleLowerCase() === "free"}
                  />
                </div>
                <StatsComponent stats={form.Analyse.Stats ?? []} isBlocked={session.data?.user?.plan?.toLocaleLowerCase() === "free"} />
              </div>
            </>
          )}
        </div>
      )}
      <ShareFormModal
        code={form.shortId!}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onSubmit={(close) => close()}
      />
      
    </div>
  );
}
