"use client";

import { getCurrentDay } from "@/src/app/(private)/suporte/utils/get-current-day";
import {
  getScheduleStatus,
  getScheduleStatusClassName,
} from "@/src/app/(private)/suporte/utils/get-schedule-status";
import { openingHours } from "@/src/app/(private)/suporte/utils/opening-hours";
import Column from "@/src/components/core/column";
import Row from "@/src/components/core/row";
import { CircleAlert, Clock } from "lucide-react";
import { useEffect, useState } from "react";

const OpeningHoursSection = () => {
  const [currentDay, setCurrentDay] = useState<string>("");

  useEffect(() => {
    setCurrentDay(getCurrentDay());
  }, []);

  return (
    <Column className="gap-3">
      <Row className="items-center gap-2 text-sm font-medium text-card-foreground">
        <Clock className="h-4 w-4" />
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
      <Row className="gap-2 text-xs text-muted-foreground mt-2 pt-2 border-t">
        <CircleAlert className="h-3.5 w-3.5 mt-0.5 shrink-0" />
        <span>Não funcionamos em feriados.</span>
      </Row>
    </Column>
  );
};

export default OpeningHoursSection;
