import { openingHours } from "@/src/app/(private)/suporte/constants/opening-hours";

type ScheduleStatusType = "open" | "closing" | "closed" | null;

const parseClosingTime = (hoursString: string): number | null => {
  // Captura o horário após o " - " (segunda parte) -- (definido em opening-hours.tsx)
  const match = hoursString.match(/\d+h\d*\s*-\s*(\d+)h(\d+)?/);

  if (!match) return null;

  const closingHour = parseInt(match[1], 10);
  const closingMinute = match[2] ? parseInt(match[2], 10) : 0;

  return closingHour * 60 + closingMinute;
};

export const getScheduleStatus = (
  schedule: (typeof openingHours)[0],
  currentDay: string
): ScheduleStatusType => {
  const isToday = schedule.day === currentDay;

  if (!isToday || !schedule.isOpen) {
    return null;
  }

  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeInMinutes = currentHour * 60 + currentMinute;

  const closingTimeInMinutes = parseClosingTime(schedule.hours);

  if (closingTimeInMinutes === null) {
    return null;
  }

  const oneHourBeforeClosing = closingTimeInMinutes - 60;

  if (currentTimeInMinutes >= closingTimeInMinutes) {
    return "closed";
  }

  if (currentTimeInMinutes >= oneHourBeforeClosing) {
    return "closing";
  }

  return "open";
};

export const getScheduleStatusClassName = (
  status: ScheduleStatusType
): string => {
  if (status === "closed") {
    return "text-red-600 dark:text-red-400 font-semibold";
  }
  if (status === "closing") {
    return "text-orange-600 dark:text-orange-400 font-semibold";
  }
  if (status === "open") {
    return "text-green-600 dark:text-green-400 font-semibold";
  }
  return "text-muted-foreground";
};
