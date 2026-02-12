import { CircleQuestionMark } from "lucide-react";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./core/tooltip";

interface CustomTooltipProps {
  message: string | React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  tooltipClassName?: string;
}

const CustomTooltip = ({
  message,
  icon = <CircleQuestionMark size={16} />,
  className,
  tooltipClassName,
}: CustomTooltipProps) => {
  const [openTooltip, setOpenTooltip] = useState<boolean>(false);

  return (
    <Tooltip open={openTooltip} onOpenChange={setOpenTooltip}>
      <TooltipTrigger asChild>
        <span
          tabIndex={-1}
          className={`${className} bg-transparent shadow-none text-foreground hover:bg-transparent h-fit w-fit! cursor-default p-0! m-0!`}
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
        </span>
      </TooltipTrigger>
      <TooltipContent
        align="end"
        className={`${tooltipClassName} bg-black max-w-55 md:max-w-105`}
      >
        <p className="text-base text-white">{message}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default CustomTooltip;
