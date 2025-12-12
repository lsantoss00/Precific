"use client";

import backgroundSectionImage from "@/public/images/hero-section-background.webp";
import { companyMissionTopics } from "@/src/app/(landing)/(info)/sobre-nos/constants/company-mission-topics";
import { companyValuesTopics } from "@/src/app/(landing)/(info)/sobre-nos/constants/company-values-topics";
import Column from "@/src/components/core/column";
import { Award, Goal } from "lucide-react";

export function CompanyMissionAndValuesSection() {
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
        <Column className="max-w-lg space-y-6">
          <Column className="gap-3">
            <Award className="text-secondary" />
            <h3 className="text-base font-bold text-zinc-200 md:text-2xl">
              Nossos Valores
            </h3>
          </Column>
          <p className="text-[1.75rem] text-white font-bold md:text-4xl">
            Nossos valores evoluíram conosco à medida que a empresa crescia e
            aprendemos com nossas experiências.
          </p>
          <span className="text-lg text-white">
            Eles resumem o que queremos alcançar e podem mudar no futuro, à
            medida que almejamos cada vez mais alto. Pensamos nesses valores
            como importantes para nossa cultura e senso individual de
            realização.
          </span>
        </Column>
        <Column className="space-y-6">
          {companyValuesTopics.map((value, index) => (
            <Column
              key={index}
              className="relative max-w-2xl items-center justify-center space-y-6 rounded-lg bg-black/40 px-4 py-6 lg:h-60 lg:flex-row lg:space-y-0 lg:px-0 lg:py-0"
            >
              <Column className="w-full lg:w-auto">
                <span className="-left-10 top-20 h-fit w-fit rounded-full bg-secondary p-3 text-white lg:absolute lg:p-6">
                  {value.icon}
                </span>
              </Column>
              <Column className="space-y-4 lg:py-12 lg:pl-20 lg:pr-16">
                <span className="text-xl font-bold lg:text-2xl text-white">
                  {value.title}
                </span>
                <span className="text-base lg:text-lg text-zinc-200">
                  {value.description}
                </span>
              </Column>
            </Column>
          ))}
        </Column>
      </Column>
      <Column className="space-y-12 lg:flex-row lg:space-x-24 justify-between w-full">
        <Column className="max-w-lg space-y-6">
          <Column className="gap-3">
            <Goal className="text-secondary" />
            <h3 className="text-base font-bold text-zinc-200 md:text-2xl">
              Nossa Missão
            </h3>
          </Column>
          <p className="text-[1.75rem] text-white font-bold md:text-4xl">
            Nossa missão guia nosso caminho e inspira cada passo que damos para
            gerar impacto real e duradouro.
          </p>
        </Column>
        <Column className="space-y-6">
          {companyMissionTopics.map((mission, index) => (
            <Column
              key={index}
              className="relative max-w-2xl items-center justify-center space-y-6 rounded-lg bg-black/40 px-4 py-6 lg:h-60 lg:flex-row lg:space-y-0 lg:px-0 lg:py-0"
            >
              <Column className="w-full lg:w-auto">
                <span className="-left-10 top-20 h-fit w-fit rounded-full bg-secondary p-3 text-white lg:absolute lg:p-6">
                  {mission.icon}
                </span>
              </Column>
              <Column className="space-y-4 lg:py-12 lg:pl-20 lg:pr-16">
                <span className="text-xl font-bold lg:text-2xl text-white">
                  {mission.title}
                </span>
                <span className="text-base lg:text-lg text-zinc-200">
                  {mission.description}
                </span>
              </Column>
            </Column>
          ))}
        </Column>
      </Column>
    </section>
  );
}

export default CompanyMissionAndValuesSection;
