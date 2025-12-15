import { CompanyMissionAndValuesTopicType } from "@/src/app/(landing)/(info)/sobre-nos/types/company-mission-and-values-topic-type";
import { Settings, Share2, ShieldCheck } from "lucide-react";

export const companyValuesTopics: CompanyMissionAndValuesTopicType[] = [
  {
    title: "Transparência",
    description:
      "Atuamos com processos claros, critérios objetivos e comunicação direta. Acreditamos que confiança se constrói com informação acessível e decisões bem explicadas.",
    icon: <Settings />,
  },
  {
    title: "Colaboração",
    description:
      "Resultados sólidos não são individuais. Trabalhamos lado a lado com nossos clientes, integrando conhecimento técnico e visão estratégica para decisões mais consistentes e duradouras.",
    icon: <Share2 />,
  },
  {
    title: "Segurança",
    description:
      "Protegemos dados, informações e decisões críticas. Seguimos as melhores práticas do mercado para garantir integridade, confidencialidade e estabilidade em cada processo.",
    icon: <ShieldCheck />,
  },
];
