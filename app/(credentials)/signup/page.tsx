"use client";

import Sidebar from "@/components/register/Sidebar";
import PersonalInfo from "@/components/register/PersonalInfo";
import BillingPlan from "@/components/register/BillingPlan";
import Review from "@/components/register/Review";
import Success from "@/components/register/Success";

import { useMultistepForm } from "@/components/register/hooks/useMultistepForm";
import { AnimatePresence } from "framer-motion";

import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import BusinessInfo from "@/components/register/Business";
import { Button } from "@nextui-org/button";
import { FiArrowRight, FiUser } from "react-icons/fi";
import {  useState } from "react";

import PaymentService from "@/app/api/repository/PaymentService";

import AuthenticationService from "@/app/api/repository/AuthenticationService";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
export default function SignUp() {
  const steps = {
    personalInfo: 0,
    businessInfo: 1,
    // plans: 2,
    // reviewPlan: 3,
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

  const [load, setLoad] = useState(false);
  const [submitload, setSubmitLoad] = useState(false);

  const router = useRouter();
  const updateLoad = () => setSubmitLoad((prev) => !prev);
  const session = useSession();
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

      const res = await PaymentService.goToCheckout(
        // session.data?.user?.email,
        getValues("subscription").id,
        getValues("subscription").metadata,
        getValues("subscription").recurring
      );

      if (res.status == 200) {
        const data = await res.json();

        window.location.assign(data.url);
      }
      updateLoad();
    } else {
      console.log("email not provide by session");
    }
  };

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    // if (currentStepIndex == steps.reviewPlan) {

    //   if (getValues("subscription").plan == "free") {
    //     const { email, name } = session.data?.user!;
    //     const response = await PaymentService.createFreeAccount(name ?? "", email ?? "", getValues("subscription").id);
    //     const data = response.data;

    //     if (response.data.valid) {
    //       const { name } = data.metadata;

    //       const res = await session.update({
    //         plan: name,
    //         subscribeStatus: data.subscribeStatus,
    //       });

    //       if(res)
    //       proccessPlanStatus(data.subscribeStatus);
    //     }
    //   } else {

    //     await goToPayment();
    //   }
    // }

    var data = getValues();
    if (currentStepIndex == steps.businessInfo) {
      updateLoad();

      try {
        
        var res = await AuthenticationService.SignUp({
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
          if (user?.ok) setSuccess();
          } 
      } catch (error) {
        
        toast.error(error?.toString(), {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      updateLoad();
    } else {
      nextStep();
    }
  };

  return (
    <main className="flex h-screen md:place-items-center">
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
          
            <section className="h-full overflow-hidden rounded-xl px-6 py-8 md:px-6 lg:w-[550px] lg:px-14">
              {isSuccess ? (
                <AnimatePresence mode="wait">
                  <Success />
                </AnimatePresence>
              ) : (
                <form
                  onSubmit={onSubmit}
                  className="flex flex-col justify-between h-full"
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
                    {/* {currentStepIndex === steps.plans && (
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
                    )} */}
                  </AnimatePresence>
                  <div className="mt-10 flex items-center justify-between">
                    {isSuccess ? (
                      ""
                    ) : (
                      <>
                        {isFirstStep ? (
                          <button
                            type="button"
                            className="font-semibold text-gray-400 transition-colors hover:text-white"
                            onClick={() => router.push("/signin")}
                          >
                            Já tenho uma conta
                          </button>
                        ) : 
                        <button
                          type="button"
                          className="font-semibold text-gray-400 hover:text-white"
                          onClick={previousStep}
                        >
                          Voltar
                        </button>
                      }
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
      <ToastContainer />
    </main>
  );
}
