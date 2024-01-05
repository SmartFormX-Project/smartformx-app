"use client";
import React from "react";
import { FiAlertCircle } from "react-icons/fi";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  UseDisclosureProps,
} from "@nextui-org/react";
import PaymentService from "@/app/(backend)/services/PaymentService";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

export default function ModalPaymentIssue({
  isOpen,
  onOpen,
  onChange,
}: UseDisclosureProps) {
  const { data } = useSession();

  const goToPortal = async () => {
    const uid = data?.user?.id;
    if (uid) {
      const { data, status } = await PaymentService.goToStripeCustomerPortal(
        uid
      );
      window.location.assign(data);
    }
    console.log("user id not provide, problably you arent logged in");
  };
  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onChange}
      radius="lg"
      isDismissable={false}
      hideCloseButton
      classNames={{
        body: "py-6",
        // backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
        // base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
        // header: "border-b-[1px] border-[#292f46]",
        // footer: "border-t-[1px] border-[#292f46]",
        // closeButton: "hover:bg-white/5 active:bg-white/10",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
            Houve um problema com seu pagamento
            </ModalHeader>
            <ModalBody className="flex flex-col justify-center items-center text-justify">
              <div className="bg-[#ED1313] bg-opacity-10 w-fit rounded-full p-2">
                <FiAlertCircle color={"#ED1313"} size={100} />
              </div>
              <p className="text-sm mt-2">
                A cobrança recente do seu método de pagamento não foi
                bem-sucedida. Verifique suas informações ou forneça um novo
                método de pagamento para evitar a suspensão dos serviços.
              </p>
              <p className="text-center text-sm mt-2">
                Clique em &apos;Atualizar pagamento&apos; para resolver este
                problema
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={goToPortal} fullWidth>
                Atualizar pagamento
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
