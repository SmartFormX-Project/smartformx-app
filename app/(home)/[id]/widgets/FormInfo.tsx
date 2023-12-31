"use client";
import { Form } from "@/types/interfaces";
import { getStatusStringCategoryForm } from "@/types/variables";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import { FiChevronDown, FiEye, FiShare, FiShare2 } from "react-icons/fi";
import { HiLockClosed } from "react-icons/hi";
import Carousel from "./QuestionSlide";
import SmartFormService from "@/app/(backend)/services/SmartFormService";

export default function FormDescription({
  formData,
  onOpenModalShare,
}: {
  formData: Form;
  onOpenModalShare: () => void;
}) {

  var convertion: number =
    formData._count.UserAnswers / (formData.entrances ?? 1);

  const closeForm = async () => {
    const response = await SmartFormService.updateFormStatus(
      formData.id ?? "",
      "form_done"
    );

    if (response.status == 200) {
      window.location.reload();
    }
  };

  return (
    <div className="flex-none bg-black w-2/6 rounded-2xl p-5 relative  animate-fade-up">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="font-bold">
            {getStatusStringCategoryForm(formData.category)}
          </h1>
          <span className="font-light text-sm">Smartforms</span>
        </div>
        {formData.status === "in_progress" ? (
          <Dropdown>
            <DropdownTrigger>
              <Button
                color="primary"
                endContent={<FiChevronDown />}
                variant="solid"
                size="sm"
                radius="full"
              >
                Ações
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Static Actions"
              onAction={(key) =>
                key == "close_form" ? closeForm() : onOpenModalShare()
              }
            >
              <DropdownItem key="see_form" startContent={<FiShare2 />}>
                Compartilhar formulário
              </DropdownItem>
              <DropdownItem
                key="close_form"
                className="text-danger"
                color="danger"
                startContent={<HiLockClosed />}
              >
                Fechar formulário
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <h1>Concluido</h1>
        )}
      </header>

      <div className="flex mt-5">
        <div className="flex flex-col px-2 py-3 bg-white rounded-xl justify-center items-center mr-4">
          <h1 className="font-extrabold text-black text-5xl">
            {formData.entrances}
          </h1>
          <span className="font-light text-black">Pessoas</span>
        </div>
        <div className="flex flex-col justify-between py-2">
          <h2 className="font-bold text-xl">Alcance</h2>
          <p className="text-foreground-500 text-sm">
            Refere-se ao número total de pessoas impactadas ou expostas
          </p>
        </div>
      </div>
      <div className="space-y-5 mt-6 mb-6">
        <CardComponent
          title="Respostas"
          percentage={(formData._count.UserAnswers / formData.limitAns).toFixed(2)}
          label={formData._count.UserAnswers + " repostas"}
        />
        <CardComponent
          title="Conversão"
          percentage={Number.isNaN(convertion) ? 0 : convertion}
          label="Pessoas que abrem e respondem"
        />
      </div>
      <h3 className="text-white/70 mb-4 text-xl">Questões</h3>
      <Carousel questions={formData.Questions ?? []} />
    
      <BiSolidQuoteAltLeft
        size={150}
        className="text-white/[10%] absolute bottom-0"
      />
    </div>
  );
}

const CardComponent = ({ title, percentage, label }: any) => {
  var value = percentage > 1 ? 1 : percentage;
  let perc = `${value * 100}%`;
  return (
    <div
      className="
        cursor-default
      bg-white-500 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10
      text-black w-full flex flex-col justify-between border border-white/20 rounded-xl px-[15px] py-[10px]"
    >
      <div className="flex justify-between">
        <div>
          <h2 className="font-semibold text-white/70 text-xl">{title}</h2>
        </div>
        <h2 className="text-white/70 font-medium text-xl">{perc}</h2>
      </div>
      <div className="w-full bg-white/30 rounded-full h-2.5 mt-4">
        {/* dark:bg-gray-700 */}
        <div className="bg-white h-2.5 rounded-full" style={{ width: perc }} />
      </div>
      <p className="font-light text-xs text-white/70 mt-1">{label}</p>
    </div>
  );
};
