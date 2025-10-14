import { CircleQuestionMark } from "lucide-react";
import { useState } from "react";
import { Button } from "./core";
import { Tooltip, TooltipContent, TooltipTrigger } from "./core/tooltip";

interface FormFieldsTooltipProps {
  message: string;
}

const FormFieldTooltip = ({ message }: FormFieldsTooltipProps) => {
  const [openTooltip, setOpenTooltip] = useState<boolean>(false);

  return (
    <Tooltip open={openTooltip} onOpenChange={setOpenTooltip}>
      <TooltipTrigger asChild>
        <Button
          type="button"
          tabIndex={-1}
          className="bg-transparent shadow-none text-primary hover:bg-transparent !p-0 h-fit cursor-default"
          onClick={() => setOpenTooltip(!openTooltip)}
          onMouseEnter={() => setOpenTooltip(true)}
          onMouseLeave={() => setOpenTooltip(false)}
          onTouchStart={() => setOpenTooltip(!openTooltip)}
          onKeyDown={(event) => {
            event.preventDefault();
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            event.key === "Enter" && setOpenTooltip(!openTooltip);
          }}
        >
          <CircleQuestionMark size={24} />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{message}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default FormFieldTooltip;
