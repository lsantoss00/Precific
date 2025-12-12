import { CompanyMissionAndValuesTopicType } from "@/src/app/(landing)/(info)/sobre-nos/types/company-mission-and-values-topic-type";
import { Settings, User } from "lucide-react";

export const companyMissionTopics: CompanyMissionAndValuesTopicType[] = [
  {
    title: "Propósito",
    description:
      "Nascemos para desenvolver, encorajar, servir e impactar pessoas pela tecnologia, design & inovação.",
    icon: <User />,
  },
  {
    title: "Missão",
    description:
      "Acelerar e impactar pessoas e negócios através do desenvolvimento de soluções digitais world-class.",
    icon: <Settings />,
  },
];
