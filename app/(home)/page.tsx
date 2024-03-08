"use client";
import FormCardComponent from "../components/FormCard";
import SearchInputComponent from "../components/SearchInput";
import CreateFormButton from "../components/CreateFormModal";
import useSWR from "swr";
import FormsService from "../api/repository/FormService";
import { AppFetchJSON } from "../api/repository/fetch";
import { Form } from "@/types/interfaces";
import Image from "next/image";
import { emp_form } from "@/assets";
import { format } from "date-fns";
import GetStatusForm from "@/utils/get-status-form";
import { useDisclosure } from "@nextui-org/react";
import UpdatePlanModal from "../components/Modals/UpdatePlanModal";

export default function HomePage() {
  const UpdatePlanDisclosure = useDisclosure();

  const { data, isLoading, error } = useSWR(
    FormsService.FetchAllFormsURL(),
    AppFetchJSON
  );

  const sendToFormDetails = (id: string) => location.replace("/" + id);
  if (data) {
    const forms = data as Form[];

    return (
      <div className="h-full pt-10 flex flex-col items-center">
        {forms.length != 0 && <SearchInputComponent />}

        {forms.length == 0 ? (
          <EmptyState />
        ) : (
          <div className="grid lg:grid-cols-5  md:grid-cols-3 min-[600px]:grid-cols-2 grid-cols-1 gap-5 justify-center items-center mt-12  max-h-[69dvh] overflow-y-auto overflow-auto">
            {forms.map((form, i) => {
              return (
                <FormCardComponent
                  key={i}
                  onClick={() => sendToFormDetails(form.id)}
                  created={format(form.createdAt, "dd/MM/yyyy")}
                  description={form.description ?? "sem descrição..."}
                  messages={form._count.UserAnswers}
                  status={GetStatusForm(form.status)}
                  title={form.title}
                />
              );
            })}
          </div>
        )}
        <div className="absolute bottom-10">
          <CreateFormButton
            // isRedirectSubmit={data ? data.length > 0 : false}
            isRedirectSubmit={false}
            redirectSubmit={UpdatePlanDisclosure.onOpen}
          />
        </div>
        <UpdatePlanModal
          hitLimit
          isOpen={UpdatePlanDisclosure.isOpen}
          onOpenChange={UpdatePlanDisclosure.onOpenChange}
        />
      </div>
    );
  }
}

const EmptyState = () => {
  return (
    <div className="w-full flex flex-col items-center mt-12">
      <Image alt="" src={emp_form} />
      <h2 className="mt-6 font-semibold text-xl">Comece agora</h2>
      <span className="mt-2 text-foreground-400">
        Clique no botão na parte inferior para criar um novo formulário.
      </span>
    </div>
  );
};
