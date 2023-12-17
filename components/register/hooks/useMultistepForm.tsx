import React, { useState } from "react";

export const useMultistepForm = (step: number) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [status, setStatus] = useState("");

  const nextStep = () => {
    if (currentStepIndex < step - 1) {
      setCurrentStepIndex((i) => i + 1);
      setStatus("ascending");
    }
    if (currentStepIndex === 4) {
      setIsSuccess(true);
    }
  };
  const setStep = (newStep: number) => {
    if (currentStepIndex < step - 1) {
      setCurrentStepIndex(newStep);
      setStatus("ascending");
    }
  };
  const setSuccess = () => {
    setIsSuccess(true);
  };

  const previousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((i) => i - 1);
      setStatus("descending");
    }
  };

  const gotoForm = (index: number) => {
    setCurrentStepIndex(index);
    setIsSuccess(false);
    setStatus("descending");
  };

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === step - 1;

  return {
    currentStepIndex,
    nextStep,
    previousStep,
    setStep,
    gotoForm,
    isFirstStep,
    isLastStep,
    isSuccess,
    status,
    setSuccess,
  };
};
