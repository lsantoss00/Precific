import ContactForm from "@/src/app/(public)/inicio/components/contact-form";
import FadeInOnScroll from "@/src/components/animations/fade-in-on-scroll";
import Column from "@/src/components/core/column";
import Flex from "@/src/components/core/flex";
import Image from "next/image";

const ContactSection = () => {
  return (
    <Flex
      id="contato"
      className="relative bg-primary w-full xl:min-h-200 2xl:h-220 flex-col lg:flex-row items-stretch justify-between bg-[url('/landing-page/hero-section-background.webp')] bg-cover bg-center bg-no-repeat overflow-hidden"
    >
      <div className="absolute inset-0 bg-linear-to-b from-primary/90 via-primary/50 to-transparent" />
      <Column className="z-10 space-y-8 md:space-y-12 lg:space-y-31 xl:space-y-54 2xl:space-y-51 w-full xl:w-1/2 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-16 2xl:px-25 py-0 xl:py-16 2xl:py-27 bg-background">
        <FadeInOnScroll direction="left">
          <Column className="space-y-4 md:space-y-5 py-12 md:py-16 xl:py-0">
            <h3 className="font-bold text-2xl sm:text-3xl md:text-4xl xl:text-4xl 2xl:text-5xl max-w-lg leading-tight">
              Nossa equipe especializada está pronta para tirar suas dúvidas
            </h3>
            <p className="text-sm md:text-base xl:text-base 2xl:text-lg max-w-xl text-muted-foreground">
              Preencha o formulário{" "}
              <span className="xl:inline hidden">ao lado</span>
              <span className="xl:hidden">abaixo</span> para que um dos nossos
              especialistas entre em contato, assim, poderemos tirar suas
              dúvidas e marcar uma demonstração gratuita!
            </p>
          </Column>
        </FadeInOnScroll>
        <FadeInOnScroll direction="left" delay={0.2}>
          <Image
            src="/landing-page/chevron-group.svg"
            alt="Sinalização de formulário"
            width={400}
            height={130}
            className="hidden lg:block w-full max-w-sm"
          />
        </FadeInOnScroll>
      </Column>
      <Column className="z-10 space-y-8 md:space-y-12 xl:space-y-20 2xl:space-y-40 w-full xl:w-1/2 h-auto xl:h-full px-4 sm:px-6 md:px-12 lg:px-16 xl:px-16 2xl:px-25 py-12 md:py-16 xl:py-16 2xl:py-27 items-center justify-center">
        <FadeInOnScroll direction="right">
          <Column className="space-y-4 md:space-y-5 w-full">
            <h3 className="font-bold text-2xl sm:text-3xl md:text-4xl xl:text-4xl 2xl:text-5xl text-white text-center max-w-lg leading-tight self-center">
              Fale com um especialista agora e garanta o seu Precific!
            </h3>
            <p className="text-sm md:text-base xl:text-base 2xl:text-lg text-white text-center max-w-xl self-center">
              Nossa equipe prestará o atendimento rápido.
            </p>
            <ContactForm />
          </Column>
        </FadeInOnScroll>
      </Column>
    </Flex>
  );
};
export default ContactSection;
