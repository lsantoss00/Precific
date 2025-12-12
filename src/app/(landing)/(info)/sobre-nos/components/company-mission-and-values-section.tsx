"use client";

import backgroundSectionImage from "@/public/images/hero-section-background.webp";
import { companyMissionTopics } from "@/src/app/(landing)/(info)/sobre-nos/constants/company-mission-topics";
import { companyValuesTopics } from "@/src/app/(landing)/(info)/sobre-nos/constants/company-values-topics";
import Column from "@/src/components/core/column";
import { Award, Goal } from "lucide-react";
import CompanySectionBlock from "./company-section-block";
import CompanyTopicCard from "./company-topic-card";

const CompanyMissionAndValuesSection = () => {
  return (
    <section className="relative w-full space-y-20 py-16 bg-primary px-4 sm:px-6 md:px-12 lg:px-16 xl:px-16 2xl:px-25">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${backgroundSectionImage.src})`,
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />
      <Column className="space-y-12 lg:flex-row lg:space-x-24 justify-between w-full">
        <CompanySectionBlock
          icon={<Award className="text-secondary" />}
          title="Nossos Valores"
          heading="Nossos valores evoluíram conosco à medida que a empresa crescia e aprendemos com nossas experiências."
          description="Eles resumem o que queremos alcançar e podem mudar no futuro, à medida que almejamos cada vez mais alto. Pensamos nesses valores como importantes para nossa cultura e senso individual de realização."
        />
        <Column className="space-y-6">
          {companyValuesTopics.map((value, index) => (
            <CompanyTopicCard
              key={index}
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
          {companyMissionTopics.map((mission, index) => (
            <CompanyTopicCard
              key={index}
              icon={mission.icon}
              title={mission.title}
              description={mission.description}
            />
          ))}
        </Column>
      </Column>
    </section>
  );
};

export default CompanyMissionAndValuesSection;
