import Column from "@/src/components/core/column";
import Flex from "@/src/components/core/flex";
import FAQAccordion from "@/src/components/faq-accordion";

const FAQSection = () => {
  return (
    <Flex className="relative bg-primary w-full py-12 md:py-16 xl:py-20 2xl:py-50 2xl:h-180 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-16 2xl:px-25 flex-col xl:flex-row gap-8 xl:gap-12 justify-between bg-[url('/landing-page/hero-section-background.webp')] bg-cover bg-center bg-no-repeat overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-primary/90 via-primary/50 to-transparent" />
      <Column className="relative z-10 w-full xl:w-[35rem] 2xl:w-140 space-y-6 md:space-y-8">
        <Column className="space-y-4 md:space-y-5">
          <h3 className="font-bold text-3xl sm:text-4xl xl:text-4xl 2xl:text-5xl text-white leading-tight">
            Ficou alguma dúvida?
          </h3>
          <p className="text-2xl md:text-3xl xl:text-3xl 2xl:text-4xl text-white">
            Perguntas frequentes
          </p>
        </Column>
      </Column>
      <Column className="bg-white h-fit w-full xl:w-[45rem] 2xl:w-240 rounded-md z-10">
        <FAQAccordion />
      </Column>
    </Flex>
  );
};
export default FAQSection;
