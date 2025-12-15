import FadeInOnScroll from "@/src/components/animations/fade-in-on-scroll";
import { Container } from "@/src/components/core";
import Column from "@/src/components/core/column";

const CompanyMissionStatementSection = () => {
  return (
    <Container variant="section" className="py-12 md:py-16 xl:py-16 2xl:py-20 bg-white xl:min-h-72">
      <FadeInOnScroll direction="up" offset={20}>
        <Column className="space-y-4 md:space-y-6">
          <h3 className="font-bold text-2xl sm:text-3xl md:text-4xl xl:text-4xl 2xl:text-5xl leading-tight">
            O Grupo Viriato leva as empresas à excelência.
          </h3>
          <p className="text-sm md:text-base xl:text-base 2xl:text-lg text-muted-foreground">
            Há quatro décadas, transformamos desafios em estratégia e estratégia
            em crescimento real. Evoluímos de um escritório familiar para um
            ecossistema completo que impulsiona negócios com inteligência
            contábil, segurança jurídica, precisão tributária, visão imobiliária
            e soluções de proteção. Nossa história é feita de constância,
            aprimoramento e resultados que permanecem. Aqui, cada empresa
            encontra direção, estrutura e um parceiro comprometido em elevar o
            futuro que está construindo.
          </p>
        </Column>
      </FadeInOnScroll>
    </Container>
  );
};

export default CompanyMissionStatementSection;
