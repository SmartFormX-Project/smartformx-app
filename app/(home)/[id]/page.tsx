"use client";
import React, { useEffect, useState } from "react";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Progress,
  Tab,
  Tabs,
  useDisclosure,
} from "@nextui-org/react";
import {
  ArrowLeft,
  Check,
  ChevronDownIcon,
  Circle,
  Lock,
  Pause,
  Play,
  Share2,
} from "lucide-react";

import AnalyseWidget from "./Tabs/AnalyseWidget";
import QuestionsWidget from "./Tabs/QuestionsWidget";
import LastAnswersWidget from "./Tabs/LastAnsWidget";
import HomeMobileMode from "./mobile-page";
import ShareFormModal from "../../components/Modals/ShareFormModal";
import ConfirmActionModal from "../../components/Modals/ConfirmModal";
import FormsService from "@/app/api/repository/FormService";
import useSWR from "swr";
import { AppFetchJSON } from "@/app/api/repository/fetch";
import { Form } from "@/types/interfaces";
import validator from "validator";
import { format, formatDistance, subDays } from "date-fns";
import GetStatusForm from "@/utils/get-status-form";

export default function FormDetailsPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const ShareModalDisclosure = useDisclosure();
  const ConfirmModalDisclosure = useDisclosure();
  const [isMobile, setMobileMode] = useState<boolean>(false);

  const { data, isLoading, error } = useSWR(
    FormsService.FetchSingleFormURL(id),
    AppFetchJSON
  );

  useEffect(() => {
    if (window) {
      console.log(validator.isUUID(id));
      // if (!id || !validator.isUUID(id)) window.location.replace("/");

      setMobileMode(window.matchMedia("(max-width: 600px)").matches);
    }
  }, [setMobileMode]);

  // if (!isLoading && !data) location.replace("/");
  const onPauseForm = async () => {
    const status = data.status == "paused" ? "open" : "paused";
    await FormsService.updateFormStatus(id, status);
    location.reload();
  };
  const onCloseForm = async (onCloseModal: any) => {
    await FormsService.updateFormStatus(id, "closed");
    location.reload();
  };
  if (data)
    return (
      <>
        {isMobile ? (
          <HomeMobileMode
            onOpenShare={ShareModalDisclosure.onOpen}
            onPauseForm={onPauseForm}
            onCloseForm={() => ConfirmModalDisclosure.onOpen()}
            data={data as Form}
          />
        ) : (
          <DesktopMode
            onOpenShare={ShareModalDisclosure.onOpen}
            onPauseForm={onPauseForm}
            onCloseForm={() => ConfirmModalDisclosure.onOpen()}
            data={data as Form}
          />
        )}
        <ShareFormModal
          code={data.shortId}
          isOpen={ShareModalDisclosure.isOpen}
          onOpenChange={ShareModalDisclosure.onOpenChange}
        />
        <ConfirmActionModal
          isOpen={ConfirmModalDisclosure.isOpen}
          onOpenChange={ConfirmModalDisclosure.onOpenChange}
          onSubmit={onCloseForm}
        />
      </>
    );
}
export interface PageHomeProps {
  onOpenShare: () => void;
  onPauseForm: () => void;
  onCloseForm: () => void;
  data: Form;
}
const DesktopMode = (props: PageHomeProps) => {
  var percent = (props.data._count.UserAnswers / props.data.limitAns) * 100;

  percent = percent > 100 ? 100 : percent;
  return (
    <div className="flex flex-grow h-[87dvh] space-x-2 mt-4">
      <div className="flex  flex-col w-1/2 gap-4">
        <div className="border p-5 flex flex-col justify-between rounded-[40px] h-[50dvh]">
          <div className="flex">
            <Button
              isIconOnly
              endContent={<ArrowLeft size={16} />}
              size="sm"
              className="mt-4 mr-2 bg-transparent cursor-pointer"
              onClick={() => location.replace("/")}
            />
            <p className="font-light text-[50px] leading-tight">
              {props.data.title}
            </p>
          </div>
          <div className="space-y-4">
            <span className="flex items-center capitalize">
              {GetStatusForm(props.data.status)}{" "}
              <Circle
                size={8}
                fill="#D9D9D9"
                stroke="#D9D9D9"
                className="mx-4"
              />{" "}
              {props.data.category}{" "}
              <Circle
                size={8}
                fill="#D9D9D9"
                stroke="#D9D9D9"
                className="mx-4"
              />{" "}
              {props.data._count.UserAnswers} Respostas
            </span>
            <p className="font-extralight text-[20px]">
              {props.data.description}
            </p>
          </div>
          <div className="flex justify-between items-center ">
            <span>
              {formatDistance(props.data.createdAt, new Date(), {
                addSuffix: true,
              })}
            </span>
            {props.data.status == "open" || props.data.status == "paused" ? (
              <div className="space-x-2 flex">
                <Button
                  endContent={<Share2 size={18} />}
                  color="primary"
                  onClick={props.onOpenShare}
                >
                  Compartilhar
                </Button>
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      endContent={<ChevronDownIcon />}
                      className="bg-black text-white"
                    >
                      Ações
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Static Actions"
                    onAction={(key) =>
                      key == "close_form"
                        ? props.onCloseForm()
                        : props.onPauseForm()
                    }
                  >
                    {props.data.status === "paused" ? (
                      <DropdownItem
                        key="pause_form"
                        className=""
                        color="default"
                        startContent={<Play />}
                      >
                        Abrir formulário
                      </DropdownItem>
                    ) : (
                      <DropdownItem
                        key="pause_form"
                        className=""
                        color="default"
                        startContent={<Pause />}
                      >
                        Pausar formulário
                      </DropdownItem>
                    )}
                    <DropdownItem
                      key="close_form"
                      className="text-danger"
                      color="danger"
                      startContent={<Lock />}
                    >
                      Fechar formulário
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            ) : (
              <div className="text-green-500 flex items-center">
                <Check size={18} className="mr-2" /> Finalizado
              </div>
            )}
          </div>
        </div>
        <div className="flex w-full flex-grow space-x-4">
          <div className="p-6 w-full rounded-[40px] bg-[#7ebbfd] flex flex-col justify-between text-white">
            <h1 className="text-3xl font-light">Respostas</h1>

            <h2 className="text-7xl font-semibold">{percent.toFixed(1)}%</h2>
            <header>
              <span className="font-light">
                {props.data._count.UserAnswers} respostas
              </span>
              <Progress
                classNames={{
                  indicator: "bg-white",
                }}
                size="md"
                aria-label="Loading..."
                value={percent}
              />
            </header>
          </div>
          <div className="p-6 w-full rounded-[40px] bg-[#f7d0eb] flex flex-col justify-between text-black">
            <h1 className="text-3xl font-light">Alcance</h1>

            <h2 className="text-7xl font-semibold">
              {props.data.entrances + props.data.extraEntrances}
              <b className="text-sm font-medium"> pessoas</b>
            </h2>
            <header>
              <span className="font-light text-xs leading-none">
                Número total de pessoas expostas ao questionário.
              </span>
            </header>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-1/2 items-center">
        <Tabs aria-label="Options">
          <Tab key="analyse" title="Análise" className="w-full">
            <AnalyseWidget data={props.data} />
          </Tab>
          <Tab key="questions" title="Questões" className="w-full">
            <QuestionsWidget form={props.data} />
          </Tab>
          <Tab key="last" title="Ultimas respostas" className="w-full">
            <LastAnswersWidget form={props.data} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};
