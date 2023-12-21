"use client";
import React from "react";
import { motion } from "framer-motion";
import useVariants from "./hooks/useVariants";

import { FiCheck } from "react-icons/fi";

type reviewBillingProps = {
  planSelected: any;
  status: string;
};

const Review = ({ status, planSelected }: reviewBillingProps) => {
  const { variants } = useVariants({ status });

  const semesterRecurring = planSelected.recurring == "semester";
  console.log(planSelected);
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {" "}
      <h1 className="mb-2 text-[26px] font-bold  ">Confirmando</h1>
      <p className="mb-6 text-lg text-foreground-400">
        Verifique se tudo está bem antes de confirmar
      </p>
      <div className="mb-4 rounded-lg  py-3">
        <div
          className={`mb-3 flex items-center justify-between border-b border-white/20 pb-3`}
        >
          <div>
            <p className="font-semibold capitalize ">{`${planSelected.plan} (${
              semesterRecurring ? "Semestral" : "Mensal"
            })`}</p>
            <ul>
              {(planSelected.features as []).map((e: any, i) => (
                <li key={i} className="flex items-center text-foreground-300">
                  <FiCheck className="mr-2" />
                  {e.name}
                </li>
              ))}
            </ul>
          </div>
          <span className="font-semibold text-sm text-green-400">
            *{planSelected.monthly}{" "}
            /mês
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between px-3">
        <p className="capitalize text-cool-gray">
          Total ({semesterRecurring ? "a cada 6 meses" : "a cada mês"}){" "}
        </p>
        <span className="font-medium text-green-500">
          {planSelected.value}
          {/* {semesterRecurring ? "/semestral" : "/mensal"} */}
        </span>
      </div>
    </motion.div>
  );
};

export default Review;
