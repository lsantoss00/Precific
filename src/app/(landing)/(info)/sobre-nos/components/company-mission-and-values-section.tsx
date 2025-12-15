"use client";

import { companyMissionTopics } from "@/src/app/(landing)/(info)/sobre-nos/constants/company-mission-topics";
import { companyValuesTopics } from "@/src/app/(landing)/(info)/sobre-nos/constants/company-values-topics";
import { Container } from "@/src/components/core";
import Column from "@/src/components/core/column";
import SectionWithBackground from "@/src/components/section-with-background";
import { Award, Goal } from "lucide-react";
import CompanySectionBlock from "./company-section-block";
import CompanyTopicCard from "./company-topic-card";

const CompanyMissionAndValuesSection = () => {
  return (
    <SectionWithBackground className="w-full">
      <Container variant="section" className="space-y-20 py-16">
        <Column className="space-y-12 lg:flex-row lg:space-x-24 justify-between w-full">
          <CompanySectionBlock
            icon={<Award className="text-secondary" />}
            title="Nossos Valores"
            heading="Nossos valores evoluíram conosco à medida que a empresa crescia e aprendemos com nossas experiências."
            description="Eles resumem o que queremos alcançar e podem mudar no futuro, à medida que almejamos cada vez mais alto. Pensamos nesses valores como importantes para nossa cultura e senso individual de realização."
          />
          <Column className="space-y-6">
            {companyValuesTopics.map((value) => (
              <CompanyTopicCard
                key={value.title}
                icon={value.icon}
                title={value.title}
                description={value.description}
              />
            ))}
          </Column>
        </Column>
        <Column className="space-y-12 lg:flex-row lg:space-x-24 justify-between w-full">
          <CompanySectionBlock
            icon={<Goal className="text-secondary" />}
            title="Nossa Missão"
            heading="Nossa missão guia nosso caminho e inspira cada passo que damos para gerar impacto real e duradouro."
          />
          <Column className="space-y-6">
            {companyMissionTopics.map((mission) => (
              <CompanyTopicCard
                key={mission.title}
                icon={mission.icon}
                title={mission.title}
                description={mission.description}
              />
            ))}
          </Column>
        </Column>
      </Container>
    </SectionWithBackground>
  );
};

export default CompanyMissionAndValuesSection;
