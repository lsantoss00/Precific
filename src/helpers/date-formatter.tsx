import { format, isValid, parseISO } from "date-fns";

export const dateFormatter = (dateAsString: string, showTime?: boolean) => {
  const date = parseISO(dateAsString);
  if (!isValid(date)) return undefined;
  return showTime
    ? format(date, "dd/MM/yyyy 'às' HH:mm:ss")
    : format(date, "dd/MM/yyyy");
};
