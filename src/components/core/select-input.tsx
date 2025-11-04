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

interface SelectInputProps {
  options: {
    value: string;
    label: string;
  }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  triggerProps?: Omit<
    ComponentProps<typeof SelectTrigger>,
    "children" | "className"
  >;
}

const SelectInput = ({
  options,
  value,
  onChange,
  placeholder,
  className,
  triggerProps,
}: SelectInputProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        {...triggerProps}
        className={twMerge("w-full text-base", className)}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectInput;
