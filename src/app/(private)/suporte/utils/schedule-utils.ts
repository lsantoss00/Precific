import { openingHours } from "@/src/app/(private)/suporte/constants/opening-hours";

type ScheduleStatusType = "open" | "closing" | "closed" | null;

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

  // TO-DO: Fix this - We need to get the closing time from the schedule
  const closingTimeInMinutes = 18 * 60;
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
