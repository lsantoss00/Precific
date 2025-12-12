import { CompanyMissionAndValuesTopicType } from "@/src/app/(landing)/(info)/sobre-nos/types/company-mission-and-values-topic-type";
import { Settings, Share2, ShieldCheck } from "lucide-react";

export const companyValuesTopics: CompanyMissionAndValuesTopicType[] = [
  {
    title: "Transparência",
    description:
      "Acreditamos em processos claros e comunicação aberta com nossos clientes.",
    icon: <Settings />,
  },
  {
    title: "Colaboração",
    description:
      "Trabalhamos juntos para alcançar resultados melhores e inovadores.",
    icon: <Share2 />,
  },
  {
    title: "Segurança",
    description:
      "Protegemos os dados dos nossos clientes com as melhores práticas do mercado.",
    icon: <ShieldCheck />,
  },
];
