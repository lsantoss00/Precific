import Column from "@/src/components/core/column";

type Topic = {
  title: string;
  content?: string;
  items?: string[];
};

export function PrivacyPolicyTopics() {
  return (
    <Column className="space-y-10">
      {privacyPolicyTopicsMap?.map((topic, index) => (
        <section key={index}>
          <h2 className="text-xl font-bold leading-8 mb-4 text-white">
            {topic?.title}
          </h2>
          <p className="leading-7 mb-3 text-zinc-200">{topic?.content}</p>
          {topic?.items && topic.items.length > 0 && (
            <ol className="list-decimal list-inside space-y-2 ml-4">
              {topic.items.map((item, itemIndex) => (
                <li key={itemIndex} className="leading-7 text-zinc-200">
                  {item}
                </li>
              ))}
            </ol>
          )}
        </section>
      ))}
    </Column>
  );
}

export default PrivacyPolicyTopics;

const privacyPolicyTopicsMap: Topic[] = [
  {
    title: "1. Informações coletadas",
    content:
      "A Precific pode coletar as seguintes informações pessoais dos usuários:",
    items: [
      "Informações de cadastro: Nome completo, endereço de e-mail, senha (criptografada), telefone e informações da empresa.",
      "Informações de produtos: Dados de custos, margens de lucro, preços e demais informações inseridas na plataforma para cálculo de precificação.",
      "Informações de uso: Dados sobre como você utiliza a plataforma, incluindo endereço IP, tipo de dispositivo, navegador, páginas acessadas e tempo de uso.",
    ],
  },
  {
    title: "2. Uso das informações",
    content:
      "A Precific utiliza as informações coletadas para as seguintes finalidades:",
    items: [
      "Fornecer e operar a plataforma: Processar cálculos de precificação, armazenar dados de produtos e gerenciar sua conta.",
      "Melhorar nossos serviços: Analisar o uso da plataforma para desenvolver novos recursos e aprimorar a experiência do usuário.",
      "Comunicação: Enviar notificações importantes sobre sua conta, atualizações do serviço e responder a solicitações de suporte.",
      "Segurança: Proteger contra fraudes, abusos e atividades não autorizadas na plataforma.",
      "Cumprimento legal: Atender obrigações legais e regulatórias aplicáveis.",
    ],
  },
  {
    title: "3. Compartilhamento de informações",
    content:
      "A Precific não vende suas informações pessoais. Podemos compartilhar informações apenas nas seguintes situações:",
    items: [
      "Provedores de serviços: Com parceiros que auxiliam na operação da plataforma (hospedagem, processamento de pagamentos, análise de dados), todos sujeitos a acordos de confidencialidade.",
      "Requisitos legais: Quando exigido por lei, ordem judicial ou para proteger direitos, propriedade ou segurança da Precific e seus usuários.",
      "Transferência de negócios: Em caso de fusão, aquisição ou venda de ativos, suas informações podem ser transferidas, com notificação prévia.",
      "Com seu consentimento: Em qualquer outra situação, apenas com sua autorização expressa.",
    ],
  },
  {
    title: "4. Armazenamento e segurança de dados",
    content:
      "A Precific emprega medidas de segurança adequadas para proteger as informações pessoais dos usuários contra acesso não autorizado, alteração, divulgação ou destruição. Utilizamos criptografia de dados, protocolos HTTPS, autenticação segura e acesso restrito aos dados apenas para funcionários autorizados que necessitam das informações para desempenhar suas funções.",
  },
  {
    title: "5. Cookies e tecnologias similares",
    content:
      "A Precific utiliza cookies e tecnologias similares para melhorar a experiência do usuário, manter sessões ativas, personalizar conteúdo e analisar o uso da plataforma. Os usuários podem controlar o uso de cookies através das configurações do navegador, mas a desativação pode limitar funcionalidades essenciais como autenticação e salvamento de preferências.",
  },
  {
    title: "6. Alterações nesta política",
    content:
      "Podemos atualizar esta Política de Privacidade periodicamente para refletir alterações em nossas práticas de informações. Recomendamos que os usuários revisem esta política regularmente. O uso contínuo dos serviços após a publicação de quaisquer alterações nesta política será considerado como aceitação dessas alterações.",
  },
  {
    title: "7. Contato",
    content:
      "Se os usuários tiverem alguma dúvida, preocupação ou solicitação em relação a esta Política de Privacidade ou ao uso de suas informações pessoais, podem entrar em contato conosco através dos canais de comunicação fornecidos em nosso site.",
  },
];
