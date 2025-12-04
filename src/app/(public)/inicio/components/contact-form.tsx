"use client";

import { postLead } from "@/src/app/(public)/inicio/services/post-lead";
import { Button, Input, Label } from "@/src/components/core";
import { Checkbox } from "@/src/components/core/checkbox";
import Column from "@/src/components/core/column";
import { MaskedInput } from "@/src/components/core/masked-input";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const ContactFormSchema = z.object({
  name: z
    .string()
    .min(1, "O campo nome é obrigatório.")
    .min(3, "O nome deve ter no mínimo 3 caracteres."),
  cnpj: z
    .string()
    .min(1, "O campo CNPJ é obrigatório.")
    .length(14, "CNPJ inválido. Deve conter 14 dígitos."),
  email: z
    .string()
    .min(1, "O campo email é obrigatório.")
    .email("Email inválido."),
  phone: z
    .string()
    .min(1, "O campo telefone é obrigatório.")
    .refine(
      (val) => val.length === 10 || val.length === 11,
      "Telefone inválido. Deve conter 10 ou 11 dígitos."
    ),
  acceptMarketing: z.boolean(),
});

type ContactFormSchemaType = z.infer<typeof ContactFormSchema>;

const ContactForm = () => {
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { isValid },
  } = useForm<ContactFormSchemaType>({
    resolver: zodResolver(ContactFormSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      cnpj: "",
      email: "",
      phone: "",
      acceptMarketing: false,
    },
  });

  const contactMutation = useMutation({
    mutationFn: postLead,
    onSuccess: () => {
      toast.success(
        <span>
          Formulário enviado com sucesso!
          <br />
          Em breve entraremos em contato.
        </span>,
        {
          className: "!bg-green-600 !text-white",
        }
      );
      reset();
    },
    onError: () => {
      toast.error(
        <span>
          Erro ao enviar formulário.
          <br />
          Por favor, tente novamente mais tarde.
        </span>,
        {
          className: "!bg-red-600 !text-white",
        }
      );
    },
  });

  const handleSubmitContactForm = (data: ContactFormSchemaType) => {
    contactMutation.mutate({ lead: data });
  };

  const { name, cnpj, email, phone } = watch();
  const formInputFieldIsBlank = [name, cnpj, email, phone].some(
    (value) => value === ""
  );

  return (
    <form
      id="contactForm"
      onSubmit={handleSubmit(handleSubmitContactForm)}
      className="space-y-3 md:space-y-4 flex flex-col justify-between w-full max-w-sm self-center"
    >
      <Controller
        name="name"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Column>
            <Input
              id="name"
              placeholder="Nome"
              autoComplete="name"
              value={value}
              onChange={onChange}
              className={`bg-black/20 placeholder:text-zinc-400! text-white border-white focus-visible:border-white focus-visible:ring-white/50 h-10 md:h-11 text-sm md:text-base ${
                error && "border-red-600"
              }`}
            />
            <div
              className={`${error ? "h-3" : "h-0"} transition-all duration-200`}
            >
              <Show when={error}>
                <span className="text-xs text-red-600">{error?.message}</span>
              </Show>
            </div>
          </Column>
        )}
      />
      <Controller
        name="cnpj"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Column>
            <MaskedInput
              id="cnpj"
              mask="00.000.000/0000-00"
              placeholder="CNPJ"
              value={value}
              onAccept={onChange}
              unmask={true}
              className={`bg-black/20 placeholder:text-zinc-400! text-white border-white focus-visible:border-white focus-visible:ring-white/50 h-10 md:h-11 text-sm md:text-base ${
                error && "border-red-600"
              }`}
            />
            <div
              className={`${error ? "h-3" : "h-0"} transition-all duration-200`}
            >
              <Show when={error}>
                <span className="text-xs text-red-600">{error?.message}</span>
              </Show>
            </div>
          </Column>
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Column>
            <Input
              id="email"
              placeholder="E-mail"
              autoComplete="email"
              value={value}
              onChange={onChange}
              className={`bg-black/20 placeholder:text-zinc-400! text-white border-white focus-visible:border-white focus-visible:ring-white/50 h-10 md:h-11 text-sm md:text-base ${
                error && "border-red-600"
              }`}
            />
            <div
              className={`${error ? "h-3" : "h-0"} transition-all duration-200`}
            >
              <Show when={error}>
                <span className="text-xs text-red-600">{error?.message}</span>
              </Show>
            </div>
          </Column>
        )}
      />
      <Controller
        name="phone"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          return (
            <Column>
              <MaskedInput
                id="phone"
                mask={[
                  { mask: "(00) 0000-0000" },
                  { mask: "(00) 0 0000-0000" },
                ]}
                placeholder="Telefone"
                value={value}
                onAccept={onChange}
                unmask={true}
                className={`bg-black/20 placeholder:text-zinc-400! text-white border-white focus-visible:border-white focus-visible:ring-white/50 h-10 md:h-11 text-sm md:text-base ${
                  error && "border-red-600"
                }`}
              />
              <div
                className={`${
                  error ? "h-3" : "h-0"
                } transition-all duration-200`}
              >
                <Show when={error}>
                  <span className="text-xs text-red-600">{error?.message}</span>
                </Show>
              </div>
            </Column>
          );
        }}
      />
      <Row className="gap-2 items-center">
        <Controller
          name="acceptMarketing"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Checkbox
              id="acceptMarketing"
              checked={value}
              onCheckedChange={onChange}
              className="bg-black/20! data-[state=checked]:border-white focus-visible:border-white focus-visible:ring-white/50"
            />
          )}
        />
        <Label
          htmlFor="acceptMarketing"
          className="cursor-pointer text-white font-normal text-xs md:text-sm leading-tight"
        >
          Aceito receber comunicações de marketing e promoções exclusivas da
          Precific
        </Label>
      </Row>
      <Button
        className="h-12 md:h-14 text-sm md:text-base"
        type="submit"
        variant="secondary"
        disabled={
          contactMutation.isPending || formInputFieldIsBlank || !isValid
        }
      >
        <Show when={contactMutation.isPending}>
          <Loader2Icon className="animate-spin" />
        </Show>
        Eu quero precificar!
      </Button>
    </form>
  );
};

export default ContactForm;
