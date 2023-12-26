"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useVariants from "./hooks/useVariants";
import { FieldValues, UseFormRegister, useForm } from "react-hook-form";
import { Input } from "@nextui-org/input";
import { FiEye, FiEyeOff } from "react-icons/fi";

type formDataProps = {
  status: string;
  values: any;
  register: UseFormRegister<FieldValues>;
  isValid: boolean;
  isSubmitted: boolean;
};

const PersonalInfo = ({ status, values, register, isValid, isSubmitted }: formDataProps) => {
  const { variants } = useVariants({ status });

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

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
      <h1 className="mb-2 text-[26px] font-bold ">Suas informações</h1>
      <p className="mb-6 text-lg text-foreground-400">
        Por favor, forneça seu nome, endereço de e-mail e uma senha.
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
            placeholder="ex. Rodrigo Vieira"
            isRequired
            {...register("user.name")}
          />
 
          <Input
            classNames={{
              label: "font-medium  text-md",
            }}
            size="lg"
            labelPlacement="outside"
            label="E-mail"
            radius="sm"
            placeholder="ex. rodrigovieira@email.com"
            {...register("user.email", {
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
            })}
            isInvalid={!isValid && isSubmitted}
            errorMessage={!isValid && isSubmitted && "Digite um email válido"}
            isRequired
          />
     
          <Input
            classNames={{
              label: "font-medium  text-md",
            }}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <FiEyeOff className="text-default-400 pointer-events-none" />
                ) : (
                  <FiEye className="text-default-400 pointer-events-none" />
                )}
              </button>
            }
            size="lg"
            labelPlacement="outside"
            label="Senha"
            radius="sm"
            type={isVisible ? "text" : "password"}
            placeholder="*************"
            isRequired
            {...register("user.password")}
          />
  
      </div>
    </motion.div>
  );
};

export default PersonalInfo;
