"use client";

import { Card, Input, Label } from "@/src/components/core";
import Column from "@/src/components/core/column";

const CompanyData = () => {
  return (
    <Card className="w-full p-6 rounded-md flex space-y-6">
      <h3>Dados da Empresa</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Column className="space-y-2 col-span-2">
          <Label htmlFor="companyName">Nome da Empresa</Label>
          <Input id="companyName" disabled />
        </Column>
        <Column className="space-y-2 col-span-2">
          <Label htmlFor="taxId">CNPJ</Label>
          <Input id="taxId" disabled />
        </Column>
        <Column className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="industrySector">Setor</Label>
          <Input id="industrySector" disabled />
        </Column>
        <Column className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="taxRegime">Regime Tributário</Label>
          <Input id="taxRegime" disabled />
        </Column>
        <Column className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="state">Estado</Label>
          <Input id="state" maxLength={2} disabled />
        </Column>
        <Column className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="postalCode">CEP</Label>
          <Input id="postalCode" disabled />
        </Column>
        <Column className="space-y-2 col-span-2">
          <Label htmlFor="streetAddress">Endereço</Label>
          <Input id="streetAddress" disabled />
        </Column>
        <Column className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="streetNumber">Número</Label>
          <Input id="streetNumber" disabled />
        </Column>
        <Column className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="addressComplement">Complemento</Label>
          <Input id="addressComplement" disabled />
        </Column>
      </div>
    </Card>
  );
};

export default CompanyData;
