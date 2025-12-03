import ContactForm from "@/src/app/(public)/inicio/components/contact-form";
import Column from "@/src/components/core/column";
import Row from "@/src/components/core/row";
import Image from "next/image";

const ContactSection = () => {
  return (
    <Row className="relative bg-primary w-full h-220 items-center justify-between bg-[url('/landing-page/hero-section-background.webp')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/50 to-transparent" />
      <Column className="z-10 space-y-51 w-1/2 e h-full px-25 py-27 bg-white">
        <Column className="space-y-5">
          <h3 className="font-bold text-5xl  max-w-lg leading-14">
            Nossa equipe especializada está pronta para tirar suas dúvidas
          </h3>
          <p className=" text-lg max-w-xl">
            Preencha o formulário ao lado para que um dos nossos especialistas
            entre em contato, assim, poderemos tirar suas dúvidas e marcar uma
            demonstração gratuita!
          </p>
        </Column>
        <Image
          src="/landing-page/chevron-group.svg"
          alt="Sinalização de formulário"
          width={400}
          height={130}
        />
      </Column>
      <Column className="z-10 space-y-40 w-1/2 e h-full px-25 py-27 items-center">
        <Column className="space-y-5">
          <h3 className="font-bold text-5xl text-white text-center max-w-lg leading-14">
            Fale com um especialista agora e garanta o seu Precific!
          </h3>
          <p className="text-lg text-white text-center max-w-xl">
            Nossa equipe prestará o atendimento rápido.
          </p>
          <ContactForm />
        </Column>
      </Column>
    </Row>
  );
};
export default ContactSection;
