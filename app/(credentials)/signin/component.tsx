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
      toast.error(session.error, {
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
    <section className="bg-gradient-to-b p-6 h-screen">
      <div className="max-w-2xl rounded-2xl mx-auto px-4 py-6 sm:px-6 flex flex-col justify-between h-full border-white/20 border-medium">
        {/* <Header onClick={() => location.replace("/")} /> */}
        <div className="max-w-3xl mx-auto mt-12 flex flex-col justify-center items-center">
          <Image src={sfx_logo} alt="" />
          <h1 className="text-5xl font-bold text-foreground-500">Conecte-se</h1>
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
            {/* <div className="flex items-center my-6">
              <div
                className="border-t border-gray-300 grow mr-3"
                aria-hidden="true"
              ></div>
              <div className="text-gray-300">Ou</div>
              <div
                className="border-t border-gray-300 grow ml-3"
                aria-hidden="true"
              ></div>
            </div>
            <form>
              <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3">
                  <Button
                    fullWidth
                    size="lg"
                    variant="flat"
                    className="bg-white border border-gray-300"
                    onClick={onGoogleSignIn}
                    startContent={<FcGoogle size={20} />}
                    isLoading={loadingG}
                  >
                    Continue com o Google
                  </Button>
                </div>
              </div>
            </form> */}
          </div>
        </div>
        <div className="text-gray-600 text-center mt-6">
          Você não tem uma conta?{" "}
          <Link
            href="/signup"
            className="text-primary-500 font-medium hover:underline transition duration-150 ease-in-out"
          >
            Inscrever-se
          </Link>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </section>
  );
}
