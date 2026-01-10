import { CompanyMissionAndValuesTopicType } from "@/src/app/(landing)/(info)/sobre-nos/types/company-mission-and-values-topic-type";
import { Settings, User } from "lucide-react";

export const companyMissionTopics: CompanyMissionAndValuesTopicType[] = [
  {
    title: "Propósito",
    description:
      "Existimos para desenvolver, orientar e servir empresas por meio de soluções que unem conhecimento técnico, estratégia e tecnologia, promovendo crescimento sustentável e decisões mais seguras.",
    icon: <User />,
  },
  {
    title: "Missão",
    description:
      "Apoiar empresas na construção de estruturas mais sólidas, eficientes e preparadas para o futuro, oferecendo serviços e soluções que gerem clareza, controle e valor de longo prazo.",
    icon: <Settings />,
  },
];
