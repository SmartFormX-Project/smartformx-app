"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { MdOutlineAlternateEmail } from "react-icons/md";
import { Button } from "@nextui-org/button";
const ConfirmEmail = () => {
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
      {/* <Image
        src={"/assets/images/icon-thank-you.svg"}
        alt="success"
        width={60}
        height={60}
        className="mb-5"
      /> */}
      <MdOutlineAlternateEmail width={60} height={60} className="mb-5"/>
      <h1 className="mb-2 text-2xl font-semibold text-white">
        Verifique sua caixa de entrada
      </h1>
      <p className=" mb-10 text-foreground-500">
        Obrigado por confirmar sua assinatura! Esperamos que você se divirta
        usando nosso plataforma, se precisar de suporte, sinta-se à vontade para
        nos enviar um e-mail <span>contato.smartforms@gmail.com</span>
      </p>
      {/* <button
        className="flex items-center rounded border border-purplish-blue px-3 py-2 font-medium text-purplish-blue"
        onClick={() => window.location.replace("/home")}
      >
        <span className="mr-4">Ir para o dashboard</span>
        <FiArrowRight />
      </button> */}
      {/* <Button
        onClick={() => window.location.replace("/home")}
        variant="bordered"
        endContent={<FiArrowRight />}
      >
        Ir para o dashboard
      </Button> */}
    </motion.section>
  );
};

export default ConfirmEmail;
