"use client";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdLock } from "react-icons/md";
import { TbLockCheck } from "react-icons/tb";
import { IoWarning } from "react-icons/io5";

import useSWR from "swr";

import { sfx_logo } from "@/assets";
import { useRouter, useSearchParams } from "next/navigation";

import AuthenticationService from "@/app/api/repository/AuthenticationService";

const fetcher = (arg: any, ...args: any) =>
  fetch(arg, ...args).then((res) => res.json());

export default function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { isValid, errors },
  } = useForm();

  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const udpateLoading = () => setLoading((prev) => !prev);

  const token = searchParams.get("wtk")!;
  const uid = searchParams.get("ud")!;

  const { data, isLoading, error } = useSWR(
    AuthenticationService.GetCheckResetPasswordTokenURL(uid, token),
    fetcher
  );

  const onSubmit = async (data: any) => {
    const { pass } = data;

    udpateLoading();
    await AuthenticationService.ResetPassword(pass, uid);
    udpateLoading();

    setSuccess((prev) => !prev);
    setTimeout(() => {
      router.push("/signin");
    }, 1500);
  };

  if (error || (data && !data.valid))
    return (
      <div className="flex justify-center items-center flex-col h-screen">
        <IoWarning size={200} className="text-foreground-400" />
        <h1 className="text-white text-5xl mt-4">Solicitação inválida</h1>
      </div>
    );

  if (isLoading)
    return (
      <div className="text-black">
        <div className="fixed top-0 right-0 h-screen w-screen z-50 flex flex-col justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 text-foreground-400"></div>
        </div>
      </div>
    );
  if (data && data.valid)
    return (
      <section className="bg-black">
        {success ? (
          <div className="w-full h-screen flex flex-col justify-center items-center text-green-500">
            <TbLockCheck size={200} />
            <h1 className="text-5xl mt-6">Senha alterada com sucesso! :)</h1>
            <div className="text-black">
              <div className="fixed bottom-8 right-0 w-screen z-50 flex flex-col justify-center items-center">
                <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-white/30"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <br />

            <div className="pt-32 pb-12 md:pt-40 md:pb-20 ">
              <div className="max-w-sm mx-auto border border-white/20 rounded-xl p-8">
                <div className="max-w-4xl mx-auto text-center pb-6 md:pb-8">
                  <Image
                    src={sfx_logo}
                    alt="SMARTFORMX"
                    width={200}
                    className="m-auto mb-4"
                  />
                  <h1 className="font-bold text-3xl mb-2 text-white/90">
                    Redefina sua senha
                  </h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <span className="text-sm text-foreground-400">
                    *A senha deve ter no minimo 8 caraacteres
                  </span>
                  <div className="flex flex-wrap -mx-3 mb-4 mt-4">
                    <div className="w-full px-3 space-y-4">
                      <Input
                        radius="sm"
                        type="password"
                        label="Nova senha"
                        placeholder="***********"
                        size="lg"
                        labelPlacement="outside"
                        {...register("pass", {
                          minLength: 8,
                        })}
                        errorMessage={
                          !isValid &&
                          errors.pass &&
                          "A senha tem menos de 8 caracteres"
                        }
                        isRequired
                      />
                      <Input
                        radius="sm"
                        type="password"
                        label="Digite novamente"
                        placeholder="***********"
                        size="lg"
                        labelPlacement="outside"
                        {...register("cpass", {
                          validate: (value) => {
                            const { pass } = getValues();
                            return pass === value || "As senhas não combinam";
                          },
                        })}
                        errorMessage={
                          !isValid && errors.cpass?.message?.toString()
                        }
                        isRequired
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full pt-6">
                      <Button
                        fullWidth
                        size="lg"
                        radius="sm"
                        color="primary"
                        type="submit"
                        startContent={<MdLock />}
                        isLoading={loading}
                      >
                        Salvar
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
