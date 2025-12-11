import correaLopesLogo from "@/public/landing-page/correa-e-lopes-logo.webp";
import lopesAdvogadosLogo from "@/public/landing-page/lopes-advogados-logo.webp";
import viriatoCastLogo from "@/public/landing-page/viriato-cast-logo.webp";
import viriatoContabilidadeLogo from "@/public/landing-page/viriato-contabilidade-logo.webp";
import viriatoCorretoraDeSegurosLogo from "@/public/landing-page/viriato-corretora-de-seguros-logo.webp";
import viriatoImobiliariaLogo from "@/public/landing-page/viriato-imobiliaria-logo.webp";
import { CompanyInfoType } from "@/src/app/(landing)/types/company-info-type";

export const companiesInfo: CompanyInfoType[] = [
  {
    name: "Viriato Contabilidade",
    description:
      "Há mais de 40 anos no mercado, a Viriato Contabilidade oferece soluções completas em gestão contábil, fiscal e tributária para empresas de todos os portes. Com uma equipe altamente qualificada, garantimos compliance e eficiência na gestão financeira dos nossos clientes.",
    image: viriatoContabilidadeLogo,
    externalLink: "https://www.viriato.com.br/",
    foundedYear: "1983",
  },
  {
    name: "Correa & Lopes",
    description:
      "Escritório especializado em consultoria tributária e planejamento fiscal estratégico. Atuamos com foco em otimização tributária, sempre dentro da legalidade, ajudando empresas a reduzirem sua carga fiscal e aumentarem sua competitividade no mercado.",
    image: correaLopesLogo,
    externalLink: "https://correaelopes.com.br/",
    foundedYear: "2005",
  },
  {
    name: "Viriato Imobiliária",
    description:
      "Administradora de imóveis com expertise em gestão patrimonial completa. Oferecemos soluções personalizadas para proprietários e locatários, com transparência, tecnologia e atendimento diferenciado no mercado imobiliário.",
    image: viriatoImobiliariaLogo,
    externalLink: "https://www.viriatoimobiliaria.com.br/",
    foundedYear: "2010",
  },
  {
    name: "J.A Lopes Advogados",
    description:
      "Escritório de advocacia empresarial com foco em direito tributário, corporativo e trabalhista. Nossa equipe oferece assessoria jurídica estratégica e personalizada, protegendo os interesses dos nossos clientes com excelência e comprometimento.",
    image: lopesAdvogadosLogo,
    externalLink: "https://www.jalopesadvogados.com.br/",
    foundedYear: "2012",
  },
  {
    name: "Viriato Corretora de Seguros",
    description:
      "Corretora de seguros especializada em soluções personalizadas para pessoas físicas e jurídicas. Oferecemos consultoria completa em seguros patrimoniais, de vida, empresariais e muito mais, sempre buscando as melhores condições do mercado para nossos clientes.",
    image: viriatoCorretoraDeSegurosLogo,
    externalLink: "https://www.viriatocorretoradeseguros.com.br/",
    foundedYear: "2015",
  },
  {
    name: "Viriato Cast",
    description:
      "Canal de conteúdo educacional e informativo do Grupo Viriato. Produzimos podcasts, vídeos e materiais sobre gestão empresarial, tributação, empreendedorismo e inovação, compartilhando conhecimento para impulsionar negócios.",
    image: viriatoCastLogo,
    externalLink: "https://www.instagram.com/viriatocast/",
    foundedYear: "2020",
  },
  // {
  //   name: "Precific",
  //   description:
  //     "Sistema inteligente de precificação e gestão tributária desenvolvido pelo Grupo Viriato. Nossa missão é simplificar a gestão financeira e tributária das empresas brasileiras, oferecendo soluções inovadoras e eficientes com tecnologia de ponta.",
  //   image: precificLogo,
  //   externalLink: "https://www.precificapp.com",
  //   foundedYear: "2024",
  // },
];
