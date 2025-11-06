"use client";

import { getCompanyById } from "@/src/app/(private)/perfil/services/get-company-by-id";
import { Card, Input, Label } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Show from "@/src/components/core/show";
import { useAuth } from "@/src/providers/auth-provider";
import { useQuery } from "@tanstack/react-query";

const CompanyData = () => {
  const { profile } = useAuth();

  const companyId = profile?.company_id;

  const { data: company } = useQuery({
    queryFn: () => getCompanyById({ companyId }),
    queryKey: ["company", companyId],
  });

  const isSimpleNational = company?.tax_regime === "simple_national";

  return (
    <Card className="w-full p-6 rounded-md flex space-y-6">
      <h3>Dados da Empresa</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Column className="space-y-2 col-span-2">
          <Label htmlFor="company_name">Nome da Empresa</Label>
          <Input
            id="company_name"
            disabled
            value={company?.company_name ?? ""}
          />
        </Column>
        <Column className="space-y-2 col-span-2">
          <Label htmlFor="cnpj">CNPJ</Label>
          <Input id="cnpj" disabled value={company?.cnpj ?? ""} />
        </Column>
        <Column
          className={`space-y-2 ${
            isSimpleNational ? "col-span-2" : "col-span-2 md:col-span-1"
          }`}
        >
          <Label htmlFor="sector">Setor</Label>
          <Input id="sector" disabled value={company?.sector ?? ""} />
        </Column>
        <Column className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="tax_regime">Regime Tributário</Label>
          <Input id="tax_regime" disabled value={company?.tax_regime ?? ""} />
        </Column>
        <Show when={isSimpleNational}>
          <Column className="space-y-2 col-span-2 md:col-span-1">
            <Label htmlFor="revenue_range">Faixa de Faturamento</Label>
            <Input
              id="revenue_range"
              disabled
              value={company?.revenue_range ?? ""}
            />
          </Column>
        </Show>
        <Column className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="state">Estado</Label>
          <Input
            id="state"
            maxLength={2}
            disabled
            value={company?.state ?? ""}
          />
        </Column>
        <Column className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="postal_code">CEP</Label>
          <Input id="postal_code" disabled value={company?.postal_code ?? ""} />
        </Column>
        <Column className="space-y-2 col-span-2">
          <Label htmlFor="street_address">Endereço</Label>
          <Input
            id="street_address"
            disabled
            value={company?.street_address ?? ""}
          />
        </Column>
        <Column className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="street_number">Número</Label>
          <Input
            id="street_number"
            disabled
            value={company?.street_number ?? ""}
          />
        </Column>
        <Column className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="address_complement">Complemento</Label>
          <Input
            id="address_complement"
            disabled
            value={company?.address_complement ?? ""}
          />
        </Column>
      </div>
    </Card>
  );
};

export default CompanyData;
