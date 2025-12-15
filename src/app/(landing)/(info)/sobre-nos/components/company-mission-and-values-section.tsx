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
        <Column className="space-y-8 sm:space-y-10 md:space-y-12 lg:flex-row lg:space-y-0 lg:space-x-12 xl:space-x-16 2xl:space-x-24 justify-between w-full">
          <FadeInOnScroll
            direction="left"
            offset={20}
            className="w-full lg:max-w-lg"
          >
            <CompanySectionBlock
              icon={<Award className="text-secondary" />}
              title="Nossos Valores"
              heading="Nossos valores evoluíram conosco à medida que a empresa crescia e aprendemos com nossas experiências."
              description="Eles resumem o que queremos alcançar e podem mudar no futuro, à medida que almejamos cada vez mais alto. Pensamos nesses valores como importantes para nossa cultura e senso individual de realização."
            />
          </FadeInOnScroll>
          <Column className="space-y-4 sm:space-y-5 md:space-y-6 w-full lg:w-auto lg:flex-1 lg:max-w-2xl">
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
        <Column className="space-y-8 sm:space-y-10 md:space-y-12 lg:flex-row lg:space-y-0 lg:space-x-12 xl:space-x-16 2xl:space-x-24 justify-between w-full">
          <FadeInOnScroll
            direction="left"
            offset={20}
            className="w-full lg:max-w-lg"
          >
            <CompanySectionBlock
              icon={<Goal className="text-secondary" />}
              title="Nossa Missão"
              heading="Nossa missão guia nosso caminho e inspira cada passo que damos para gerar impacto real e duradouro."
            />
          </FadeInOnScroll>
          <Column className="space-y-4 sm:space-y-5 md:space-y-6 w-full lg:w-auto lg:flex-1 lg:max-w-2xl">
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
