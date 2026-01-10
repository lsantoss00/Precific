"use client";

import { companyMissionTopics } from "@/src/app/(landing)/(info)/sobre-nos/constants/company-mission-topics";
import { companyValuesTopics } from "@/src/app/(landing)/(info)/sobre-nos/constants/company-values-topics";
import FadeInOnScroll from "@/src/components/animations/fade-in-on-scroll";
import { Container } from "@/src/components/core";
import Column from "@/src/components/core/column";
import SectionWithBackground from "@/src/components/section-with-background";
import { Award, Goal } from "lucide-react";
import CompanySectionBlock from "./company-section-block";
import CompanyTopicCard from "./company-topic-card";

const CompanyMissionAndValuesSection = () => {
  return (
    <SectionWithBackground className="w-full">
      <Container
        as="section"
        variant="section"
        className="space-y-12 lg:space-y-16"
      >
        <Column
          className="space-y-8 sm:space-y-10 md:space-y-12 xl:flex-row xl:space-y-0 xl:space-x-16 2xl:space-x-24 justify-between w-full"
          aria-labelledby="values-heading"
        >
          <FadeInOnScroll
            direction="left"
            offset={20}
            className="w-full xl:max-w-xl"
          >
            <CompanySectionBlock
              id="values-heading"
              icon={<Award className="text-secondary" aria-hidden="true" />}
              title="Nossos Valores"
              heading="Nossos valores são fruto de décadas de experiência, evolução e aprendizado contínuo. Eles se moldaram com nosso crescimento, desafios reais e decisões que impactaram empresas, pessoas e resultados."
              description="Eles orientam nossa cultura, guiam nossas decisões e sustentam a forma como atuamos no mercado. São o alicerce que garante consistência, responsabilidade e clareza em cada escolha feita ao longo da nossa trajetória."
            />
          </FadeInOnScroll>
          <Column
            as="ul"
            className="space-y-4 sm:space-y-5 md:space-y-6 w-full lg:w-auto lg:flex-1 xl:max-w-2xl"
          >
            {companyValuesTopics.map((value, index) => (
              <FadeInOnScroll
                as="li"
                key={value.title}
                direction="right"
                offset={20}
                delay={index * 0.1}
              >
                <CompanyTopicCard
                  icon={value.icon}
                  title={value.title}
                  description={value.description}
                />
              </FadeInOnScroll>
            ))}
          </Column>
        </Column>
        <Column
          as="section"
          className="space-y-8 sm:space-y-10 md:space-y-12 xl:flex-row xl:space-y-0 xl:space-x-16 2xl:space-x-24 justify-between w-full"
          aria-labelledby="mission-heading"
        >
          <FadeInOnScroll
            direction="left"
            offset={20}
            className="w-full xl:max-w-xl"
          >
            <CompanySectionBlock
              id="mission-heading"
              icon={<Goal className="text-secondary" aria-hidden="true" />}
              title="Nossa Missão"
              heading="Nossa missão guia nossas ações com base na experiência, entendimento do mercado e dedicação de gerar impacto real e duradouro."
            />
          </FadeInOnScroll>
          <Column
            as="ul"
            className="space-y-4 sm:space-y-5 md:space-y-6 w-full lg:w-auto lg:flex-1 xl:max-w-2xl"
          >
            {companyMissionTopics.map((mission, index) => (
              <FadeInOnScroll
                as="li"
                key={mission.title}
                direction="right"
                offset={20}
                delay={index * 0.1}
              >
                <CompanyTopicCard
                  icon={mission.icon}
                  title={mission.title}
                  description={mission.description}
                />
              </FadeInOnScroll>
            ))}
          </Column>
        </Column>
      </Container>
    </SectionWithBackground>
  );
};

export default CompanyMissionAndValuesSection;
