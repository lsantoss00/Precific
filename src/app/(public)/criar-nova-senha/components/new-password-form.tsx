"use client";

import { Button, Input, Label } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Show from "@/src/components/core/show";
import { createClient } from "@/src/libs/supabase/client";
import { supabaseErrorsTranslator } from "@/src/utils/supabase-errors-translator";
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
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
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
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: doCreateNewPassword, isPending: pendingCreateNewPassword } =
    useMutation({
      mutationFn: createNewPassword,
      onSuccess: async (result) => {
        if (result.error) {
          toast.error(supabaseErrorsTranslator(result.error), {
            className: "!bg-red-600 !text-white",
          });
          return;
        }
        toast.success("Senha atualizada com sucesso!", {
          className: "!bg-green-600 !text-white",
        });

        document.cookie =
          "recovery_mode=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        const supabase = createClient();

        await supabase.auth.signOut();
        router.push("/entrar");
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
      id="new-password-form"
      onSubmit={handleSubmit(handleCreateNewPassword)}
      className="space-y-4 my-10 flex flex-col justify-between"
    >
      <Column className="space-y-2">
        <Label htmlFor="password" required>
          Nova Senha
        </Label>
        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Column>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
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
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
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
