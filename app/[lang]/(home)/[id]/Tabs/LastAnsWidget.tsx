"use client";
import FormsService from "@/app/api/repository/FormService";
import { AppFetchJSON } from "@/app/api/repository/fetch";
import { emp_ans } from "@/assets";
import { Form } from "@/types/interfaces";
import { formatDistance } from "date-fns";
import { enUS, ptBR } from "date-fns/locale";
import { Check } from "lucide-react";
import Image from "next/image";
import useSWR from "swr";

export default function LastAnswersWidget({ form,t,lng }: { form: Form,t:any, lng:string }) {
  const { data, isLoading } = useSWR(
    FormsService.FetchFormAnsURL(form.id),
    AppFetchJSON
  );
  var dt = data ? data.response as []: [];
  if (dt.length==0) return <EmptyState />;

  if (isLoading) return <span>Carregando...</span>;
  if (data) {
    const ans = dt;

    return (
      <div className="flex flex-col mt-4 space-y-3 px-6 max-h-[77dvh] overflow-y-auto overflow-scroll">
        {ans.map((an: any, i) => {
          return (
            <Card
              key={i}
              email=""
              name={"#" + (an.name == "" ? an.referenceCode : an.name)}
              time={formatDistance(an.createdAt, new Date(), {
                addSuffix: true,
                locale: lng == "en" ? enUS : ptBR,
              })}
            />
          );
        })}
      </div>
    );
  }
}

const Card = ({
  name,
  email,
  time,
}: {
  name: string;
  email: string;
  time: string;
}) => {
  return (
    <div className="flex items-center cursor-pointer hover:opacity-70 transition-all">
      <div className="rounded-lg mr-4 text-white bg-[#48BA7F] leading-none text-center py-1 px-1">
        <Check size={30} />
      </div>
      <div>
        <h2 className="font-semibold">{name}</h2>
        <span className="font-normal text-sm">{email}</span>
      </div>
      <span className="font-normal text-base text-black/40 ml-auto">
        {time}
      </span>
    </div>
  );
};

const EmptyState = () => {
  return (
    <div className="w-full flex flex-col items-center mt-4">
      <Image alt="" src={emp_ans} />
      <h2 className="mt-6 font-semibold text-xl">
        Nenhuma resposta adicionada
      </h2>
      <span className="mt-2 text-foreground-400">
        Compartilhe seu formulário para obter respostas!
      </span>
    </div>
  );
};
