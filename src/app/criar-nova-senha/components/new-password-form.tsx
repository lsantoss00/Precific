"use client";

import { Button, Input, Label } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Show from "@/src/components/core/show";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createNewPassword } from "../services/create-new-password";

const NewPasswordFormSchema = z
  .object({
    password: z.string().min(1, "O campo senha é obrigatório"),
    confirmPassword: z
      .string()
      .min(1, "O campo confirmar senha é obrigatório."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });
type NewPasswordFormSchemaType = z.infer<typeof NewPasswordFormSchema>;

const NewPasswordForm = () => {
  const router = useRouter();

  const {
    handleSubmit,
    control,
    watch,
    formState: { isValid },
  } = useForm<NewPasswordFormSchemaType>({
    resolver: zodResolver(NewPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: doCreateNewPassword, isPending: pendingCreateNewPassword } =
    useMutation({
      mutationFn: createNewPassword,
      onSuccess: () => router.push("/"),
      onError: (error) => {
        toast.error(error.message, {
          className: "!bg-red-600/80 !text-white",
        });
      },
    });

  const handleCreateNewPassword = ({ password }: NewPasswordFormSchemaType) => {
    doCreateNewPassword({ password });
  };

  const { password, confirmPassword } = watch();
  const formInputFieldIsBlank = [password, confirmPassword].some(
    (value) => value === ""
  );

  return (
    <form
      id="login-form"
      onSubmit={handleSubmit(handleCreateNewPassword)}
      className="space-y-4 my-10 flex flex-col justify-between"
    >
      <Column className="space-y-2">
        <Label htmlFor="email" required>
          E-mail
        </Label>
        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Column>
              <Input
                id="password"
                placeholder="seuemail@exemplo.com"
                autoComplete="password"
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
        <Label htmlFor="confirmPassword" required>
          Confirmar Senha
        </Label>
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Column>
              <Input
                id="password"
                type="confirmPassword"
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
          disabled={
            pendingCreateNewPassword || formInputFieldIsBlank || !isValid
          }
        >
          <Show when={pendingCreateNewPassword}>
            <Loader2Icon className="animate-spin" />
          </Show>
          Criar Nova Senha
        </Button>
      </Column>
    </form>
  );
};

export default NewPasswordForm;
