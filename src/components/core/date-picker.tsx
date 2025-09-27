"use client";
import DateFormatter from "@/src/helpers/date-formatter";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { pt } from "react-day-picker/locale";
import { Button } from "./button";
import { Calendar } from "./calendar";

import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import Show from "./show";

interface DatePickerProps {
  value?: Date;
  onValueChange: (date: Date | undefined) => void;
}

function DatePicker({ value, onValueChange }: DatePickerProps) {
  const [open, setOpen] = useState<boolean>(false);

  const transactionDateFormatted = value && value?.toISOString();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date-picker"
          className="w-full justify-between font-normal text-base"
        >
          <Show when={value} fallback={"Selecione a data"}>
            <DateFormatter>{transactionDateFormatted}</DateFormatter>
          </Show>
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="overflow-hidden p-0 w-fit">
        <Calendar
          locale={pt}
          mode="single"
          selected={value}
          defaultMonth={value}
          onSelect={(date) => {
            onValueChange(date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

export default DatePicker;
