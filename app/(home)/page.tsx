"use client";
import Link from "next/link";
import InsightModal from "./widgets/CreateFormModal";

import { Button } from "@nextui-org/button";
import { Form } from "@/types/interfaces";
import { formatDistance } from "date-fns";
import { getStatusString } from "@/types/variables";
import Image from "next/image";

import { rocket3d } from "@/assets";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { useEffect, useState } from "react";
import ModalPaymentIssue from "@/components/ModalPaymentIssue";
import { useDisclosure } from "@nextui-org/react";
import FormsService from "../api/repository/FormService";
import UserService from "../api/repository/UserServices";
import {  AppFetchJSON } from "../api/repository/fetch";
import UpdatePlanModal from "@/components/UpdatePlanModal";

export default function HomePage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const UpdatePlanDisclosure = useDisclosure();
  
  const [isMobile, setMobileMode] = useState<boolean>(false);
  var session = useSession();

  const { data, isLoading, error } = useSWR(
    FormsService.FetchAllFormsURL(),
    AppFetchJSON,
    { shouldRetryOnError: false }
  );

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const user = session.data?.user;

    if (window) {
      setMobileMode(window.matchMedia("(max-width: 600px)").matches);
    }

    if (
      user &&
      user.subscribeStatus != "trialing" &&
      user.subscribeStatus != "active"
    ) {
      onOpen();
    }

    (async function () {
      if (session.status == "authenticated" && query.get("up")) {
        if (query.get("up")) {
          const { data } = await UserService.getUserById();

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
  }, [onOpen, session]);

  return (
    <div className="w-full h-full flex flex-col justify-around overflow-x-hidden z-0 pt-6">
     
      <FormListComponent loading={isLoading} data={data} />
      {session.status != "loading" && <InsightModal isRedirectSubmit={data.length > 0} redirectSubmit={UpdatePlanDisclosure.onOpen}/>}

      {isMobile && <div></div>}
      <ModalPaymentIssue
        isOpen={isOpen}
        onChange={onOpenChange}
        onOpen={onOpen}
      />
      <UpdatePlanModal
      hitLimit
        isOpen={UpdatePlanDisclosure.isOpen}
        onOpenChange={UpdatePlanDisclosure.onOpenChange}
      />
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
  else if (data && data.length > 0)
    return (
      <>
        <h1 className="text-black text-3xl font-light animate-fade-up ">
          Ultimos Formulários
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
