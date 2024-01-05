"use client";

import businessService from "@/app/(backend)/services/BussinessService";
import PaymentService from "@/app/(backend)/services/PaymentService";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { FiCheck } from "react-icons/fi";
import useSWR from "swr";
const fetcher = (arg: any, ...args: any) =>
  fetch(arg, ...args).then((res) => res.json());
export default function ProfileModal({
  isOpen,
  onOpenChange,
  busId,
  userName,
}: {
  isOpen: boolean;
  busId: string;
  userName: string;
  onOpenChange: () => void;
}) {
  const session = useSession();
  const { data, isLoading, error } = useSWR(
    businessService.URL_FETCH_BUSINESS + busId,
    fetcher
  );

  const goToPortal = async () => {
    const uid = session.data?.user?.id;
    if (uid) {
      const { data, status } = await PaymentService.goToStripeCustomerPortal(
        uid
      );
      window.location.assign(data);
    }
    console.log("user id not provide, problably you arent logged in");
  };


  if (isLoading)
    return (
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="bottom-center"
        isDismissable={false}
        className="animate-pulse flex space-x-4"
        classNames={{
          closeButton: "text-white"
        }}
      >
        <ModalHeader className="p-2 h-52" >
          <div className="bg-blue-500 w-full h-28 rounded-md" />
          <div className="flex flex-col justify-center items-center text-center absolute top-16 left-0 right-0">
            <div className="bg-slate-700 flex uppercase items-center justify-center rounded-2xl border-8 border-[#18181B] w-[100px] h-[100px]">
              {/* {placeName.split(" ").map((e) => e[0])} */}
            </div>
            <h2 className="text-xl font-bold mt-2 bg-slate-700 h-10 w-10"></h2>
          </div>
        </ModalHeader>
        <ModalBody className="mb-6">
          <div className="bg-slate-700 h-52 w-full rounded-lg mt-4"></div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-bold">Nome do negócio</h4>
              <p className="bg-slate-700 h-10 w-8"></p>
            </div>
            <div>
              <h4 className="font-bold ">Categoria</h4>
              <p className="bg-slate-700 h-10 w-8"></p>
            </div>
            <div>
              <h4 className="font-bold">Clientes</h4>
              <p className="bg-slate-700 h-10 w-8"></p>
            </div>
          </div>
          <div>
            <h4 className="font-bold">Descrição</h4>
            <p className="bg-slate-700 h-14 w-10"></p>
          </div>
        </ModalBody>

      </Modal>
    );
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="bottom-center"
      isDismissable={false}
      size="lg"
    >
      <ModalContent>
        {(onClose: any) => (
          <>
            <ModalHeader className="p-2 h-52">
              <div className="bg-blue-500 w-full h-28 rounded-md" />
              <div className="flex flex-col justify-center items-center text-center absolute top-16 left-0 right-0">
                <div className="flex uppercase items-center justify-center bg-white text-black font-bold text-4xl rounded-2xl border-8 border-[#18181B] px-4  h-[100px]">
                  {data.name.split(" ").map((e: any) => e[0])}
                </div>
                <h2 className="text-xl font-bold mt-2">{userName}</h2>
              </div>
            </ModalHeader>
            <ModalBody>
              <CardPlan
                description={session.data?.user?.subscribeStatus!}
                name={session.data?.user?.plan ?? ""}
                onChangeSubmit={goToPortal}
              />
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold">Nome do negócio</h4>
                  <p>{data.name}</p>
                </div>
                <div>
                  <h4 className="font-bold">Categoria</h4>
                  <p>{data.category}</p>
                </div>
                <div>
                  <h4 className="font-bold">Clientes</h4>
                  <p>˜{data.clients}</p>
                </div>
              </div>
              <div>
                <h4 className="font-bold">Descrição</h4>
                <p>{data.description}</p>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

const CardPlan = ({
  name,
  description,
  onChangeSubmit,
}: {
  name: string;
  description: string;
  onChangeSubmit: () => void;
}) => {
  return (
    <div className="flex flex-col justify-between p-1 bg-gradient-to-r from-[#9400D3] to-[#4B0082] rounded-lg mt-4">
      <div className="flex flex-col bg-[#18181B] justify-between h-full w-full p-4 rounded-md">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="font-bold text-xl uppercase text-white">{name}</h1>
            <div className="flex opacity-50">
              {/* <FiCheck /> */}
              <span className="text-sm text-white font-medium ml-1">
                {getStatusPlanName(description)}
              </span>
            </div>
          </div>
          <Button
            className="bg-white text-[#18181B] font-medium"
            radius="sm"
            variant="flat"
            onClick={onChangeSubmit}
            size="sm"
          >
            Alterar
          </Button>
        </div>
      </div>
    </div>
  );
};

function formatDate(isoDateTime: string) {
  const dateTime = new Date(isoDateTime);

  const day = dateTime.getDate();
  const month = dateTime.getMonth() + 1; // Note: Months are zero-based
  const year = dateTime.getFullYear();

  return `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year}`;
}

function getStatusPlanName(name: string) {
  switch (name) {
    case "trialing":
      return "Período de avaliação";
    case "active":
      return "Ativo";


    default:
      return "Pausado";
  }
}
