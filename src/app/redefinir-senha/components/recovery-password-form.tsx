"use client";

import { Button, Input, Label } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Show from "@/src/components/core/show";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const RecoveryPasswordSchema = z.object({
  email: z.string().min(1, "O campo email é obrigatório."),
});

type RecoveryPasswordSchemaType = z.infer<typeof RecoveryPasswordSchema>;

const RecoveryPasswordForm = () => {
  const router = useRouter();

  const { handleSubmit, control, watch } = useForm<RecoveryPasswordSchemaType>({
    resolver: zodResolver(RecoveryPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // const { mutate: doRecoveryPassword, isPending: pendingRecoveryPassword } = useMutation({
  //   mutationFn: recoveryPassword,
  //   onSuccess: () => null,
  //   onError: (error) => {
  //     toast.error(error.message, {
  //       className: "!bg-red-600/80 !text-white",
  //     });
  //   },
  // });

  // const handleRecoveryPassword = ({ email }: LoginFormSchemaType) => {
  //   login({ email });
  // };

  const { email } = watch();
  const formInputFieldIsBlank = [email].some((value) => value === "");

  return (
    <form
      id="login-form"
      // onSubmit={handleSubmit(handleRecoveryPassword)}
      className="space-y-4 my-10 flex flex-col justify-between"
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
      <Column className="mt-5">
        <Button
          className="hover:cursor-pointer w-full"
          type="submit"
          // disabled={pendingLogin || formInputFieldIsBlank}
        >
          {/* <Show when={pendingLogin}>
            <Loader2Icon className="animate-spin" />
          </Show> */}
          Enviar instruções
        </Button>
        <Link href="/entrar" className="flex self-center w-fit" passHref>
          <Button type="button" variant="link" className="text-white">
            Voltar ao Login
          </Button>
        </Link>
      </Column>
    </form>
  );
};

export default RecoveryPasswordForm;
