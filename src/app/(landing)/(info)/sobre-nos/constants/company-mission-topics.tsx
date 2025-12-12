import { CompanyMissionAndValuesTopicType } from "@/src/app/(landing)/(info)/sobre-nos/types/company-mission-and-values-topic-type";
import { Settings, User } from "lucide-react";

export const companyMissionTopics: CompanyMissionAndValuesTopicType[] = [
  {
    title: "Propósito",
    description:
      "Nascemos para desenvolver, encorajar, servir e impactar pessoas pela tecnologia",
    icon: <User />,
  },
  {
    title: "Missão",
    description:
      "Impactar empresas por meio de serviços e soluções financeiras de nível world-class.",
    icon: <Settings />,
  },
];
