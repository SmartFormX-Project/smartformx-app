"use client";
import FormCardComponent from "../../components/FormCard";
import SearchInputComponent from "../../components/SearchInput";
import CreateFormButton from "../../components/CreateFormModal";
import useSWR from "swr";
import FormsService from "../../api/repository/FormService";
import { AppFetchJSON } from "../../api/repository/fetch";
import { Form } from "@/types/interfaces";
import Image from "next/image";
import { emp_form } from "@/assets";
import { format } from "date-fns";
import GetStatusForm from "@/utils/get-status-form";
import { useDisclosure } from "@nextui-org/react";
import UpdatePlanModal from "../../components/Modals/UpdatePlanModal";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import ModalPaymentIssue from "../../components/Modals/ModalPaymentIssue";
import PasswordModal from "../../components/Modals/PasswordModal";
import PricingModal from "../../components/Modals/PricingModal";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";
import { useTranslation } from "@/app/i18n/client";

export default function HomePage({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  const { t } = useTranslation(lang, "home");

  const { data: session } = useSession();
  const UpdatePlanDisclosure = useDisclosure();
  const PaymentIssueDisclosure = useDisclosure();
  const PricingModalDisclosure = useDisclosure();
  const PasswordModalDisclosure = useDisclosure();

  const { data, isLoading, error } = useSWR(
    FormsService.FetchAllFormsURL(),
    AppFetchJSON
  );

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    (async function () {
      if (query.get("up")) {
        PasswordModalDisclosure.onOpen();
      }
    })();

    if (
      session?.user &&
      session.user.subscribeStatus != "trialing" &&
      session.user.subscribeStatus != "active"
    ) {
      PaymentIssueDisclosure.onOpen();
    }
  }, []);

  const sendToFormDetails = (id: string) => location.replace("/" + id);

  const submitPassowrdToSingin = async (password: string, close: any) => {
    const email = session?.user?.email;

    try {
      const session = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (session?.ok) {
        close();
        location.replace("/");
      } else if (session?.error) {
        const error = JSON.parse(session.error).error;
        toast.error(error, {
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
    } catch (error) {
      console.log(error);
    }
  };

  if (data) {
    const forms = data as Form[];

    return (
      <div className="h-full pt-10 flex flex-col items-center">
        {forms.length != 0 && (
          <SearchInputComponent
            label={t("home.search.label")}
            placeholder={t("home.search.placeholder")}
          />
        )}

        {forms.length == 0 ? (
          <EmptyState t={t} />
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
            redirectSubmit={PricingModalDisclosure.onOpen}
            buttonText={t("home.button")}
            lng={lang}
          />
        </div>
        <ModalPaymentIssue
          isOpen={PaymentIssueDisclosure.isOpen}
          onChange={PaymentIssueDisclosure.onOpenChange}
          lng={lang}
          
          />
        <UpdatePlanModal
          hitLimit
          isOpen={UpdatePlanDisclosure.isOpen}
          onOpenChange={UpdatePlanDisclosure.onOpenChange}
          />
        <PasswordModal
          onSubmit={submitPassowrdToSingin}
          isOpen={PasswordModalDisclosure.isOpen}
          onOpenChange={PasswordModalDisclosure.onOpenChange}
          lng={lang}
          />
        <PricingModal
          isOpen={PricingModalDisclosure.isOpen}
          onOpenChange={PricingModalDisclosure.onOpenChange}
          lng={lang}
        />
        <ToastContainer />
      </div>
    );
  }
}

const EmptyState = (t: any) => {
  return (
    <div className="w-full flex flex-col items-center mt-12">
      <Image alt="" src={emp_form} />
      <h2 className="mt-6 font-semibold text-xl">{t("home.title")}</h2>
      <span className="mt-2 text-foreground-400">{t("home.description")}</span>
    </div>
  );
};
