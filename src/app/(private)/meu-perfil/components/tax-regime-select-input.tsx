import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/core";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface TaxRegimeSelectInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  triggerProps?: Omit<
    ComponentProps<typeof SelectTrigger>,
    "children" | "className"
  >;
}

const TaxRegimeSelectInput = ({
  value,
  onChange,
  className,
  triggerProps,
}: TaxRegimeSelectInputProps) => {
  const taxRegimes = [
    { value: "realProfit", label: "Lucro Real" },
    { value: "presumedProfit", label: "Lucro Presumido" },
    { value: "simpleNational", label: "Simples Nacional" },
  ];

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        {...triggerProps}
        className={twMerge("w-full text-base", className)}
      >
        <SelectValue placeholder="Selecione o regime tributário" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {taxRegimes.map((taxRegime) => (
            <SelectItem key={taxRegime.value} value={taxRegime.value}>
              {taxRegime.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default TaxRegimeSelectInput;
