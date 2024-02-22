"use client";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiArrowBack } from "react-icons/bi";
import { MdOutlinePassword, MdOutlineMail } from "react-icons/md";
import UserService from "@/app/api/repository/UserServices";

export default function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isValid, isSubmitted },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const router = useRouter();
  const udpateLoading = () => setLoading((prev) => !prev);

  const onSubmit = async (data: any) => {
    udpateLoading();
    const { email } = data;

    if (email) {
      await UserService.sendResetPassword(email);
      setSent((prev) => !prev);
    }
    udpateLoading();
  };

  return (
    <section className="bg-black">
      {sent ? (
        <div className="max-w-4xl my-auto mx-auto px-4 sm:px-6 flex flex-col justify-center text-center items-center h-screen">
          <div className="my-auto">
            <MdOutlineMail size={200} className="text-white/50 m-auto mb-6" />
            <h1 className=" mb-2 font-bol text-2xl">
              Um e-mail com as instruções de recuperação foi enviado
            </h1>
            <p className="text-xl text-foreground-300 mb-6">
              Por favor, verifique sua caixa de entrada. Se não encontrar o
              e-mail em alguns minutos, verifique também sua pasta de spam.
              Lembre-se de proteger suas informações. Não compartilhe sua senha
              com ninguém.
            </p>
            <Button
              onClick={() => router.push("/signin")}
              startContent={<BiArrowBack />}
              variant="flat"
            >
              Login
            </Button>
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <br />

          <Button
            onClick={() => router.push("/signin")}
            startContent={<BiArrowBack />}
            variant="flat"
          >
            Voltar
          </Button>
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            {/* Page header */}
            <div className="max-w-3xl mx-auto text-center pb-6 md:pb-10">
              <MdOutlinePassword
                size={100}
                className="text-white/50 m-auto mb-4"
              />
              <h1 className=" mb-2 font-bol text-2xl">
                Vamos colocar você de pé novamente!
              </h1>
              <p className="text-xl text-foreground-300">
                Digite o endereço de e-mail que você usou quando se inscreveu em
                sua conta e enviaremos um e-mail com um link para redefinir sua
                senha.
              </p>
            </div>
            <div className="max-w-sm mx-auto">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <Input
                    radius="sm"
                    type="text"
                    label="Email"
                    placeholder="Digite seu email"
                    size="lg"
                    labelPlacement="outside"
                    {...register("email", {
                      required: "Digite um email válido",
                      pattern:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                    })}
                    isInvalid={!isValid && isSubmitted}
                    errorMessage={
                      !isValid && isSubmitted && "Digite um email válido"
                    }
                    isRequired
                  />
                </div>
                <div className="flex flex-wrap -mx-3 mt-6">
                  <div className="w-full px-3">
                    <Button
                      fullWidth
                      size="lg"
                      color="primary"
                      type="submit"
                      isLoading={loading}
                    >
                      Enviar link
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
