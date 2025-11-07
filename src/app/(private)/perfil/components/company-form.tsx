import {
  REVENUE_RANGE_LABELS,
  SECTOR_LABELS,
  TAX_REGIME_LABELS,
} from "@/src/app/(private)/perfil/constants/company-labels";
import { postCompany } from "@/src/app/(private)/perfil/services/post-company";
import { Button, Input, Label } from "@/src/components/core";
import Column from "@/src/components/core/column";
import { MaskedInput } from "@/src/components/core/masked-input";
import SelectInput from "@/src/components/core/select-input";
import Show from "@/src/components/core/show";
import { queryClient } from "@/src/libs/tanstack-query/query-client";
import { supabaseErrorsTranslator } from "@/src/utils/supabase-errors-translator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const CompanyFormSchema = z
  .object({
    company_name: z.string().min(1, "O campo nome é obrigatório."),
    cnpj: z
      .string()
      .min(14, "O campo CNPJ é obrigatório.")
      .length(14, "CNPJ inválido."),
    sector: z.enum(["business", "industry"], {
      message: "O campo setor é obrigatório.",
    }),
    tax_regime: z.enum(["real_profit", "presumed_profit", "simple_national"], {
      message: "O campo regime tributário é obrigatório.",
    }),
    revenue_range: z
      .enum(["range_1", "range_2", "range_3", "range_4", "range_5", "range_6"])
      .optional(),
    state: z
      .string()
      .min(2, "O campo estado é obrigatório.")
      .max(2, "Estado inválido.")
      .toUpperCase(),
    postal_code: z
      .string()
      .min(8, "O campo CEP é obrigatório.")
      .length(8, "CEP inválido."),
    street_address: z.string().min(1, "O campo endereço é obrigatório."),
    street_number: z.string().min(1, "O campo número é obrigatório."),
    address_complement: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.tax_regime === "simple_national") {
        return data.revenue_range && data.revenue_range.length > 0;
      }
      return true;
    },
    {
      message: "O campo faixa de faturamento é obrigatório.",
      path: ["revenue_range"],
    }
  );

type CompanyFormSchemaType = z.infer<typeof CompanyFormSchema>;

