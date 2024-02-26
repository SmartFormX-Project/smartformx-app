"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  RadioGroup,
  Chip,
  VisuallyHidden,
  tv,
  useRadio,
} from "@nextui-org/react";
import React, { useState } from "react";
import { FiCheck } from "react-icons/fi";

import { BiSolidHappyAlt } from "react-icons/bi";
import UserService from "@/app/api/repository/UserServices";

const feedbackMetaOptions: string[] = [
  "Aumentar satisfação do cliente",
  "Aprimorar usabilidade",
  "Identificar inovações",
  "Retenção de clientes",
  "Avaliar marketing",
  "Melhorar eficiência operacional",
  "Personalizar experiências",
  "Fortalecer lealdade",
  "Corrigir atendimento",
  "Otimizar qualidade do produto",
  "Outros",
];

const smartformxChallengesOptions: string[] = [
  "Coleta eficiente de feedbacks",
  "Identificar padrões nos dados",
  "Melhorar comunicação",
  "Resolver problemas proativamente",
  "Aumentar taxa de resposta",
  "Análise de concorrência",
  "Personalização de estratégias",
  "Outros",
];

const businessMomentOptions: string[] = [
  "Crescimento acelerado",
  "Estabilidade consolidada",
  "Adaptação a mudanças",
  "Expansão para novos mercados",
  "Reestruturação interna",
  "Lançamento de novos produtos",
  "Ajustes pós-feedbacks",
  "Enfrentando concorrência",
  "Explorando parcerias",
  "Preparando evento significativo",
  "Outros",
];

const questions = [
  "Mas antes poderia nos contar o que trouxe você aqui?",
  "humm... E quais são os principais desafios ou preocupações que você" +
    " espera resolver com o smartformx?",
  "Por fim, como você descreveria o atual momento do seu negócio?",
];

