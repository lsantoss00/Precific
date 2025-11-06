"use client";

import { Card, Input, Label } from "@/src/components/core";
import Column from "@/src/components/core/column";

const CompanyData = () => {
  return (
    <Card className="w-full p-6 rounded-md flex space-y-6">
      <h3>Dados da Empresa</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Column className="space-y-2 col-span-2">
          <Label htmlFor="company_name">Nome da Empresa</Label>
          <Input id="company_name" disabled />
        </Column>
        <Column className="space-y-2 col-span-2">
          <Label htmlFor="cnpj">CNPJ</Label>
          <Input id="cnpj" disabled />
        </Column>
        <Column className="space-y-2 col-span-2">
          <Label htmlFor="sector">Setor</Label>
          <Input id="sector" disabled />
        </Column>
        <Column className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="tax_regime">Regime Tributário</Label>
          <Input id="tax_regime" disabled />
        </Column>
        {/* TO-DO: Mostrar apenas quando o regime tributário for Simples Nacional */}
        {/* <Show> */}
        <Column className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="revenue_range">Faixa de Faturamento</Label>
          <Input id="revenue_range" disabled />
        </Column>
        {/* </Show> */}
        <Column className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="state">Estado</Label>
          <Input id="state" maxLength={2} disabled />
        </Column>
        <Column className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="postal_code">CEP</Label>
          <Input id="postal_code" disabled />
        </Column>
        <Column className="space-y-2 col-span-2">
          <Label htmlFor="street_address">Endereço</Label>
          <Input id="street_address" disabled />
        </Column>
        <Column className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="street_number">Número</Label>
          <Input id="street_number" disabled />
        </Column>
        <Column className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="address_complement">Complemento</Label>
          <Input id="address_complement" disabled />
        </Column>
      </div>
    </Card>
  );
};

export default CompanyData;
