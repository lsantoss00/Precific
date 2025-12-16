import ContactForm from "@/src/app/(landing)/components/contact-form";
import FadeInOnScroll from "@/src/components/animations/fade-in-on-scroll";
import { Container } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Flex from "@/src/components/core/flex";
import SectionWithBackground from "@/src/components/section-with-background";
import Image from "next/image";

const ContactSection = () => {
  return (
    <SectionWithBackground
      id="contato"
      className="w-full xl:min-h-200 2xl:h-220 overflow-hidden"
    >
      <Flex className="flex-col lg:flex-row items-stretch justify-between">
        <Container
          variant="section"
          className="z-10 w-full xl:w-1/2 py-0 xl:py-16 2xl:py-27 bg-background"
        >
          <Column className="space-y-8 md:space-y-12 lg:space-y-31 xl:space-y-54 2xl:space-y-51">
            <FadeInOnScroll direction="left" offset={20}>
              <Column className="space-y-4 md:space-y-5 py-12 md:py-16 xl:py-0">
                <h3 className="font-bold text-2xl sm:text-3xl md:text-4xl xl:text-4xl 2xl:text-5xl max-w-lg leading-tight">
                  Nossa equipe especializada está pronta para tirar suas dúvidas
                </h3>
                <p className="text-sm md:text-base xl:text-base 2xl:text-lg max-w-xl text-muted-foreground">
                  Preencha o formulário{" "}
                  <span className="xl:inline hidden">ao lado</span>
                  <span className="xl:hidden">abaixo</span> para que um dos
                  nossos especialistas entre em contato, assim, poderemos tirar
                  suas dúvidas e marcar uma demonstração gratuita!
                </p>
              </Column>
            </FadeInOnScroll>
            <FadeInOnScroll direction="left" delay={0.2} offset={16}>
              <Image
                src="/svgs/chevron-group.svg"
                alt="Sinalização de formulário"
                width={400}
                height={130}
                className="hidden lg:block w-full max-w-sm"
                loading="lazy"
              />
            </FadeInOnScroll>
          </Column>
        </Container>
        <Container
          variant="section"
          className="z-10 w-full xl:w-1/2 h-auto xl:h-full py-12 md:py-16 xl:py-16 2xl:py-27"
        >
          <Column className="space-y-8 md:space-y-12 xl:space-y-20 2xl:space-y-40 items-center justify-center">
            <FadeInOnScroll direction="right" offset={20}>
              <Column className="space-y-4 md:space-y-5 w-full">
                <h3 className="font-bold text-2xl sm:text-3xl md:text-4xl xl:text-4xl 2xl:text-5xl text-white text-center max-w-lg leading-tight self-center">
                  Fale com um especialista agora e garanta o seu Precific!
                </h3>
                <p className="text-sm md:text-base xl:text-base 2xl:text-lg text-zinc-200 text-center max-w-xl self-center">
                  Nossa equipe prestará o atendimento rápido.
                </p>
                <ContactForm />
              </Column>
            </FadeInOnScroll>
          </Column>
        </Container>
      </Flex>
    </SectionWithBackground>
  );
};
export default ContactSection;
