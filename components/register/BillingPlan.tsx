"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import useVariants from "./hooks/useVariants";
import { FieldValues, UseFormRegister } from "react-hook-form";

import {
  RadioGroup,
  Tab,
  Tabs,
  Tooltip,
  VisuallyHidden,
  cn,
  useRadio,
} from "@nextui-org/react";
import PaymentService from "@/app/api/repository/PaymentService";
import useSWR from "swr";
import { FiCheck } from "react-icons/fi";

type updateWithBilling = {
  status: string;
  register: UseFormRegister<FieldValues>;
  setValue: any;
  value: any;
};

const fetcher = (arg: any, ...args: any) =>
  fetch(arg, ...args).then((res) => res.json());
  
const BillingPlan = ({
  status,
  register,
  setValue,
  value,
}: updateWithBilling) => {
  const { variants } = useVariants({ status });

  const [recurring, setRecurring] = useState("semester");
  const { data, isLoading } = useSWR(PaymentService.GetPlansURL(), fetcher);

  if (data) {
    const { discount } = data.products[1].metadata;

    var price = getPrice(
      data.products[1].id,
      recurring == "semester" ? 6 : 1,
      data.prices,
      discount
    );
    setValue("subscription", {
      ...price,
      recurring: recurring == "semester" ? 6 : 1,
      plan: data.products[1].name,
      metadata: data.products[1].metadata,
      features: data.products[1].features,
    });
  }
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h1 className="mb-2 text-[26px] font-bold">Selecione o melhor plano</h1>
      <p className="mb-6 text-lg text-foreground-400">
        Você tem a opção de faturamento semestral e anual.
      </p>
      <div className="flex justify-end w-full">
        <Tabs
          className=""
          size="sm"
          color="primary"
          aria-label="Tabs colors"
          radius="full"
          defaultSelectedKey={"semester"}
          onSelectionChange={(e) => setRecurring(e as string)}
        >
          <Tab key="monthly" title="Mensal" />
          <Tab key="semester" title="6 meses" />
        </Tabs>
      </div>
      <PlansComponent
        data={data}
        isLoading={isLoading}
        recurring={recurring}
        setValue={setValue}
      />
    </motion.div>
  );
  // }
};

const PlansComponent = ({
  data,
  isLoading,
  recurring,
  setValue,
}: {
  data: any;
  isLoading: boolean;
  recurring: string;
  setValue: any;
}) => {
  if (isLoading) {
    return (
      <div className="w-full mt-2 space-y-3 animate-pulse">
        {[0, 1, 2].map((e, i) => (
          <div
            key={i}
            className="flex space-x-5 border-2 border-default rounded-lg p-4 justify-center items-center"
          >
            <div className="w-3/4 space-y-2 flex flex-col">
              <span className="h-6 bg-gray-700 w-28"></span>
              <span className="h-7 bg-gray-700"></span>
            </div>
            <div className="h-6 w-1/6 bg-gray-700"></div>
          </div>
        ))}
      </div>
    );
  } else if (data) {
    return (
      <RadioGroup
        color="primary"
        defaultValue={data.products[1].id}
        className="w-full mt-2 "
      >
        {(data.products as []).reverse().map((plan: any, i) => {
          var price = getPrice(
            plan.id,
            recurring == "semester" ? 6 : 1,
            data.prices,
            plan.metadata.discount
          );

          var dataValue = {
            ...price,
            recurring: recurring == "semester" ? 6 : 1,
            plan: plan.name,
            metadata: plan.metadata,
            features: plan.features,
          };

          return (
            <Tooltip
              key={"tp" + i}
              closeDelay={0}
              content={
                <ul className="cursor-default">
                  {(plan.features as []).map((e: any, i) => (
                    <li
                      key={i}
                      className="flex items-center space-x-2 text-foreground-500"
                    >
                      <FiCheck />
                      <span>{e.name}</span>
                    </li>
                  ))}
                </ul>
              }
              className="capitalize"
              placement="bottom"
            >
              <div>
                <CustomRadio
                  key={i}
                  onClick={() => {
                    setValue("subscription", dataValue);
                  }}
                  cost={price.monthly}
                  description={plan.description}
                  value={plan.id}
                >
                  {plan.name}
                </CustomRadio>
              </div>
            </Tooltip>
          );
        })}
      </RadioGroup>
    );
  }
  return <h1 className="text-xl">Planos inválidos</h1>;
};

const CustomRadio = (props: any) => {
  const {
    Component,
    children,
    isSelected,
    description,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
  } = useRadio(props);
  return (
    <Component
      {...getBaseProps()}
      className={cn(
        "w-full group flex items-center flex-row relative tap-highlight-transparent",
        "max-h-[500px] cursor-pointer border-2 border-default rounded-lg gap-1 px-2.5 py-5",
        "data-[selected=true]:border-primary"
      )}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <span {...getWrapperProps()}>
        <span {...getControlProps()} />
      </span>
      <div {...getLabelWrapperProps()}>
        {children && (
          <span {...getLabelProps()} className="font-bold uppercase">
            {children}
          </span>
        )}
        {description && (
          <span className="text-xs text-foreground-400">{description}</span>
        )}
      </div>
      <div className="font-bold text-sm ml-auto min-w-[75px]">
        {props.cost} <span className="text-xs text-foreground-300">/mês</span>
      </div>
    </Component>
  );
};

function getPrice(
  pid: string,
  recurring: 1 | 6,
  data: any[],
  discountRecurring: string = ""
) {
  var prices = data.filter((e) => e.product == pid);
  var priceObj = prices.filter(
    (p) => p.recurring.interval_count == recurring
  )[0];
  let price = priceObj.unit_amount / 100;

  let format = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return {
    id: priceObj.id,
    value: format.format(price),
    monthly: format.format(
      (price / recurring) *
        (recurring == 1 ? 1 : 1 - parseFloat(discountRecurring))
    ),
  };
}
export default BillingPlan;
