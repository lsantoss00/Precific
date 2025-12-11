import backgroundSectionImage from "@/public/landing-page/hero-section-background.webp";
import FadeInOnScroll from "@/src/components/animations/fade-in-on-scroll";
import Column from "@/src/components/core/column";
import Flex from "@/src/components/core/flex";
import FAQAccordion from "@/src/components/faq-accordion";

const FAQSection = () => {
  return (
    <Flex className="relative bg-primary w-full py-12 md:py-16 xl:py-20 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-16 2xl:px-25 flex-col xl:flex-row gap-8 xl:gap-12 justify-between overflow-hidden">
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
      <FadeInOnScroll direction="left" offset={20}>
        <Column className="relative z-10 w-full 2xl:w-140 space-y-6 md:space-y-8">
          <Column className="space-y-4 md:space-y-5">
            <h3 className="font-bold text-3xl sm:text-4xl xl:text-4xl 2xl:text-5xl text-white leading-tight">
              Ficou alguma dúvida?
            </h3>
            <p className="text-2xl md:text-3xl xl:text-3xl 2xl:text-4xl text-white">
              Perguntas frequentes
            </p>
          </Column>
        </Column>
      </FadeInOnScroll>
      <FadeInOnScroll direction="right" offset={20}>
        <Column className="relative z-10 bg-white h-fit w-full xl:w-180 2xl:w-240 rounded-md">
          <FAQAccordion />
        </Column>
      </FadeInOnScroll>
    </Flex>
  );
};
export default FAQSection;
