"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Select, SelectItem , Input, Textarea
} from "@nextui-org/react";
import { FiPlus } from "react-icons/fi";

import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import SmartFormService from "@/app/(backend)/services/SmartFormService";

import { general3d, experence3d, quality3d, product3d, lupa3d } from "@/assets";
import Image from "next/image";

export default function InsightModal() {
  const { data } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm();

  const updateLoading = () => setLoading((prev) => !prev);
  const onSubmit = async (body: any, onClose: any) => {
    updateLoading();
    body.businessId = data?.user?.businessId;

    if (!body.businessId) {
      return console.log("no business id");
    }
    const res = await SmartFormService.createForm(body);

    updateLoading();
    if (res.status == 201) {
      onClose();
      reset();
      window.location.reload();
    }
  };
  let isMobile = window.matchMedia("(max-width: 600px)").matches;
  return (
    <>
      <Button
        size="lg"
        color="primary"
        variant="shadow"
        className="mb-10 self-center animate-fade-up "
        style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        startContent={<FiPlus />}
        onClick={onOpen}
      >
        Novo formulário
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="bottom"
        isDismissable={false}
        //  classNames={{footer}}
      >
        <ModalContent>
          {(onClose: any) => (
            <form onSubmit={handleSubmit((data) => onSubmit(data, onClose))}>
              <ModalHeader className="flex flex-col gap-1">
                SmartForm
              </ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  label="Titulo"
                  placeholder="Digite um titulo para o form."
                  isRequired
                  labelPlacement="outside"
                  {...register("title")}
                  readOnly={loading}
                />
                <Textarea
                  label="Description"
                  placeholder="Digite uma descrição"
                  labelPlacement="outside"
                  {...register("description")}
                  readOnly={loading}
                ></Textarea>

                <CustomSelect register={register} readOnly={loading} />
              </ModalBody>
              <ModalFooter className={isMobile?"justify-start":"justify-end"}>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button type="submit" color="primary" isLoading={loading}>
                  Criar form
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

interface FeedbackForms {
  id: number;
  name: string;
  value: string;
  description: string;
  icon: string;
}
const CustomSelect = ({ register, readonly = false }: any) => {
  const users: FeedbackForms[] = [
    {
      id: 1,
      name: "Feedback Geral",
      value: "general",
      description: "Coletar respostas variadas",
      icon: lupa3d,
    },
    {
      id: 2,
      name: "Feedback de Qualidade",
      value: "quality",
      description: "Foco na qualidade do negócio(estrutura, atendimento...)",
      icon: quality3d,
    },
    {
      id: 3,
      name: "Feedback de Atendimento",
      value: "customer_service",
      description: "Foco no atendimento ao cliente",
      icon: general3d,
    },
    {
      id: 4,
      name: "Feedback de Experiência",
      value: "experence",
      description: "Foco na experiência do cliente com seu negócio",
      icon: experence3d,
    },
    {
      id: 5,
      name: "Feedback de Produto",
      value: "product",
      description: "Coletar resposta sobre seus produtos",
      icon: product3d,
    },
  ];

  return (
    <Select
      disabled={readonly}
      isRequired
      label="Qual formulario deseja usar?"
      labelPlacement="outside"
      radius="lg"
      placeholder="Selecione um"
      items={users}
      variant="bordered"
      {...register("type")}
      classNames={{
        mainWrapper: "mt-5",
        trigger: "min-h-unit-16",
        listboxWrapper: "max-h-[400px]",
      }}
      listboxProps={{
        itemClasses: {
          base: [
            "rounded-md",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "data-[hover=true]:bg-default-100",
            "dark:data-[hover=true]:bg-default-50",
            "data-[selectable=true]:focus:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
        },
      }}
      popoverProps={{
        classNames: {
          base: "p-0 border-small border-divider bg-background",
          arrow: "bg-default-200",
        },
      }}
      renderValue={(items) => {
        return items.map((item, i) => {
          var data = item.data as FeedbackForms;
          return (
            <div key={item.key} className="flex items-center gap-2">
              {/* <Avatar
                alt={data.name}
                className="flex-shrink-0 bg-transparent"
                size="sm"
                src={data?.icon}

              /> */}
              <Image
                src={data.icon}
                alt=""
                className="flex-shrink-0 bg-transparent w-7"
              />
              <div className="flex flex-col">
                <span>{data.name}</span>
                <span className="text-default-500 text-tiny">
                  ({data.description})
                </span>
              </div>
            </div>
          );
        });
      }}
    >
      {(user: any) => (
        <SelectItem key={user.value} textValue={user.name}>
          <div className="flex gap-2 items-center">
            {/* <Avatar
              alt={user.name}
              className="flex-shrink-0  bg-transparent"
              size="sm"
              src={user.icon}
            /> */}
            <Image
              src={user.icon}
              alt=""
              className="flex-shrink-0 bg-transparent w-7"
            />
            <div className="flex flex-col">
              <span className="text-small">{user.name}</span>
              <span className="text-tiny text-default-400">
                {user.description}
              </span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
};
