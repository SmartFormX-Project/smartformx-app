"use client";
import React from "react";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Progress,
  Tab,
  Tabs,
} from "@nextui-org/react";
import {
  ArrowLeft,
  Check,
  ChevronDownIcon,
  Circle,
  Lock,
  Pause,
  Share2,
} from "lucide-react";

import AnalyseWidget from "./Tabs/AnalyseWidget";
import QuestionsWidget from "./Tabs/QuestionsWidget";
import LastAnswersWidget from "./Tabs/LastAnsWidget";
import { PageHomeProps } from "./page";
import GetStatusForm from "@/utils/get-status-form";
import { formatDistance } from "date-fns";

export default function HomeMobileMode(props: PageHomeProps) {
  var percent = (props.data._count.UserAnswers / props.data.limitAns)*100;

  percent = percent >100? 100 : percent; 
  return (
    <div className="flex flex-grow h-[87dvh] space-x-2 mt-4">
      <div className="flex flex-col w-full items-center">
        <Tabs aria-label="Options">
          <Tab key="home" title="Formulário" className="w-full">
            <div className="flex  flex-col w-full gap-4">
              <div className="border p-5 flex flex-col justify-between rounded-[40px] h-[48dvh]">
                <div className="flex">
                  <Button
                    isIconOnly
                    endContent={<ArrowLeft size={16} />}
                    size="sm"
                    className="mt-4 mr-2 bg-transparent cursor-pointer"
                    onClick={() => location.replace("/")}
                  />
                  <p className="font-light text-[40px] leading-tight">
                  {props.data.title}
                  </p>
                </div>
                <div className="space-y-4">
                  <span className="flex items-center">
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
                  <p className="font-extralight text-[16px]">
                  {props.data.description}
                  </p>
                </div>
                <div className="flex justify-between items-center ">
                  <span>   {formatDistance(props.data.createdAt, new Date(), {
                addSuffix: true,
              })}</span>
               {props.data.status == "open" || props.data.status == "paused" ? (
                  <div className="space-x-2">
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
                        <DropdownItem
                          key="pause_form"
                          className=""
                          color="default"
                          startContent={<Pause />}
                        >
                          Pausar formulário
                        </DropdownItem>
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
              <div className="flex w-full h-full flex-grow space-x-4">
                <div className="p-6 w-full flex-grow rounded-[40px] bg-[#7ebbfd] flex flex-col justify-between text-white">
                  <h1 className="text-2xl font-light">
                    Respostas
                  </h1>

                  <h2 className="text-5xl font-semibold mt-4">{percent.toFixed(1)}%</h2>
                  <header>
                    <span className="font-light">{props.data._count.UserAnswers} respostas</span>
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
                <div className="p-6 w-full flex-grow rounded-[40px] bg-[#f7d0eb] flex flex-col justify-between text-black">
                  <h1 className="text-2xl font-light">Alcance</h1>

                  <h2 className="text-5xl font-semibold mt-4">
                  {props.data.entrances + props.data.extraEntrances}<b className="text-sm font-medium"> pessoas</b>
                  </h2>
                  <header>
                    <span className="font-light text-xs leading-none">
                      Número total de pessoas expostas ao questionário.
                    </span>
                  </header>
                </div>
              </div>
            </div>
          </Tab>
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
}