const StartModal = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  const { update, data } = useSession();

  const [current, setCurrent] = useState(0);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [q1, setQ1] = useState<any>([]);
  const [q2, setQ2] = useState<any>([]);
  const [q3, setQ3] = useState<any>([]);

  const submit = async (close: any) => {
    switch (current) {
      case 3:
        setLoading((prev) => !prev);
        var data = questions.map((e, i) => {
          return {
            question: e,
            reply: i == 0 ? q1 : i == 1 ? q2 : q3,
          };
        });
        try {
          const res = await UserService.SendStartForm(data);
          if (res.status === 200) {
            try {
             await update({
                ...data,
                firstAccess: false,
              });
            } catch (error) {
              console.error("Error updating user:", error);
            }
            setLoading((prev) => !prev);
            sessionStorage.setItem("isNotFA","true");
           return nextSlide();
          }
        } catch (error) {
          setLoading((prev) => !prev);
        }

      case 4:
        close();

        break;

      default:
        nextSlide();
        break;
    }
  };
  const nextSlide = () => {
    if (current < pages.length - 1) setCurrent((prev) => ++prev);
  };

  const pages = [
    {
      title: (
        <h1 className="mb-8 text-3xl font-bold text-center text-[#8777E0]">
          Seja bem-vindo à Revolução dos Negócios com Tecnologia
        </h1>
      ),
      body: (
        <span className="text-center text-lg">
          É uma honra tê-lo aqui conosco, onde inovação e tecnologia redefinem
          como você conduz seus negócios. Estamos empenhados em proporcionar uma
          experiência única para você e sua empresa.{" "}
          <b>
            Pronto para começar esta emocionante jornada de transformação nos
            negócios?
          </b>
        </span>
      ),
    },
    {
      title: (
        <h1 className="mb-8 text-2xl font-semibold text-center text-[#8777E0]">
          {questions[0]}
        </h1>
      ),
      body: (
        <CustomCheckBoxGroup
          onSelect={setQ1}
          selected={q1}
          values={feedbackMetaOptions}
        />
      ),
    },
    {
      title: (
        <h1 className="mb-8 text-2xl font-semibold text-center text-[#8777E0]">
          {questions[1]}
        </h1>
      ),
      body: (
        <CustomCheckBoxGroup
          onSelect={setQ2}
          selected={q2}
          values={smartformxChallengesOptions}
        />
      ),
    },
    {
      title: (
        <h1 className="mb-8 text-2xl font-semibold text-center text-[#8777E0]">
          {questions[2]}
        </h1>
      ),
      body: (
        <CustomCheckBoxGroup
          onSelect={setQ3}
          selected={q3}
          values={businessMomentOptions}
        />
      ),
    },
    {
      title: <BiSolidHappyAlt className="mb-8" size={200} color="#8777E0" />,
      body: <h1 className=" text-5xl font-bold text-[#8777E0]">Obrigado!</h1>,
    },
  ];

  const getButtonText = () => {
    switch (current) {
      case 0:
        return "Estou pronto!";

        break;

      case 1:
        return "Continuar";
      case 2:
        return "Vamos nessa!";

      case 3:
        return "Feito!";

        break;

      default:
        return "Concluir";
        break;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      placement={"center"}
      size="3xl"
      className="light text-black bg-black"
      classNames={{
        backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
      }}
      onOpenChange={onOpenChange}
      hideCloseButton
    >
      <ModalContent className="bg-[#8777E0] p-[5px]">
        {(onClose: any) => (
          <div className="bg-white rounded-medium flex  flex-col items-center justify-center text-center">
            <ModalFooter></ModalFooter>
            <ModalBody>
              <div className="z-50 flex items-center justify-center text-center">
                {pages.map((e, i) => {
                  if (current == i)
                    return (
                      <div
                        key={i}
                        className="flex flex-col items-center justify-center"
                      >
                        {e.title}
                        {e.body}
                      </div>
                    );
                })}
              </div>
            </ModalBody>
            <ModalFooter className="m-auto">
              <Button
                isLoading={isLoading}
                size="lg"
                radius="full"
                className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg mt-10"
                onClick={() => submit(onClose)}
              >
                {getButtonText()}
              </Button>
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};

import { CheckboxGroup } from "@nextui-org/react";

const CustomCheckBoxGroup = ({
  values,
  onSelect,
  selected,
}: {
  values: string[];
  selected: string[];
  onSelect: React.Dispatch<any>;
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <CheckboxGroup
        className="gap-6"
        orientation="horizontal"
        value={selected}
        classNames={{
          wrapper: "justify-center",
        }}
        onChange={onSelect}
      >
        {values.map((element, i) => {
          return (
            <CheckboxComponent value={element} key={i}>
              {element}
            </CheckboxComponent>
          );
        })}
      </CheckboxGroup>
    </div>
  );
};
import { useCheckbox } from "@nextui-org/react";
import { getSession, useSession } from "next-auth/react";
import { uptime } from "process";

const checkbox = tv({
  slots: {
    base: "border-default hover:bg-default-200",
    content: "text-default-500",
  },
  variants: {
    isSelected: {
      true: {
        base: "border-primary bg-primary hover:bg-primary-500 hover:border-primary-500",
        content: "text-primary-foreground pl-1",
      },
    },
    isFocusVisible: {
      true: {
        base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
      },
    },
  },
});

const CheckboxComponent = (props: any) => {
  const {
    children,
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useCheckbox({
    ...props,
  });

  const styles = checkbox({ isSelected, isFocusVisible });

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Chip
        classNames={{
          base: styles.base(),
          content: styles.content(),
        }}
        size="lg"
        color="primary"
        startContent={isSelected ? <FiCheck className="ml-1" /> : null}
        variant="faded"
        {...getLabelProps()}
      >
        {children ? children : isSelected ? "Enabled" : "Disabled"}
      </Chip>
    </label>
  );
};

export default StartModal;
