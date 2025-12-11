import Column from "@/src/components/core/column";

export function PrivacyPolicyHeader() {
  return (
    <>
      <Column className="relative mb-10 w-fit">
        <h1 className="text-5xl font-bold text-white z-10">
          Política de Privacidade
        </h1>
        <div className="absolute left-4 -bottom-1 h-4 w-full bg-linear-to-r from-secondary to-transparent " />
      </Column>
      <p className="mb-10 leading-7 text-zinc-200">
        Esta Política de Privacidade descreve como a Precific coleta, usa,
        armazena e protege as informações pessoais dos usuários da nossa
        plataforma de precificação. <br /> É importante ler atentamente esta
        política antes de utilizar nossos serviços ou fornecer quaisquer
        informações pessoais.
      </p>
    </>
  );
}

export default PrivacyPolicyHeader;
