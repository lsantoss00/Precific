import { CircleQuestionMark } from "lucide-react";
import { useState } from "react";
import { Button } from "./core";
import { Tooltip, TooltipContent, TooltipTrigger } from "./core/tooltip";

interface CustomTooltipProps {
  message: string | React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  tooltipClassName?: string;
}

const CustomTooltip = ({
  message,
  icon = <CircleQuestionMark size={24} />,
  className,
  tooltipClassName,
}: CustomTooltipProps) => {
  const [openTooltip, setOpenTooltip] = useState<boolean>(false);

  return (
    <Tooltip open={openTooltip} onOpenChange={setOpenTooltip}>
      <TooltipTrigger asChild>
        <Button
          type="button"
          tabIndex={-1}
          className={`${className} bg-transparent shadow-none text-foreground hover:bg-transparent p-1.5! pr-0! h-fit w-fit! cursor-default`}
          onClick={() => setOpenTooltip(!openTooltip)}
          onMouseEnter={() => setOpenTooltip(true)}
          onMouseLeave={() => setOpenTooltip(false)}
          onTouchStart={() => setOpenTooltip(!openTooltip)}
          onKeyDown={(event) => {
            event.preventDefault();
            event.key === "Enter" && setOpenTooltip(!openTooltip);
          }}
        >
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent
        className={`${tooltipClassName} bg-black max-w-55 md:max-w-105 p-2 mr-2`}
      >
        <p className="text-base text-white">{message}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default CustomTooltip;
