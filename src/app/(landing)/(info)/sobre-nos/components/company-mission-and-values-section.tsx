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
        variant="section"
        className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24 py-12 sm:py-16 md:py-20 lg:py-24"
      >
        <Column className="space-y-8 sm:space-y-10 md:space-y-12 xl:flex-row xl:space-y-0 xl:space-x-16 2xl:space-x-24 justify-between w-full">
          <FadeInOnScroll
            direction="left"
            offset={20}
            className="w-full xl:max-w-xl"
          >
            <CompanySectionBlock
              icon={<Award className="text-secondary" />}
              title="Nossos Valores"
              heading="Nossos valores são fruto de décadas de experiência, evolução e aprendizado contínuo. Eles se moldaram com nosso crescimento, desafios reais e decisões que impactaram empresas, pessoas e resultados."
              description="Eles orientam nossa cultura, guiam nossas decisões e sustentam a forma como atuamos no mercado. São o alicerce que garante consistência, responsabilidade e clareza em cada escolha feita ao longo da nossa trajetória."
            />
          </FadeInOnScroll>
          <Column className="space-y-4 sm:space-y-5 md:space-y-6 w-full lg:w-auto lg:flex-1 xl:max-w-2xl">
            {companyValuesTopics.map((value, index) => (
              <FadeInOnScroll
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
        <Column className="space-y-8 sm:space-y-10 md:space-y-12 xl:flex-row xl:space-y-0 xl:space-x-16 2xl:space-x-24 justify-between w-full">
          <FadeInOnScroll
            direction="left"
            offset={20}
            className="w-full xl:max-w-xl"
          >
            <CompanySectionBlock
              icon={<Goal className="text-secondary" />}
              title="Nossa Missão"
              heading="Nossa missão guia nossas ações com base na experiência, entendimento do mercado e dedicação de gerar impacto real e duradouro."
            />
          </FadeInOnScroll>
          <Column className="space-y-4 sm:space-y-5 md:space-y-6 w-full lg:w-auto lg:flex-1 xl:max-w-2xl">
            {companyMissionTopics.map((mission, index) => (
              <FadeInOnScroll
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
