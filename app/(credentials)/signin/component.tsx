"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { sfx_logo } from "@/assets";
import { Button,Input } from "@nextui-org/react";
// import {  } from "@nextui-org/input";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

export default function SignInForm() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [loadingG, setLoadingG] = useState(false);

  const r = useRouter();

  const onSubmit = async (data: any) => {
    udpateLoading();
    const { email, password } = data;

    const session = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if (session?.ok) r.push("/");
    else if (session?.error){
      udpateLoading();
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
  };
  const udpateLoadingG = () => setLoadingG((prev) => !prev);
  const udpateLoading = () => setLoading((prev) => !prev);

  const onGoogleSignIn = async () => {
    udpateLoadingG();
    const session = await signIn("google", {
      redirect: false,
    });
    udpateLoadingG();
    if (session?.ok) location.reload();
  };

  return (
    <section className="bg-[#121212] py-12 h-screen">
      <div className={"overflow-hidden shadow-md shadow-[#1c1c1c] relative bg-[#1c1c1c] max-w-xl mx-auto md:rounded-tl-[50px] md:rounded-br-[50px] h-full box-anim-clock"}>
      <div className=" h-auto z-10 inset-1 absolute md:rounded-tl-[50px] md:rounded-br-[50px] bg-[#1c1c1c] max-w-2xl mx-auto flex flex-col p-4 sm:px-6 justify-between">
        <div className="max-w-3xl mx-auto mt-12 flex flex-col justify-center items-center">
          <Image src={sfx_logo} alt="" />
          <h1 className="text-4xl font-light text-foreground-500 mt-4">Conecte-se</h1>
        </div>
        <div className="">
          <div className="max-w-sm mx-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <Input
                    radius="sm"
                    type="email"
                    label="Email"
                    placeholder="Digite seu e-mail"
                    size="lg"
                    labelPlacement="outside"
                    {...register("email")}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <Input
                    type="password"
                    label="Senha"
                    radius="sm"
                    placeholder="Digite sua senha"
                    size="lg"
                    labelPlacement="outside"
                    {...register("password")}
                    required
                  />
                  <Link
                    href="/reset-password"
                    className="text-sm font-medium text-primary-500  hover:underline mt-2 flex justify-end"
                  >
                    Esqueci minha senha
                  </Link>
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mt-10">
                <div className="w-full px-3">
                  <Button
                    fullWidth
                    size="lg"
                    color="primary"
                    type="submit"
                    isLoading={loading}
                  >
                    Entrar
                  </Button>
                </div>
              </div>
            </form>
           
          </div>
        </div>
        <div className="text-foreground-400 text-center mt-6">
          Você não tem uma conta?{" "}
          <Link
            href="/signup"
            className="text-primary-500 font-medium hover:underline transition duration-150 ease-in-out"
          >
            Inscrever-se
          </Link>
        </div>
        </div>
      </div>

      <ToastContainer
        // position="top-right"
        // autoClose={5000}
        // hideProgressBar
        // newestOnTop={false}
        // closeOnClick
        // rtl={false}
        // pauseOnFocusLoss
        // draggable
        // pauseOnHover
        // theme="dark"
      />
    </section>
  );
}
