"use client";

import AnalyseService from "@/app/api/repository/AnalyseService";
import { TopicAnalyses } from "@/types/interfaces";
import { Tooltip, Button } from "@nextui-org/react";
import {  useState } from "react";
import { BsLightbulb } from "react-icons/bs";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";

export default function InsightsDetails({
  insights,
  isAvailableSolution,
  isMobile = false,
}: {
  insights: TopicAnalyses[];
  isAvailableSolution: boolean;
  isMobile?: boolean;
}) {
    
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
    var res = await AnalyseService.createSolution(id);
    if (res.status === 201) window.location.reload();
    else updateLoading();
  };
  return (
    <div
    
      className={` text-black border-medium border-black/10 ${
        isMobile ? "w-full max-h-[39rem]" : "w-1/2 max-h-[460px]"
      }  rounded-2xl relative p-4 flex flex-col animate-fade-up`}
      style={{ animationDelay: "0.35s"}}
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
}
