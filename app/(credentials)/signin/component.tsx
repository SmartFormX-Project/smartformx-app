"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { sfx_logo } from "@/assets";
import { Button, Input } from "@nextui-org/react";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AuthenticationService from "@/app/api/repository/AuthenticationService";
import { Check, Eye, EyeOff, X } from "lucide-react";

export default function SignInForm() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [loadingG, setLoadingG] = useState(false);
  const [signup, setSignup] = useState(false);

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
    else if (session?.error) {
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
  const onSubmitRegister = async (user: any) => {
    udpateLoading();

    const data = {
      ...user,
      provider: "credentials",
      country: "BRAZIL",
    };

    const res = await AuthenticationService.SignUp(data);

    if (res.status == 201) {
      const session = await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: false,
      });

      if (session?.ok) r.push("/");
      else if (session?.error) {
        // udpateLoading();
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
    } else {
      toast.error("Cadastro inválido. Verifique os dados e tente novamente", {
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
    udpateLoading();
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
      <div
        className={
          "dark overflow-hidden shadow-md shadow-[#1c1c1c] relative bg-[#1c1c1c] max-w-xl mx-auto md:rounded-tl-[50px] md:rounded-br-[50px] h-full box-anim-clock"
        }
      >
        <div className=" h-auto z-10 inset-1 absolute md:rounded-tl-[50px] md:rounded-br-[50px] bg-[#1c1c1c] max-w-2xl mx-auto flex flex-col p-4 sm:px-6 justify-between">
          <div className="max-w-3xl mx-auto mt-8 flex flex-col justify-center items-center">
            <Image src={sfx_logo} alt="" />
            <h1 className="text-4xl font-light text-foreground-500 mt-4">
              Conecte-se
            </h1>
          </div>
          <div className="">
            <div className="max-w-sm mx-auto">
              {signup ? (
                <RegisterComponent
                  loading={loading}
                  onSubmit={onSubmitRegister}
                />
              ) : (
                <SigninComponent loading={loading} onSubmit={onSubmit} />
              )}
            </div>
          </div>
          {signup ? (
            <div className="text-foreground-400 text-center mt-4">
              Tem uma conta?{" "}
              <Button
                size="sm"
                onClick={() => setSignup(false)}
                className="text-primary-500 font-medium hover:underline transition duration-150 ease-in-out"
              >
                Entre
              </Button>
            </div>
          ) : (
            <div className="text-foreground-400 text-center mt-6">
              Você não tem uma conta?{" "}
              <Button
                size="sm"
                onClick={() => setSignup(true)}
                className="text-primary-500 font-medium hover:underline transition duration-150 ease-in-out"
              >
                Inscrever-se
              </Button>
            </div>
          )}
        </div>
      </div>

      <ToastContainer />
    </section>
  );
}

const SigninComponent = ({
  onSubmit,
  loading,
}: {
  onSubmit: any;
  loading: boolean;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  return (
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
            placeholder="Sua senha possui 8 ou mais caracteres"
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
  );
};

const RegisterComponent = ({
  onSubmit,
  loading,
}: {
  onSubmit: any;
  loading: boolean;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const validateBeforeSubmit = (data: any) => {
    if (passwordValidateSubmit(data.password)) {
      onSubmit(data);
    }
  };

  const passwordValidation = (password: string) => {
    const requirements = [
      // Must be at least 8 characters
      {
        message: "Minimo 8 caracteres",
        valid: password.length >= 8,
      },
      {
        message: "Pelo menos 1 letra maiuscula",
        valid: /[A-Z]/.test(password),
      },
      {
        message: "Pelo menos 1 letra miniscula",
        valid: /[a-z]/.test(password),
      },
      {
        message: "Pelo menos 1 número",
        valid: /\d/.test(password),
      },
    ];

    return requirements.map((e) => {
      return e;
    });
  };

  const passwordValidateSubmit = (password: string): boolean => {
    return [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /\d/.test(password),
    ].every(Boolean);
  };

  return (
    <form onSubmit={handleSubmit(validateBeforeSubmit)} className="space-y-10">
      <Input
        radius="sm"
        type="text"
        label="Nome"
        placeholder="Digite seu nome"
        className="mt-4"
        size="lg"
        labelPlacement="outside"
        {...register("name")}
        isRequired
      />
      <Input
        type="email"
        label="E-mail"
        radius="sm"
        placeholder="Digite seu email"
        size="lg"
        labelPlacement="outside"
        {...register("email")}
        isRequired
      />
      <div>
        <Input
          type={passwordShown ? "text" : "password"}
          label="Senha"
          radius="sm"
          placeholder="Digite sua senha"
          size="lg"
          endContent={
            passwordShown ? (
              <EyeOff onClick={togglePasswordVisiblity} />
            ) : (
              <Eye onClick={togglePasswordVisiblity} />
            )
          }
          labelPlacement="outside"
          errorMessage={errors.root?.message?.toString()}
          {...register("password")}
          isRequired
        />
        <div className="text-white/40 mt-3">
          {passwordValidation(watch("password") ?? "").map((e, i) => {
            return (
              <li key={i} className="flex items-center text-[10px]">
                <span className="mr-2">
                  {e.valid ? (
                    <Check size={12} color="#48BA7F" />
                  ) : (
                    <X size={12} />
                  )}{" "}
                </span>
                <p>{e.message}</p>
              </li>
            );
          })}
        </div>
      </div>

      <Button
        fullWidth
        size="lg"
        color="primary"
        type="submit"
        isLoading={loading}
      >
        Cadastrar
      </Button>
    </form>
  );
};
