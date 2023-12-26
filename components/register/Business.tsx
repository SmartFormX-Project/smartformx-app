"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import useVariants from "./hooks/useVariants";
import { FieldValues, UseFormRegister } from "react-hook-form";
// import { Input, Textarea } from "@nextui-org/input";
// import { Select, SelectItem } from "@nextui-org/select";
import { Select, SelectItem, Input, Textarea } from "@nextui-org/react";

type formDataProps = {
  status: string;
  register: UseFormRegister<FieldValues>;
};

const BusinessInfo = ({ status, register }: formDataProps) => {
  const { variants } = useVariants({ status });

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <motion.div
      variants={variants}
      custom={status}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h1 className="mb-2 text-[26px] font-bold text-white ">Negócio</h1>
      <p className="mb-6 text-lg  text-foreground-400">
        Por favor, forneça informações do seu negócio.
      </p>
      <div className="flex flex-col gap-4">
        <Input
          classNames={{
            label: "font-medium text-md",
          }}
          size="lg"
          labelPlacement="outside"
          label="Nome"
          radius="sm"
          placeholder="ex. Rodrigo Viagens"
          isRequired
          {...register("business.name")}
        />

        <Input
          classNames={{
            label: "font-medium text-md",
          }}
          size="lg"
          labelPlacement="outside"
          label="Categoria"
          radius="sm"
          placeholder="ex. Rodrigo Viagens"
          isRequired
          {...register("business.category")}
        />

        <Select
          radius="sm"
          classNames={{
            label: "font-medium text-md text-white",
          }}
          size="lg"
          label="Quantidade de clientes"
          placeholder="Selecione um intervalo"
          className="max-w-xs"
          labelPlacement="outside"
          {...register("business.clients")}
          isRequired
        >
          {["1-100", "101-1000", "10001-10k", "+10k"].map((item: any) => (
            <SelectItem key={item}>{item}</SelectItem>
          ))}
        </Select>

        <Textarea
          classNames={{
            label: "font-medium text-md",
          }}
          fullWidth
          label="Nos conte mais sobre seu negócio"
          labelPlacement="outside"
          placeholder="Descreva..."
          radius="sm"
          maxRows={4}
          maxLength={300}
          minRows={4}
          isRequired
          description="300 caracteres"
          {...register("business.description")}
        />
      </div>
    </motion.div>
  );
};

export default BusinessInfo;
