import TaxRegimeSelectInput from "@/src/app/(private)/meu-perfil/components/tax-regime-select-input";
import { Button, Input, Label } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Show from "@/src/components/core/show";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const CompanyFormSchema = z.object({
  companyName: z.string().min(1, "O campo nome é obrigatório."),
  cnpj: z.string().min(1, "O campo CNPJ é obrigatório."),
  taxRegime: z.string().min(1, "O campo regime tributário é obrigatório."),
});

type CompanyFormSchemaType = z.infer<typeof CompanyFormSchema>;

const CompanyForm = () => {
  const { handleSubmit, control, watch } = useForm<CompanyFormSchemaType>({
    resolver: zodResolver(CompanyFormSchema),
    defaultValues: {
      companyName: "",
      cnpj: "",
      taxRegime: "",
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

  const handleSubmitCompany = ({
    companyName,
    cnpj,
    taxRegime,
  }: CompanyFormSchemaType) => {
    console.log(companyName, cnpj, taxRegime);
  };

  const { companyName, cnpj, taxRegime } = watch();

  const formInputFieldIsBlank = [companyName, cnpj, taxRegime].some(
    (value) => value === ""
  );

  return (
    <form
      id="company-form"
      onSubmit={handleSubmit(handleSubmitCompany)}
      className="space-y-4 flex flex-col justify-between"
    >
      <Column className="space-y-2">
        <Label htmlFor="companyName" required>
          Nome
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
                  <span className="text-xs text-red-600">{error?.message}</span>
                </Show>
              </div>
            </Column>
          )}
        />
      </Column>
      <Column className="space-y-2">
        <Label htmlFor="cnpj" required>
          CNPJ
        </Label>
        <Controller
          name="cnpj"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Column>
              {/* TO-DO: Substituir por um mask input */}
              <Input
                id="cnpj"
                placeholder="00.000.000/0000-00"
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
                  <span className="text-xs text-red-600">{error?.message}</span>
                </Show>
              </div>
            </Column>
          )}
        />
      </Column>
      <Button
        className="hover:cursor-pointer w-full h-12"
        type="submit"
        // disabled={pendingPostCompany || formInputFieldIsBlank}
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
