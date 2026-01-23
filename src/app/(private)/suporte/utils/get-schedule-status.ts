import { openingHours } from "@/src/app/(private)/suporte/utils/opening-hours";

type ScheduleStatusType = "open" | "closing" | "closed" | null;

const parseOpeningAndClosingTime = (
  hoursString: string
): { opening: number | null; closing: number | null } => {
  const match = hoursString.match(/(\d+)h(\d+)?\s*-\s*(\d+)h(\d+)?/);
  if (!match) return { opening: null, closing: null };
  const openingHour = parseInt(match[1], 10);
  const openingMinute = match[2] ? parseInt(match[2], 10) : 0;
  const closingHour = parseInt(match[3], 10);
  const closingMinute = match[4] ? parseInt(match[4], 10) : 0;
  return {
    opening: openingHour * 60 + openingMinute,
    closing: closingHour * 60 + closingMinute,
  };
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

  const { opening: openingTimeInMinutes, closing: closingTimeInMinutes } =
    parseOpeningAndClosingTime(schedule.hours);

  if (openingTimeInMinutes === null || closingTimeInMinutes === null) {
    return null;
  }

  if (currentTimeInMinutes < openingTimeInMinutes) {
    return "closed";
  }

  if (currentTimeInMinutes >= closingTimeInMinutes) {
    return "closed";
  }

  const oneHourBeforeClosing = closingTimeInMinutes - 60;

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
