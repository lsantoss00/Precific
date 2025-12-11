import grupoViriatoLogoImage from "@/public/images/grupo-viriato-logo.webp";
import precificLogoImage from "@/public/images/precific-logo-image.webp";
import Column from "@/src/components/core/column";
import Flex from "@/src/components/core/flex";
import Row from "@/src/components/core/row";
import { Instagram, Linkedin, YoutubeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialIconClasses =
    "w-10 h-10 rounded-md bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors";

  const footerLinkClasses =
    "text-muted-foreground text-sm hover:text-primary transition-colors";

  return (
    <footer className="bg-white w-full py-12 md:py-16 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-25">
      <Flex className="flex-col lg:flex-row justify-between gap-8 md:gap-12 lg:gap-16">
        <Column className="flex-1 space-y-4 md:space-y-6 w-full md:w-auto">
          <Row className="items-center gap-4">
            <div className="relative">
              <Image
                src={grupoViriatoLogoImage}
                alt="grupo-viriato-logo-image"
                width={100}
                height={100}
                sizes="100px"
                loading="lazy"
                className="object-contain"
              />
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="relative">
              <Image
                src={precificLogoImage}
                alt="precific-logo-image"
                width={100}
                height={50}
                sizes="100px"
                loading="lazy"
                className="object-contain"
              />
            </div>
          </Row>
          <p className="text-muted-foreground text-sm sm:text-base max-w-sm md:max-w-md lg:max-w-md xl:max-w-lg leading-relaxed lg:text-justify">
            O Precific é um produto oficial do Grupo Viriato, desenvolvido para
            apoiar empresas na formação de preços com precisão, inteligência
            tributária e eficiência operacional. Há mais de 40 anos
            impulsionando negócios, o Grupo Viriato reúne soluções em
            contabilidade, consultoria tributária, jurídico, seguros e gestão
            empresarial, oferecendo tecnologia e expertise para transformar
            resultados.
          </p>
          <Flex className="gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={socialIconClasses}
                aria-label={social.label}
              >
                {social.icon}
              </Link>
            ))}
          </Flex>
        </Column>
        <Flex className="flex-col sm:flex-row gap-8 md:gap-12 w-full md:w-auto">
          {footerLinks.map((footerLink, index) => (
            <Column key={index} className="space-y-3 md:space-y-4">
              <h3 className="text-base md:text-lg font-semibold">
                {footerLink.title}
              </h3>
              <ul className="space-y-2 md:space-y-3">
                {footerLink.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href} className={footerLinkClasses}>
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Column>
          ))}
        </Flex>
      </Flex>
      <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border">
        <p className="text-muted-foreground text-xs md:text-sm text-center">
          © {currentYear} Precific — uma solução do Grupo Viriato. Todos os
          direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

const socialLinks = [
  {
    href: "https://www.linkedin.com/company/grupo-viriato/",
    icon: <Linkedin className="w-5 h-5" />,
    label: "LinkedIn",
  },
  {
    href: "https://www.instagram.com/grupoviriato",
    icon: <Instagram className="w-5 h-5" />,
    label: "Instagram",
  },
  {
    href: "https://www.youtube.com/@ViriatoCast",
    icon: <YoutubeIcon className="w-5 h-5" />,
    label: "Youtube",
  },
];

const footerLinks = [
  {
    title: "Atendimento",
    links: [
      {
        title: "contato@precificapp.com",
        href: "mailto:contato@precificapp.com",
      },
      {
        title: "+55 (21) 2292-9071",
        href: "tel:+552122929071",
      },
    ],
  },
  {
    title: "Nossas Empresas",
    links: [
      {
        title: "Viriato Contabilidade",
        href: "https://www.viriato.com.br/",
      },
      {
        title: "Correa & Lopes",
        href: "https://correaelopes.com.br/",
      },
      {
        title: "Viriato Imobiliária",
        href: "https://www.viriatoimobiliaria.com.br/",
      },
      {
        title: "J.A Lopes Advogados",
        href: "https://www.jalopesadvogados.com.br/",
      },
      {
        title: "Viriato Corretora de Seguros",
        href: "https://www.viriatocorretoradeseguros.com.br/",
      },
      {
        title: "Viriato Cast",
        href: "https://www.instagram.com/viriatocast/",
      },
    ],
  },
  {
    title: "Institucional",
    links: [
      {
        title: "Sobre Nós",
        href: "/sobre-nos",
      },
      {
        title: "Termos de Uso",
        href: "/termos-de-uso",
      },
      {
        title: "Política de Privacidade",
        href: "/politica-de-privacidade",
      },
    ],
  },
];
