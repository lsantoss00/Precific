import Column from "@/src/components/core/column";
import Flex from "@/src/components/core/flex";
import FAQAccordion from "@/src/components/faq-accordion";

const FAQSection = () => {
  return (
    <Flex className="relative bg-primary w-full py-12 md:py-16 lg:py-50 lg:h-180 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-25 flex-col lg:flex-row gap-8 lg:gap-12 justify-between bg-[url('/landing-page/hero-section-background.webp')] bg-cover bg-center bg-no-repeat overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-primary/90 via-primary/50 to-transparent" />
      <Column className="relative z-10 w-full lg:w-140 space-y-6 md:space-y-8 lg:space-y-10">
        <Column className="space-y-4 md:space-y-5">
          <h3 className="font-bold text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
            Ficou alguma dúvida?
          </h3>
          <p className="text-2xl md:text-3xl lg:text-4xl text-white">
            Perguntas frequentes
          </p>
        </Column>
      </Column>
      <Column className="bg-white h-fit w-full lg:w-240 rounded-md z-10">
        <FAQAccordion />
      </Column>
    </Flex>
  );
};
export default FAQSection;
