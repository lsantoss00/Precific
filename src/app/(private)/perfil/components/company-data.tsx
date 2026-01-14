"use client";

import {
  REVENUE_RANGE_LABELS,
  SECTOR_LABELS,
  TAX_REGIME_LABELS,
} from "@/src/app/(private)/perfil/constants/company-labels";
import { stateSelectOptions } from "@/src/app/(private)/produtos/components/select-state-input";
import { Card, Input, Label } from "@/src/components/core";
import Column from "@/src/components/core/column";
import { MaskedInput } from "@/src/components/core/masked-input";
import Show from "@/src/components/core/show";
import { useAuth } from "@/src/providers/auth-provider";

const CompanyData = () => {
  const { company } = useAuth();

  const isSimpleNational = company?.tax_regime === "simple_national";

  const stateLabel =
    stateSelectOptions.find((state) => state.value === company?.state)?.label ??
    "";

  return (
    <Card className="w-full p-6 rounded-md flex space-y-4 flex-1">
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
          <MaskedInput
            id="cnpj"
            mask="00.000.000/0000-00"
            value={company?.cnpj ?? ""}
            unmask={true}
            disabled
          />
        </Column>
        <Column
          className={`space-y-2 ${
            isSimpleNational ? "col-span-2" : "col-span-2 md:col-span-1"
          }`}
        >
          <Label htmlFor="sector">Setor</Label>
          <Input
            id="sector"
            disabled
            value={SECTOR_LABELS[company?.sector as keyof typeof SECTOR_LABELS]}
          />
        </Column>
        <Column className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="tax_regime">Regime Tributário</Label>
          <Input
            id="tax_regime"
            disabled
            value={
              TAX_REGIME_LABELS[
                company?.tax_regime as keyof typeof TAX_REGIME_LABELS
              ]
            }
          />
        </Column>
        <Show when={isSimpleNational}>
          <Column className="space-y-2 col-span-2 md:col-span-1">
            <Label htmlFor="revenue_range">Faixa de Faturamento</Label>
            <Input
              id="revenue_range"
              disabled
              value={
                REVENUE_RANGE_LABELS[
                  company?.revenue_range as keyof typeof REVENUE_RANGE_LABELS
                ]
              }
            />
          </Column>
        </Show>
        <Column className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="state">Estado</Label>
          <Input id="state" maxLength={2} disabled value={stateLabel} />
        </Column>
        <Column className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="postal_code">CEP</Label>
          <MaskedInput
            id="cnpj"
            mask="00000-000"
            value={company?.postal_code ?? ""}
            unmask={true}
            disabled
          />
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
