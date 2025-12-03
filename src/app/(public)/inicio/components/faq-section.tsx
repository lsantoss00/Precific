import Column from "@/src/components/core/column";
import Row from "@/src/components/core/row";

const FAQSection = () => {
  return (
    <Row className="relative bg-primary w-full h-200 px-25 py-50 justify-between bg-[url('/landing-page/hero-section-background.webp')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/50 to-transparent" />
      <Column className="relative z-10 w-140 space-y-10">
        <Column className="space-y-5">
          <h3 className="font-bold text-5xl text-white">
            Ficou alguma dúvida?
          </h3>
          <p className="text-4xl text-white">Perguntas frequentes</p>
        </Column>
      </Column>
      <div className="bg-white h-100 w-240 rounded-md z-10" />
    </Row>
  );
};
export default FAQSection;
