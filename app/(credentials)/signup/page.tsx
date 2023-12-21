"use client";

import Sidebar from "@/components/register/Sidebar";
import PersonalInfo from "@/components/register/PersonalInfo";
import BillingPlan from "@/components/register/BillingPlan";
import Review from "@/components/register/Review";
import Success from "@/components/register/Success";

import { useMultistepForm } from "@/components/register/hooks/useMultistepForm";
import { AnimatePresence } from "framer-motion";


import { useForm } from "react-hook-form";
import UserService from "@/app/(backend)/services/UserServices";
import { signIn, signOut, useSession } from "next-auth/react";
import BusinessInfo from "@/components/register/Business";
import { Button } from "@nextui-org/button";
import { FiArrowRight, FiUser } from "react-icons/fi";
import { useEffect, useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import PaymentService from "@/app/(backend)/services/PaymentService";

import { Avatar } from "@nextui-org/avatar";
import { Chip } from "@nextui-org/chip";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { PiSignOut } from "react-icons/pi";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function SignUp() {
  const steps = {
    personalInfo: 0,
    businessInfo: 1,
    plans: 2,
    reviewPlan: 3,
  };
  const {
    nextStep,
    isLastStep,
    gotoForm,
    isFirstStep,
    isSuccess,
    currentStepIndex,
    setStep,
    setSuccess,
    previousStep,
    status,
  } = useMultistepForm(4);

  const [load, setLoad] = useState(true);
  const [submitload, setSubmitLoad] = useState(false);

  const updateLoad = () => setSubmitLoad((prev) => !prev);
  const session = useSession();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const user = session.data?.user;
    setStep(steps.plans);
    (async function () {
      if (session.status == "authenticated") {
        var subStatus = user?.subscribeStatus ?? "";
        if (query.get("up")) {
          const { data, status } = await UserService.getUserById(user?.id!);

          if (data) {
            const { name } = data.metadata;

            await session.update({
              plan: name,
              subscribeStatus: data.subscribeStatus,
            });

            subStatus = data.subscribeStatus;
            // if (
            //   data.subscribeStatus == "trailing" ||
            //   data.subscribeStatus == "active"
            // )
            //   nextStep();
          }
        }
        if (subStatus == "active" || subStatus == "trialing") {
          setSuccess();
        } else {
          setStep(steps.plans);
        }
      }
    })();
    setLoad(false);
  }, [setSuccess, setStep, session, steps.plans]);

  const {
    handleSubmit,
    formState: { isValid, isSubmitted },
    register,
    getValues,
    setValue,
  } = useForm({ mode: "all" });

  const goToPayment = async () => {
    if (session.data?.user?.email) {
      updateLoad();
      const url = await PaymentService.goToCheckout(
        session.data?.user?.email,
        getValues("subscription").id,
        getValues("subscription").metadata,
        getValues("subscription").recurring
      );
      updateLoad();
      window.location.assign(url.data);
    } else {
      console.log("email not provide by session");
    }
  };

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (currentStepIndex == steps.reviewPlan) {
      await goToPayment();
    }

    var data = getValues();
    if (currentStepIndex == steps.businessInfo) {
      updateLoad();
      var res = await UserService.create({
        ...data,
        provider: "credentials",
        country: "Brazil",
      });

      if (res.status == 201) {
        var user = await signIn("credentials", {
          email: data.user.email,
          password: data.user.password,
          redirect: false,
        });
        if (user?.ok) nextStep();
        else console.log("INCABLE TO LOGIN");
        // setTimeout(() => {}, 5000);
      } else {
        console.log(res.data.type);
      }
      updateLoad();
    } else {
      nextStep();
    }
  };

  return (
    <main className="h-screen md:grid md:place-items-center">
      {load ? (
        <div
          className="min-h-screen w-full overflow-hidden md:mx-auto md:flex md:h-auto md:min-h-[600px] md:min-w-[768px] md:w-[768px] md:max-w-[1024px] md:rounded-2xl md:bg-white/10 md:p-2 lg:w-auto"
          style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
        >
          <div className="text-black">
            <div className="fixed top-0 right-0 h-screen w-screen z-50 flex flex-col justify-center items-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-400"></div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="min-h-screen w-full overflow-hidden md:mx-auto md:flex md:h-auto md:min-h-[600px] md:w-[768px] md:max-w-[1024px] md:rounded-2xl md:bg-white/10 md:p-2 lg:w-auto"
          style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
        >
          <Sidebar currentStepIndex={currentStepIndex} finished={isSuccess} />
          <div className="px-4 pb-10 md:-mt-[0px] md:pb-0">
            {session.status == "authenticated" && !isSuccess && (
              <div className="flex justify-end opacity-50 hover:opacity-70 mt-2">
                <Dropdown>
                  <DropdownTrigger>
                    <Chip
                      variant="flat"
                      color="secondary"
                      size="md"
                      classNames={{
                        base: "cursor-pointer border-small border-white bg-transparent py-2 px-1",
                        content: "text-white font-light px-4",
                      }}
                      avatar={
                        <Avatar
                          size="sm"
                          showFallback
                          classNames={{
                            base: "bg-white",
                            icon: "text-black/80",
                          }}
                          icon={<FiUser />}
                        />
                      }
                    >
                      {session.data?.user?.name}
                    </Chip>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    <DropdownItem
                      color="danger"
                      key="signout"
                      onClick={() => signOut()}
                      startContent={<PiSignOut />}
                    >
                      Sair
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            )}
            <section className="h-full overflow-hidden rounded-xl px-6 py-8 md:px-6 lg:w-[550px] lg:px-14">
              {isSuccess ? (
                <AnimatePresence mode="wait">
                  <Success/>
                </AnimatePresence>
              ) : (
                <form
                  onSubmit={onSubmit}
                  className="flex flex-col justify-between"
                >
                  <AnimatePresence mode="wait" custom={status}>
                    {currentStepIndex === steps.personalInfo && (
                      <PersonalInfo
                        key={"step1"}
                        status={status}
                        isSubmitted={isSubmitted}
                        isValid={isValid}
                        values={getValues("user")}
                        register={register}
                      />
                    )}
                    {currentStepIndex === steps.businessInfo && (
                      <BusinessInfo
                        key={"step2"}
                        status={status}
                        register={register}
                      />
                    )}
                    {currentStepIndex === steps.plans && (
                      <BillingPlan
                        key={"step3"}
                        status={status}
                        register={register}
                        setValue={setValue}
                        value={getValues("plan")}
                      />
                    )}
                    {currentStepIndex === steps.reviewPlan && (
                      <Review
                        key={"step6"}
                        planSelected={getValues("subscription")}
                        status={status}
                      />
                    )}
                  </AnimatePresence>
                  <div className="mt-10 flex items-center justify-between">
                    {isSuccess ? (
                      ""
                    ) : (
                      <>
                        {isFirstStep ? (
                          <button
                            type="button"
                            className="font-semibold text-cool-gray"
                            onClick={() => location.replace("/signin")}
                          >
                            Já tenho uma conta
                          </button>
                        ) : currentStepIndex < steps.plans ||
                          currentStepIndex == steps.reviewPlan ? (
                          <button
                            type="button"
                            className="font-semibold text-cool-gray"
                            onClick={previousStep}
                          >
                            Voltar
                          </button>
                        ) : null}
                        <Button
                          radius="sm"
                          size="md"
                          color="primary"
                          type="submit"
                          isLoading={submitload}
                          endContent={isLastStep ? null : <FiArrowRight />}
                        >
                          {" "}
                          {isLastStep ? "Concluir" : "Continuar"}
                        </Button>
                      </>
                    )}
                  </div>
                </form>
              )}
            </section>
          </div>
        </div>
      )}
    </main>
  );
}
