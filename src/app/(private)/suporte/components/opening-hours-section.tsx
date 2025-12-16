import { openingHours } from "@/src/app/(private)/suporte/constants/opening-hours";
import { getCurrentDay } from "@/src/app/(private)/suporte/utils/date-utils";
import {
  getScheduleStatus,
  getScheduleStatusClassName,
} from "@/src/app/(private)/suporte/utils/schedule-utils";
import Column from "@/src/components/core/column";
import Row from "@/src/components/core/row";
import { Clock } from "lucide-react";

const OpeningHoursSection = () => {
  const currentDay = getCurrentDay();

  return (
    <Column as="section" className="gap-3">
      <Row className="items-center gap-2 text-sm font-medium">
        <Clock className="h-4 w-4 text-primary" />
        <span>Horário de Funcionamento</span>
      </Row>
      <Column className="gap-2">
        {openingHours.map((schedule) => {
          const scheduleStatus = getScheduleStatus(schedule, currentDay);
          return (
            <Row
              key={schedule.day}
              className="justify-between items-center text-sm py-1"
            >
              <span className={getScheduleStatusClassName(scheduleStatus)}>
                {schedule.day}
              </span>
              <span className={getScheduleStatusClassName(scheduleStatus)}>
                {schedule.hours}
              </span>
            </Row>
          );
        })}
      </Column>
    </Column>
  );
};

export default OpeningHoursSection;
