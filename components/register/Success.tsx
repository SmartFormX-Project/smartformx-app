"use client";
import React from "react";
import Image from "next/image";
import { GotoProp } from "@/types";
import { motion } from "framer-motion";

import { FiArrowRight } from "react-icons/fi";
import { Button } from "@nextui-org/button";

import { thankyou } from "@/assets";
const Success = ({ gotoForm }: GotoProp) => {
  const successVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "backIn",
        duration: 0.6,
      },
    },
  };

  return (
    <motion.section
      variants={successVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center text-center md:mx-auto md:h-full md:max-w-[450px] md:justify-center"
    >
      <Image
        src={thankyou}
        alt="success"
        width={60}
        height={60}
        className="mb-5"
      />
      <h1 className="mb-2 text-2xl font-semibold text-white">
        Seja bem-vindo!
      </h1>
      <p className="mb-10 text-foreground-500">
        Aproveite nossa plataforma ao máximo! Para suporte, clique no seu avatar
        e selecione &quot;Precisa de ajuda?&quot;. Estamos aqui para tornar sua
        experiência ainda melhor.
      </p>

      <Button
        onClick={() => window.location.replace("/")}
        variant="bordered"
        endContent={<FiArrowRight />}
      >
        Ir para o dashboard
      </Button>
    </motion.section>
  );
};

export default Success;
