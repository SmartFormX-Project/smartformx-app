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
import { enUS, ptBR } from "date-fns/locale";

import AnalyseWidget from "./Tabs/AnalyseWidget";
import QuestionsWidget from "./Tabs/QuestionsWidget";
import LastAnswersWidget from "./Tabs/LastAnsWidget";
import HomeMobileMode from "./mobile-page";
import ShareFormModal from "../../../components/Modals/ShareFormModal";
import ConfirmActionModal from "../../../components/Modals/ConfirmModal";
import FormsService from "@/app/api/repository/FormService";
import useSWR from "swr";
import { AppFetchJSON } from "@/app/api/repository/fetch";
import { Form } from "@/types/interfaces";
import { format, formatDistance, subDays } from "date-fns";
import GetStatusForm from "@/utils/get-status-form";
import { useTranslation } from "@/app/i18n/client";

export default function FormDetailsPage({
  params: { id, lang },
}: {
  params: { id: string; lang: string };
}) {
  const { t } = useTranslation(lang, "home");
  const ShareModalDisclosure = useDisclosure();
  const ConfirmModalDisclosure = useDisclosure();
  const [isMobile, setMobileMode] = useState<boolean>(false);

  const { data, isLoading, error } = useSWR(
    FormsService.FetchSingleFormURL(id),
    AppFetchJSON
  );

  // useEffect(() => {
  //   if (window) {
  //     setMobileMode(window.matchMedia("(max-width: 600px)").matches);
  //   }
  // }, [setMobileMode]);

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
            t={t}
            locale={lang}
            onOpenShare={ShareModalDisclosure.onOpen}
            onPauseForm={onPauseForm}
            onCloseForm={() => ConfirmModalDisclosure.onOpen()}
            data={data as Form}
          />
        ) : (
          <DesktopMode
            t={t}
            locale={lang}
            onOpenShare={ShareModalDisclosure.onOpen}
            onPauseForm={onPauseForm}
            onCloseForm={() => ConfirmModalDisclosure.onOpen()}
            data={data as Form}
          />
        )}
        <ShareFormModal
          lng={lang}
          code={data.shortId}
          isOpen={ShareModalDisclosure.isOpen}
          onOpenChange={ShareModalDisclosure.onOpenChange}
        />
        <ConfirmActionModal
          lng={lang}
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
  t: any;
  data: Form;
  locale: string;
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
              {props.data._count.UserAnswers} {props.t("home-details.answers")}
            </span>
            <p className="font-extralight text-[20px]">
              {props.data.description}
            </p>
          </div>
          <div className="flex justify-between items-center ">
            <span>
              {formatDistance(props.data.createdAt, new Date(), {
                addSuffix: true,
                locale: props.locale == "en" ? enUS : ptBR,
              })}
            </span>
            {props.data.status == "open" || props.data.status == "paused" ? (
              <div className="space-x-2 flex">
                <Button
                  endContent={<Share2 size={18} />}
                  color="primary"
                  onClick={props.onOpenShare}
                >
                  {props.t("home-details.buttons.share")}
                </Button>
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      endContent={<ChevronDownIcon />}
                      className="bg-black text-white"
                    >
                      {props.t("home-details.buttons.actions")}
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
                        {props.t("home-details.buttons.open")}
                      </DropdownItem>
                    ) : (
                      <DropdownItem
                        key="pause_form"
                        className=""
                        color="default"
                        startContent={<Pause />}
                      >
                        {props.t("home-details.buttons.pause")}
                      </DropdownItem>
                    )}
                    <DropdownItem
                      key="close_form"
                      className="text-danger"
                      color="danger"
                      startContent={<Lock />}
                    >
                      {props.t("home-details.buttons.stop")}
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            ) : (
              <div className="text-green-500 flex items-center">
                <Check size={18} className="mr-2" />{" "}
                {props.t("home-details.finished")}
              </div>
            )}
          </div>
        </div>
        <div className="flex w-full flex-grow space-x-4">
          <div className="p-6 w-full rounded-[40px] bg-[#7ebbfd] flex flex-col justify-between text-white">
            <h1 className="text-3xl font-light">
              {props.t("home-details.cards.answers.title")}
            </h1>

            <h2 className="text-7xl font-semibold">{percent.toFixed(1)}%</h2>
            <header>
              <span className="font-light">
                {props.data._count.UserAnswers}{" "}
                {props.t("home-details.cards.range.span")}
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
            <h1 className="text-3xl font-light">
              {props.t("home-details.cards.range.title")}
            </h1>

            <h2 className="text-7xl font-semibold">
              {props.data.entrances + props.data.extraEntrances}
              <b className="text-sm font-medium">
                {" "}
                {props.t("home-details.cards.range.span")}
              </b>
            </h2>
            <header>
              <span className="font-light text-xs leading-none">
                {props.t("home-details.cards.range.description")}
              </span>
            </header>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-1/2 items-center">
        <Tabs aria-label="Options">
          <Tab
            key="analyse"
            title={props.t("home-details.tabs.analyse.title")}
            className="w-full"
          >
            <AnalyseWidget data={props.data} t={props.t} />
          </Tab>
          <Tab
            key="questions"
            title={props.t("home-details.tabs.questions.title")}
            className="w-full"
          >
            <QuestionsWidget form={props.data} />
          </Tab>
          <Tab
            key="last"
            title={props.t("home-details.tabs.answers.title")}
            className="w-full"
          >
            <LastAnswersWidget form={props.data} t={props.t} lng={props.locale} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};
