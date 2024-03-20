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
  LayoutGrid,
  LineChart,
  Plus,
  Star,
  Tags,
} from "lucide-react";
import FormsService from "@/app/api/repository/FormService";
import useSWR from "swr";
import UserService from "@/app/api/repository/UserServices";
import { AppFetchJSON } from "@/app/api/repository/fetch";
import { useTranslation } from "@/app/i18n/client";

export default function CreateFormButton({
  redirectSubmit = () => {},
  buttonText,
  lng,
}: {
  redirectSubmit?: () => void;
  buttonText: string;
  lng: string;
}) {
  const { t } = useTranslation(lng, "modals");

  const { data, isLoading } = useSWR(
    UserService.FetchIfIsAllowToCreateURL(),
    AppFetchJSON
  );

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [groupSelected, setGroupSelected] = React.useState<any[]>([]);

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
      toast.error(t("create-form.error"), {
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
        onClick={() => (data && data.available ? onOpen() : redirectSubmit())}
        isLoading={isLoading}
      >
        {buttonText}
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
                {t("create-form.title")}
              </ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  label={t("create-form.input.title.label")}
                  placeholder={t("create-form.input.title.placeholder")}
                  labelPlacement="outside"
                  readOnly={loading}
                  {...register("title")}
                  isRequired
                />
                <Textarea
                  label={t("create-form.input.descritpion.title")}
                  placeholder={t("create-form.input.descritpion.placeholder")}
                  labelPlacement="outside"
                  readOnly={loading}
                  isRequired
                  {...register("description")}
                ></Textarea>

                <CustomCheckboxGroup
                  t={t}
                  onChange={setGroupSelected}
                  selected={groupSelected}
                />
                <div>
                  <span className="text-sm mt-3">
                    {/* Número máximo de questões a serem geradas:{" "} */}
                    {t("create-form.input.max_q.label")}{" "}
                    <b className="text-red-500">*</b>
                  </span>
                  <Select
                    label=""
                    className="max-w-xs mt-1"
                    variant="bordered"
                    labelPlacement="outside"
                    items={max_questions_op}
                    defaultSelectedKeys={["8"]}
                    placeholder={t("create-form.input.max_q.placeholder")}
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
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  isDisabled={loading}
                >
                  {t("create-form.footer.cancel-button")}
                </Button>
                <Button type="submit" color="primary" isLoading={loading}>
                  {t("create-form.footer.submit-button")}
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
const CustomSelect = ({ register, readonly = false, t }: any) => {
  const users: FeedbackForms[] = [
    {
      id: 0,
      name: t("create-form.form-options.general.name"),
      value: "general",
      description: t("create-form.form-options.general.description"),
      icon: <LayoutGrid color="#000000" strokeWidth={1.5} />,
    },
    {
      id: 1,
      name: "NPS",
      value: "nps",
      description: t("create-form.form-options.nps.description"),
      icon: <LineChart color="#000000" strokeWidth={1.5} />,
    },
    {
      id: 2,
      name: t("create-form.form-options.quality.name"),
      value: "quality",
      description: t("create-form.form-options.general.description"),
      icon: <BadgeCheck color="#000000" strokeWidth={1.5} />,
    },
    {
      id: 3,
      name: t("create-form.form-options.service.name"),
      value: "customer_service",
      description: t("create-form.form-options.service.description"),
      icon: <Headphones color="#000000" strokeWidth={1.5} />,
    },
    {
      id: 4,
      name: t("create-form.form-options.exp.name"),
      value: "experence",
      description: t("create-form.form-options.exp.description"),
      icon: <Star color="#000000" strokeWidth={1.5} />,
    },
    {
      id: 5,
      name: t("create-form.form-options.product.name"),
      value: "product",
      description: t("create-form.form-options.product.description"),
      icon: <Tags color="#000000" strokeWidth={1.5} />,
    },
  ];
  return (
    <Select
      disabled={readonly}
      isRequired
      label={t("create-form.inputs.type.label")}
      labelPlacement="outside"
      radius="lg"
      placeholder={t("create-form.inputs.type.placeholder")}
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
  t,
}: {
  onChange: (vales: any) => void;
  selected: any;
  t: any;
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
        <CustomCheckbox value="name">
          {t("create-form.custom-elements.name")}
        </CustomCheckbox>
        <CustomCheckbox value="sex">
          {t("create-form.custom-elements.sex")}
        </CustomCheckbox>
        <CustomCheckbox value="email">
          {t("create-form.custom-elements.email")}
        </CustomCheckbox>
        {/* <CustomCheckbox value="phone">Telefone</CustomCheckbox> */}
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
