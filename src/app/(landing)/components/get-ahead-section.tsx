import FadeInOnScroll from "@/src/components/animations/fade-in-on-scroll";
import { Container } from "@/src/components/core";
import Column from "@/src/components/core/column";

const GetAheadSection = () => {
  return (
    <Container
      variant="section"
      className="pt-12 md:pt-16 xl:pt-16 2xl:pt-20 pb-12 md:pb-16 xl:pb-20 2xl:pb-24 bg-white"
    >
      <Column className="items-center">
        <FadeInOnScroll direction="up" offset={20}>
          <Column className="max-w-155 space-y-4 md:space-y-6">
            <h3 className="font-bold text-2xl sm:text-3xl md:text-4xl xl:text-4xl 2xl:text-5xl text-center leading-tight">
              Esteja a frente da concorrência!
            </h3>
            <p className="text-center text-sm md:text-base xl:text-base 2xl:text-lg text-muted-foreground max-w-3xl">
              Empresas que não precificarem corretamente, não irão aproveitar os
              créditos de IBS/CBS e estarão com o preço fora do mercado, não
              conseguindo competir com seus concorrentes!
            </p>
          </Column>
        </FadeInOnScroll>
      </Column>
    </Container>
  );
};
export default GetAheadSection;
