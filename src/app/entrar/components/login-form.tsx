"use client";

import { Button, Input, Label } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Show from "@/src/components/core/show";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { doLogin } from "../services";

const LoginFormSchema = z.object({
  email: z.string().min(1, "O campo email é obrigatório."),
  password: z.string().min(1, "O campo senha é obrigatório."),
});

type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;

const LoginForm = () => {
  const router = useRouter();

  const { handleSubmit, control, watch } = useForm<LoginFormSchemaType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: login, isPending: pendingLogin } = useMutation({
    mutationFn: doLogin,
    onSuccess: () => router.push("/dashboard"),
    onError: (error) => {
      toast.error(error.message, {
        className: "!bg-red-600/80 !text-white",
      });
    },
  });

  const handleLogin = ({ email, password }: LoginFormSchemaType) => {
    login({ email, password });
  };

  const { email, password } = watch();
  const formInputFieldIsBlank = [email, password].some((value) => value === "");

  return (
    <form
      id="login-form"
      onSubmit={handleSubmit(handleLogin)}
      className="space-y-4 my-10"
    >
      <Column className="space-y-2">
        <Label htmlFor="email" className="text-white">
          E-mail<span className="text-red-500">*</span>
        </Label>
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Column>
              <Input
                id="email"
                placeholder="seuemail@exemplo.com"
                autoComplete="email"
                value={value}
                onChange={onChange}
                className={`${error && "border-red-600"}`}
              />
              <div className="h-2 -mt-1">
                <Show when={error}>
                  <span className="text-xs text-red-600">{error?.message}</span>
                </Show>
              </div>
            </Column>
          )}
        />
      </Column>
      <Column className="space-y-2">
        {/* <Row className="justify-between"> */}
        <Label htmlFor="password" className="text-white">
          Senha<span className="text-red-500">*</span>
        </Label>
        {/* <Button
                type="button"
                variant="link"
                className="p-0 h-fit opacity-40"
                disabled
                onClick={() => null}
              >
                Esqueceu a senha?
              </Button> */}
        {/* </Row> */}
        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Column>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                value={value}
                onChange={onChange}
                className={`${error && "border-red-600"}`}
              />
              <div className="h-2 -mt-1">
                <Show when={error}>
                  <span className="text-xs text-red-600">{error?.message}</span>
                </Show>
              </div>
            </Column>
          )}
        />
      </Column>
      <Column className="mt-5">
        <Button
          className="hover:cursor-pointer w-full"
          type="submit"
          disabled={pendingLogin || formInputFieldIsBlank}
        >
          <Show when={pendingLogin}>
            <Loader2Icon className="animate-spin" />
          </Show>
          Entrar
        </Button>
        <Link
          href="/recuperar-senha"
          className="flex self-center w-fit"
          passHref
        >
          <Button type="button" variant="link" className="text-white">
            Esqueci minha senha
          </Button>
        </Link>
      </Column>
    </form>
  );
};

export default LoginForm;
