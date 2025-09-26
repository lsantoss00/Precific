import { format, isValid, parseISO } from "date-fns";

interface DateFormatterProps {
  children: string | undefined;
}

const dateFormatter = (dateAsString: string) => {
  const date = parseISO(dateAsString);
  return isValid(date) ? format(date, "dd/MM/yyyy") : undefined;
};

const DateFormatter = ({ children }: DateFormatterProps) => {
  if (!children) return;
  const date = parseISO(children);
  if (!isValid(date)) return null;
  return <>{dateFormatter(children)}</>;
};

export default DateFormatter;
