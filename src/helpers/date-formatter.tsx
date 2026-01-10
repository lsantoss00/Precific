import { format, isValid, parseISO } from "date-fns";

interface DateFormatterProps {
  children: string | undefined;
  showTime?: boolean;
}

const dateFormatter = (dateAsString: string, showTime?: boolean) => {
  const date = parseISO(dateAsString);
  if (!isValid(date)) return undefined;
  return showTime
    ? format(date, "dd/MM/yyyy 'às' HH:mm:ss")
    : format(date, "dd/MM/yyyy");
};

const DateFormatter = ({ children, showTime = false }: DateFormatterProps) => {
  if (!children) return null;
  const date = parseISO(children);
  if (!isValid(date)) return null;
  return <>{dateFormatter(children, showTime)}</>;
};

export default DateFormatter;
