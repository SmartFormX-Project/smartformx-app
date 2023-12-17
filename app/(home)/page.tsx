
"use client";
import Header from "@/components/Header";

import Link from "next/link";
import InsightModal from "./widgets/CreateFormModal";

import { Button } from "@nextui-org/button";
import AnalyseService from "../(backend)/services/SmartFormService";
import { Form } from "@/types/interfaces";
import { formatDistance } from "date-fns";
import { getStatusString } from "@/types/variables";
import Image from "next/image";

import { rocket3d } from "@/assets";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import UserService from "../(backend)/services/UserServices";
import { useEffect } from "react";

const fetcher = (arg: any, ...args: any) =>
  fetch(arg, ...args).then((res) => res.json());

export default function HomePage() {
  var session = useSession();

  // var response = await AnalyseService.getForms(data?.user?.businessId ?? "");
  // var forms: Form[] = response.data;

  const { data, isLoading, error } = useSWR(
    AnalyseService.URL_GET_FORMS + session.data?.user?.businessId,
    fetcher,
    { shouldRetryOnError: false }
  );

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const user = session.data?.user;

    (async function () {
      if (session.status == "authenticated" && query.get("up")) {
        if (query.get("up")) {
          const { data } = await UserService.getUserById(user?.id!);

          if (data) {
            const { name } = data.metadata;

            await session.update({
              plan: name,
              subscribeStatus: data.subscribeStatus,
            });

            location.replace("/");
          }
        }
      }
    })();
  }, [session]);

  return (
    <div className="w-full h-full flex flex-col justify-between overflow-x-hidden">
      <Header
        busId={session.data?.user?.businessId ?? ""}
        name={session.data?.user?.name ?? ""}
        userId={session.data?.user?.id ?? ""}
      />

      <FormListComponent loading={isLoading} data={data} />
      {/* {data ? (
        <>
          <h1 className="text-black text-3xl font-light animate-fade-up ">
            Ultimos insights
          </h1>

          <ol className={`sm:flex sm:overflow-x-auto  w-full `}>
            {(data as Form[]).map((e, i) => {
              return <CardForm key={i} e={e} i={i} />;
            })}
          </ol>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center animate-fade-up">
          <Image src={rocket3d} alt="Rocket" width={300} height={300} />

          <h1 className="font-bold text-6xl text-black text-center mt-4">
            Crie seu primeiro smartform
          </h1>
        </div>
      )} */}

      <InsightModal />
    </div>
  );
}

const FormListComponent = ({
  data,
  loading,
}: {
  loading: boolean;
  data?: Form[];
}) => {
  if (loading)
    return (
      <div className="text-black">
        <div className="fixed top-0 right-0 h-screen w-screen z-50 flex flex-col justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-400"></div>
        </div>
      </div>
    );
  else if (data)
    return (
      <>
        <h1 className="text-black text-3xl font-light animate-fade-up ">
          Ultimos insights
        </h1>

        <ol className={`sm:flex sm:overflow-x-auto  w-full `}>
          {data.map((e, i) => {
            return <CardForm key={i} e={e} i={i} />;
          })}
        </ol>
      </>
    );

  return (
    <div className="flex flex-col justify-center items-center animate-fade-up">
      <Image src={rocket3d} alt="Rocket" width={300} height={300} />

      <h1 className="font-bold text-6xl text-black text-center mt-4">
        Crie seu primeiro smartform
      </h1>
    </div>
  );
};
const CardForm = ({ e, i }: any) => {
  return (
    <li
      className="sm:mb-0 w-[350px] flex-shrink-0 animate-fade-up antialiased"
      style={{ animationDelay: `0.${15 * i}s` }}
    >
      <div className="flex items-center mt-5">
        {i == 0 ? (
          <div className="pulse-center">
            <div className="pulse-circle pulse"></div>
          </div>
        ) : (
          <div className="z-10 flex items-center justify-center w-4 h-4 bg-slate-300 rounded-full ring-0  ring-gray-900 shrink-0"></div>
        )}
        <div className="hidden sm:flex w-full h-0.5 bg-slate-300"></div>
      </div>
      <span className="flex mt-2 text-sm uppercase ml-1  text-foreground-500 w-full ">
        {e.category}
      </span>
      <div className="flex flex-col justify-between mt-2 sm:mr-8 border-medium rounded-xl p-4 sm:h-[400px] bg-transparent transition-colors hover:border-black">
        <div className="">
          <h3 className="text-lg font-semibold text-black ">{e.title}</h3>
          <p className="text-base font-normal text-foreground-500">
            {e.description != "" ? e.description : "Sem descrição"}
          </p>

          <p className="mt-4 text-sm font-normal text-blue-500 px-2 py-1 bg-blue-100 w-fit rounded-lg">
            {getStatusString(e.status)}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              {formatDistance(new Date(e.createdAt), new Date(), {
                addSuffix: true,
              })}
            </time>
          </div>
          <Link href={"/" + e.id}>
            <Button type="button" size="sm" color="default" radius="full">
              Abrir
            </Button>
          </Link>
        </div>
      </div>
    </li>
  );
};
