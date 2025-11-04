import TaxRegimeSelectInput from "@/src/app/(private)/meu-perfil/components/tax-regime-select-input";
import { Button, Input, Label } from "@/src/components/core";
import Column from "@/src/components/core/column";
import { MaskedInput } from "@/src/components/core/masked-input";
import Show from "@/src/components/core/show";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const CompanyFormSchema = z.object({
  companyName: z.string().min(1, "O campo nome é obrigatório."),
  cnpj: z
    .string()
    .min(14, "O campo CNPJ é obrigatório.")
    .length(14, "CNPJ inválido."),
  industrySector: z.string().min(1, "O campo setor é obrigatório."),
  taxRegime: z.string().min(1, "O campo regime tributário é obrigatório."),
  state: z
    .string()
    .min(2, "O campo estado é obrigatório.")
    .max(2, "Estado inválido."),
  postalCode: z
    .string()
    .min(8, "O campo CEP é obrigatório.")
    .length(8, "CEP inválido."),
  streetAddress: z.string().min(1, "O campo endereço é obrigatório."),
  streetNumber: z.string().min(1, "O campo número é obrigatório."),
  addressComplement: z.string().optional(),
});

type CompanyFormSchemaType = z.infer<typeof CompanyFormSchema>;

const CompanyForm = () => {
  const { handleSubmit, control, watch } = useForm<CompanyFormSchemaType>({
    resolver: zodResolver(CompanyFormSchema),
    defaultValues: {
      companyName: "",
      cnpj: "",
      industrySector: "",
      taxRegime: "",
      state: "",
      postalCode: "",
      streetAddress: "",
      streetNumber: "",
      addressComplement: "",
    },
  });

  // const { mutate: doLogin, isPending: pendingLogin } = useMutation({
  //   mutationFn: postCompany,
  //   onSuccess: (result) => {
  //     if (result.error) {
  //       toast.error(supabaseErrorsTranslator(result.error), {
  //         className: "!bg-red-600 !text-white",
  //       });
  //       return;
  //     }
  //     router.push("/produtos");
  //     router.refresh();
  //   },
  // });

  const handleSubmitCompany = (data: CompanyFormSchemaType) => {
    console.log(data);
  };

  const {
    companyName,
    cnpj,
    industrySector,
    taxRegime,
    state,
    postalCode,
    streetAddress,
    streetNumber,
  } = watch();

  const formInputFieldIsBlank = [
    companyName,
    cnpj,
    industrySector,
    taxRegime,
    state,
    postalCode,
    streetAddress,
    streetNumber,
  ].some((value) => value === "");

  return (
    <form
      id="company-form"
      onSubmit={handleSubmit(handleSubmitCompany)}
      className="space-y-4 "
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Column className="space-y-2 col-span-2">
          <Label htmlFor="companyName" required>
            Nome da Empresa
          </Label>
          <Controller
            name="companyName"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Column>
                <Input
                  id="companyName"
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
        <Column className="space-y-2 col-span-2">
          <Label htmlFor="industrySector" required>
            Setor
          </Label>
          <Controller
            name="industrySector"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Column>
                <Input
                  id="industrySector"
                  placeholder="Informe o setor"
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
          <Label htmlFor="taxRegime" required>
            Regime Tributário
          </Label>
          <Controller
            name="taxRegime"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Column>
                <TaxRegimeSelectInput
                  triggerProps={{
                    id: "taxRegime",
                  }}
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
          <Label htmlFor="postalCode" required>
            CEP
          </Label>
          <Controller
            name="postalCode"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Column>
                <MaskedInput
                  id="postalCode"
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
          <Label htmlFor="streetAddress" required>
            Endereço
          </Label>
          <Controller
            name="streetAddress"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Column>
                <Input
                  id="streetAddress"
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
          <Label htmlFor="streetNumber" required>
            Número
          </Label>
          <Controller
            name="streetNumber"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Column>
                <Input
                  id="streetNumber"
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
          <Label htmlFor="addressComplement">Complemento</Label>
          <Controller
            name="addressComplement"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Column>
                <Input
                  id="addressComplement"
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
        disabled={formInputFieldIsBlank}
      >
        {/* <Show when={pendingPostCompany}>
          <Loader2Icon className="animate-spin" />
        </Show> */}
        Cadastrar
      </Button>
    </form>
  );
};

export default CompanyForm;
