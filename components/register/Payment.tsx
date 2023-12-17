"use client";
import { useEffect, useState } from "react";
// import { Label } from "./ui/label";
// import { Checkbox } from "./ui/checkbox";
import { motion } from "framer-motion";
import useVariants from "./hooks/useVariants";
import { FormItems } from "@/types";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { Input } from "@nextui-org/input";
import { Radio, RadioGroup } from "@nextui-org/react";
import { FaPix } from "react-icons/fa6";
import { Button } from "@nextui-org/button";

type updateWithAddons = {
  updateForm: (updateField: Partial<FormItems>) => void;
  status: string;
  register: UseFormRegister<FieldValues>;
};

const Payment = ({ status, updateForm, register }: updateWithAddons) => {
  const { variants } = useVariants({ status });
  const [selected, setSelected] = useState("credit");
  const handleCheckChange = (id: number, checked: boolean) => {
    // const updateAddons = addOns.map((addon) => {
    //   if (addon.id === id) {
    //     return { ...addon, checked };
    //   } else {
    //     return addon;
    //   }
    // });
    // updateForm({ addOns: updateAddons });
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h1 className="mb-4 text-[26px] font-bold ">
        Escolha a melhor forma de pagar
      </h1>
      {/* <p className="mb-3 text-lg text-foreground-400">
        Add-ons help enhance your gaming experience.
      </p> */}
      <div>
        <RadioGroup
          label="Forma de pagamento"
          orientation="horizontal"
          className="space-x-4 mb-4"
          defaultValue={"credit"}
        >
          <Radio value="credit">Cartão de crédito</Radio>
          {/* <Radio value="pix">Pix</Radio> */}
        </RadioGroup>

        {selected == "credit" ? (
          <div className="space-y-4">
            <Input
              classNames={{
                label: "font-medium text-md",
                input:
                  "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
              }}
              size="lg"
              labelPlacement="outside"
              label="Numero do cartão"
              type="number"
              radius="sm"
              placeholder="ex. Rodrigo Vieira"
              isRequired
              {...register("card_number")}
            />
            <Input
              classNames={{
                label: "font-medium text-md",
              }}
              size="lg"
              labelPlacement="outside"
              label="Nome do titular"
              radius="sm"
              placeholder="ex. Rodrigo Vieira"
              isRequired
              {...register("card_name")}
            />
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <Input
                classNames={{
                  label: "font-medium text-md",
                  input:
                    "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                }}
                size="lg"
                labelPlacement="outside"
                label="Data de exp."
                radius="sm"
                placeholder="ex. 02/30"
                type="number"
                isRequired
                {...register("card_exp")}
              />
              <Input
                classNames={{
                  label: "font-medium text-md",
                  input:
                    "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                }}
                size="lg"
                labelPlacement="outside"
                label="CVV"
                radius="sm"
                type="number"
                placeholder="ex. 000"
                isRequired
                {...register("card_cvv")}
              />
            </div>
            <Input
              classNames={{
                label: "font-medium text-md",
                input:
                  "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
              }}
              size="lg"
              labelPlacement="outside"
              label="Documento"
              radius="sm"
              type="number"
              placeholder="ex. CPF,RG..."
              isRequired
              {...register("document")}
            />
          </div>
        ) : (
          <div>
            <FaPix size={200} color="#4bb8aa" />
            <h1 className="text-xl font-bold mb-4">
              Emitir guia de pagamento pix
            </h1>

            <Button>Gerar pix</Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Payment;
