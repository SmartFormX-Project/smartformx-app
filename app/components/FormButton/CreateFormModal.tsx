"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Select,
  SelectItem,
  Input,
  Textarea,
  useCheckbox,
  VisuallyHidden,
  tv,
  Chip,
  CheckboxGroup,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";

// import FormsService from "@/app/api/repository/FormService";
import { toast } from "react-toastify";
import {
  BadgeCheck,
  CheckIcon,
  Headphones,
  HelpCircle,
  LayoutGrid,
  LineChart,
  Plus,
  Star,
  Tags,
} from "lucide-react";
import FormsService from "@/app/api/repository/FormService";

export default function CreateFormButton({
  isRedirectSubmit = false,
  redirectSubmit = () => {},
}: {
  isRedirectSubmit?: boolean;
  redirectSubmit?: () => void;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [groupSelected, setGroupSelected] = React.useState<any[]>([]);
  // const [maxQuestionSelected, setMaxQuestionSelected] = React.useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, reset, getValues } = useForm();

  const max_questions_op = [
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8 (recomendado)" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
    { value: "11", label: "11" },
    { value: "12", label: "12" },
    { value: "13", label: "13" },
    { value: "14", label: "14" },
    { value: "15", label: "15" },
  ];
  const updateLoading = () => setLoading((prev) => !prev);
  const onSubmit = async (body: any, onClose: any) => {
    body.extra = groupSelected.join(",");
    updateLoading();

    try {
      const res = await FormsService.createForm(body);

      updateLoading();
      if (res.status == 201) {
        onClose();
        reset();
        window.location.reload();
      }
    } catch (error) {
      setLoading(false);
      toast.error(
        "Não foi possivel criar o formulário, tente novamente mais tarde.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
    }
  };
  return (
    <>
      <Button
        size="lg"
        color="primary"
        variant="shadow"
        radius="full"
        className="self-center animate-fade-up "
        style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        startContent={<Plus />}
        onClick={() => (isRedirectSubmit ? redirectSubmit() : onOpen())}
      >
        Criar formulário
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="bottom"
        isDismissable={false}
        hideCloseButton
      >
        <ModalContent>
          {(onClose: any) => (
            <form onSubmit={handleSubmit((data) => onSubmit(data, onClose))}>
              <ModalHeader className="flex flex-col gap-1">
                Novo SmartForm
              </ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  label="Titulo"
                  placeholder="Digite um titulo para o form."
                  isRequired
                  labelPlacement="outside"
                  {...register("title")}
                  readOnly={loading}
                />
                <Textarea
                  label="Descrição"
                  placeholder="Descreva o intuito do formulário, o que você espera descobrir com as respostas"
                  labelPlacement="outside"
                  {...register("description")}
                  readOnly={loading}
                  isRequired
                ></Textarea>

                <CustomCheckboxGroup
                  onChange={setGroupSelected}
                  selected={groupSelected}
                />
                <div>
                  <span className="text-sm mt-3">
                    Número máximo de questões a serem geradas:{" "}
                    <b className="text-red-500">*</b>
                  </span>
                  <Select
                    label=""
                    className="max-w-xs mt-1"
                    variant="bordered"
                    labelPlacement="outside"
                    items={max_questions_op}
                    defaultSelectedKeys={["8"]}
                    placeholder="Selecione"
                    {...register("max_questions")}
                    value={getValues("max_questions")}
                    isRequired
                  >
                    {max_questions_op.map((n) => (
                      <SelectItem key={n.value} value={n.value}>
                        {n.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <CustomSelect register={register} readOnly={loading} />
                </div>
              </ModalBody>
              <ModalFooter className={"justify-start sm:justify-end"}>
                <Button color="danger" variant="light" onPress={onClose} isDisabled={loading}>
                  Cancelar
                </Button>
                <Button type="submit" color="primary" isLoading={loading}>
                  Gerar smartform
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

interface FeedbackForms {
  id: number;
  name: string;
  value: string;
  description: string;
  icon: any;
}
const CustomSelect = ({ register, readonly = false }: any) => {
  const users: FeedbackForms[] = [
    {
      id: 1,
      name: "Geral",
      value: "general",
      description:
        "Coletar respostas variadas, com foco no intuito estabelecido",
      icon: <LayoutGrid color="#000000" strokeWidth={1.5} />,
    },
    {
      id: 0,
      name: "NPS",
      value: "nps",
      description: "Net Promoter Score",
      icon: <LineChart color="#000000" strokeWidth={1.5} />,
    },
    {
      id: 2,
      name: "Qualidade",
      value: "quality",
      description: "Foco na qualidade do negócio(estrutura, atendimento...)",
      icon: <BadgeCheck color="#000000" strokeWidth={1.5} />,
    },
    {
      id: 3,
      name: "Atendimento",
      value: "customer_service",
      description: "Foco no atendimento ao cliente",
      icon: <Headphones color="#000000" strokeWidth={1.5} />,
    },
    {
      id: 4,
      name: "Experiência",
      value: "experence",
      description: "Foco na experiência do cliente com seu negócio",
      icon: <Star color="#000000" strokeWidth={1.5} />,
    },
    {
      id: 5,
      name: "Produto",
      value: "product",
      description: "Coletar resposta sobre seus produtos",
      icon: <Tags color="#000000" strokeWidth={1.5} />,
    },
  ];
  return (
    <Select
      disabled={readonly}
      isRequired
      label="Qual tipo de formulário deseja usar?"
      labelPlacement="outside"
      radius="lg"
      placeholder="Selecione um"
      items={users}
      variant="bordered"
      {...register("type")}
      classNames={{
        mainWrapper: "mt-5",
        trigger: "min-h-unit-16",
        listboxWrapper: "max-h-[400px]",
      }}
      listboxProps={{
        itemClasses: {
          base: [
            "rounded-md",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "data-[hover=true]:bg-default-100",
            "dark:data-[hover=true]:bg-default-50",
            "data-[selectable=true]:focus:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
        },
      }}
      popoverProps={{
        classNames: {
          base: "p-0 border-divider bg-background",
          arrow: "bg-default-200",
        },
      }}
      renderValue={(items) => {
        return items.map((item, i) => {
          var data = item.data as FeedbackForms;
          return (
            <div key={item.key} className="flex items-center gap-2">
              <div>{data.icon}</div>
              <div className="flex flex-col">
                <span>{data.name}</span>
                <span className="text-default-500 text-tiny">
                  ({data.description})
                </span>
              </div>
            </div>
          );
        });
      }}
    >
      {(user: any) => (
        <SelectItem key={user.value} textValue={user.name}>
          <div className="flex gap-2 items-center">
            <div>{user.icon}</div>
            <div className="flex flex-col">
              <span className="text-small">{user.name}</span>
              <span className="text-tiny text-default-400">
                {user.description}
              </span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
};

function CustomCheckboxGroup({
  onChange,
  selected,
}: {
  onChange: (vales: any) => void;
  selected: any;
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <CheckboxGroup
        className="gap-1"
        label="Deseja coletar essas informações:"
        orientation="horizontal"
        classNames={{
          label: "text-sm text-black",
        }}
        value={selected}
        onChange={onChange}
      >
        <CustomCheckbox value="name">Nome</CustomCheckbox>
        <CustomCheckbox value="sex">Sexo</CustomCheckbox>
        <CustomCheckbox value="email">Email</CustomCheckbox>
        <CustomCheckbox value="phone">Telefone</CustomCheckbox>
      </CheckboxGroup>
    </div>
  );
}

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

export const CustomCheckbox = (props: any) => {
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
        color="primary"
        startContent={
          isSelected ? (
            <CheckIcon className="ml-1" color="#fff" size={16} />
          ) : null
        }
        variant="faded"
        // {...getLabelProps()}
      >
        {children ? children : isSelected ? "Enabled" : "Disabled"}
      </Chip>
    </label>
  );
};