const CompanyForm = () => {
  const { handleSubmit, control, watch } = useForm<CompanyFormSchemaType>({
    resolver: zodResolver(CompanyFormSchema),
    defaultValues: {
      company_name: "",
      cnpj: "",
      sector: undefined,
      tax_regime: undefined,
      revenue_range: undefined,
      state: "",
      postal_code: "",
      street_address: "",
      street_number: "",
      address_complement: "",
    },
  });

  const { mutate: post, isPending: pendingPostCompany } = useMutation({
    mutationFn: postCompany,
    onSuccess: async () => {
      toast.success("Empresa registrada com sucesso!", {
        className: "!bg-green-600 !text-white",
      });
      await queryClient?.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      toast.error(supabaseErrorsTranslator(error.message), {
        className: "!bg-red-600 !text-white",
      });
    },
  });

  const handleSubmitCompany = (company: CompanyFormSchemaType) => {
    post({ company });
  };

  const {
    company_name,
    cnpj,
    sector,
    tax_regime,
    revenue_range,
    state,
    postal_code,
    street_address,
    street_number,
  } = watch();

  const requiredFields = [
    company_name,
    cnpj,
    sector,
    tax_regime,
    state,
    postal_code,
    street_address,
    street_number,
  ];

  if (tax_regime === "simple_national") {
    requiredFields.push(revenue_range || "");
  }

  const formInputFieldIsBlank = requiredFields.some((value) => value === "");

  return (
    <form
      id="company-form"
      onSubmit={handleSubmit(handleSubmitCompany)}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Column className="space-y-2 col-span-2">
          <Label htmlFor="company_name" required>
            Nome da Empresa
          </Label>
          <Controller
            name="company_name"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Column>
                <Input
                  id="company_name"
                  placeholder="Informe o nome da empresa"
                  value={value}
                  onChange={onChange}
                  className={`${error && "border-red-600"}`}
                />
                <div className="h-2 -mt-1">
                  <Show when={error}>
                    <span className="text-xs text-red-600">
                      {error?.message}
                    </span>
                  </Show>
                </div>
              </Column>
            )}
          />
        </Column>
        <Column className="space-y-2 col-span-2">
          <Label htmlFor="cnpj" required>
            CNPJ
          </Label>
          <Controller
            name="cnpj"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Column>
                <MaskedInput
                  id="cnpj"
                  mask="00.000.000/0000-00"
                  placeholder="00.000.000/0000-00"
                  value={value}
                  onAccept={onChange}
                  unmask={true}
                  className={`${error && "border-red-600"}`}
                />
                <div className="h-2 -mt-1">
                  <Show when={error}>
                    <span className="text-xs text-red-600">
                      {error?.message}
                    </span>
                  </Show>
                </div>
              </Column>
            )}
          />
        </Column>
        <Column className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="sector" required>
            Setor
          </Label>
          <Controller
            name="sector"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Column>
                <SelectInput
                  triggerProps={{
                    id: "sector",
                  }}
                  options={sectorSelectOptions}
                  value={value}
                  placeholder={"Selecione o setor de atuação"}
                  onChange={onChange}
                  className={`${error && "border-red-600"}`}
                />
                <div className="h-2 -mt-1">
                  <Show when={error}>
                    <span className="text-xs text-red-600">
                      {error?.message}
                    </span>
                  </Show>
                </div>
              </Column>
            )}
          />
        </Column>
        <Column className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="tax_regime" required>
            Regime Tributário
          </Label>
          <Controller
            name="tax_regime"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Column>
                <SelectInput
                  triggerProps={{
                    id: "tax_regime",
                  }}
                  placeholder={"Selecione o regime tributário"}
                  options={taxRegimesSelectOptions}
                  value={value}
                  onChange={onChange}
                  className={`${error && "border-red-600"}`}
                />
                <div className="h-2 -mt-1">
                  <Show when={error}>
                    <span className="text-xs text-red-600">
                      {error?.message}
                    </span>
                  </Show>
                </div>
              </Column>
            )}
          />
        </Column>
        <Show when={tax_regime === "simple_national"}>
          <Column className="space-y-2 col-span-2">
            <Label htmlFor="revenue_range" required>
              Faixa de Faturamento
            </Label>
            <Controller
              name="revenue_range"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Column>
                  <SelectInput
                    triggerProps={{
                      id: "revenue_range",
                    }}
                    options={revenueRangeSelectOptions}
                    value={value || ""}
                    placeholder={"Selecione a faixa de faturamento"}
                    onChange={onChange}
                    className={`${error && "border-red-600"}`}
                  />
                  <div className="h-2 -mt-1">
                    <Show when={error}>
                      <span className="text-xs text-red-600">
                        {error?.message}
                      </span>
                    </Show>
                  </div>
                </Column>
              )}
            />
          </Column>
        </Show>
        <Column className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="state" required>
            Estado
          </Label>
          <Controller
            name="state"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Column>
                <Input
                  id="state"
                  placeholder="UF"
                  maxLength={2}
                  value={value}
                  onChange={(e) => onChange(e.target.value.toUpperCase())}
                  className={`${error && "border-red-600"}`}
                />
                <div className="h-2 -mt-1">
                  <Show when={error}>
                    <span className="text-xs text-red-600">
                      {error?.message}
                    </span>
                  </Show>
                </div>
              </Column>
            )}
          />
        </Column>
        <Column className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="postal_code" required>
            CEP
          </Label>
          <Controller
            name="postal_code"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Column>
                <MaskedInput
                  id="postal_code"
                  mask="00000-000"
                  placeholder="00000-000"
                  value={value}
                  onAccept={onChange}
                  unmask={true}
                  className={`${error && "border-red-600"}`}
                />
                <div className="h-2 -mt-1">
                  <Show when={error}>
                    <span className="text-xs text-red-600">
                      {error?.message}
                    </span>
                  </Show>
                </div>
              </Column>
            )}
          />
        </Column>
        <Column className="space-y-2 col-span-2">
          <Label htmlFor="street_address" required>
            Endereço
          </Label>
          <Controller
            name="street_address"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Column>
                <Input
                  id="street_address"
                  placeholder="Informe o endereço"
                  value={value}
                  onChange={onChange}
                  className={`${error && "border-red-600"}`}
                />
                <div className="h-2 -mt-1">
                  <Show when={error}>
                    <span className="text-xs text-red-600">
                      {error?.message}
                    </span>
                  </Show>
                </div>
              </Column>
            )}
          />
        </Column>
        <Column className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="street_number" required>
            Número
          </Label>
          <Controller
            name="street_number"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Column>
                <Input
                  id="street_number"
                  placeholder="Nº"
                  value={value}
                  onChange={onChange}
                  className={`${error && "border-red-600"}`}
                />
                <div className="h-2 -mt-1">
                  <Show when={error}>
                    <span className="text-xs text-red-600">
                      {error?.message}
                    </span>
                  </Show>
                </div>
              </Column>
            )}
          />
        </Column>
        <Column className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="address_complement">Complemento</Label>
          <Controller
            name="address_complement"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Column>
                <Input
                  id="address_complement"
                  placeholder="Apto, bloco, torre, loja"
                  value={value}
                  onChange={onChange}
                  className={`${error && "border-red-600"}`}
                />
                <div className="h-2 -mt-1">
                  <Show when={error}>
                    <span className="text-xs text-red-600">
                      {error?.message}
                    </span>
                  </Show>
                </div>
              </Column>
            )}
          />
        </Column>
      </div>
      <Button
        className="hover:cursor-pointer w-full h-12 mt-6"
        type="submit"
        disabled={formInputFieldIsBlank || pendingPostCompany}
      >
        <Show when={pendingPostCompany}>
          <Loader2Icon className="animate-spin" />
        </Show>
        Cadastrar
      </Button>
    </form>
  );
};

export default CompanyForm;

const sectorSelectOptions = [
  { value: "business", label: SECTOR_LABELS.business },
  { value: "industry", label: SECTOR_LABELS.industry },
];

const taxRegimesSelectOptions = [
  { value: "real_profit", label: TAX_REGIME_LABELS.real_profit },
  { value: "presumed_profit", label: TAX_REGIME_LABELS.presumed_profit },
  { value: "simple_national", label: TAX_REGIME_LABELS.simple_national },
];

const revenueRangeSelectOptions = [
  { value: "range_1", label: REVENUE_RANGE_LABELS.range_1 },
  { value: "range_2", label: REVENUE_RANGE_LABELS.range_2 },
  { value: "range_3", label: REVENUE_RANGE_LABELS.range_3 },
  { value: "range_4", label: REVENUE_RANGE_LABELS.range_4 },
  { value: "range_5", label: REVENUE_RANGE_LABELS.range_5 },
  { value: "range_6", label: REVENUE_RANGE_LABELS.range_6 },
];
