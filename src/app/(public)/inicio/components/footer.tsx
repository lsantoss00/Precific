import logoImage from "@/public/precific-logo-image.webp";
import Column from "@/src/components/core/column";
import Flex from "@/src/components/core/flex";
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
      <Flex className="flex-col md:flex-row justify-between items-start gap-8 md:gap-12 lg:gap-16">
        <Column className="flex-1 space-y-4 md:space-y-6 w-full md:w-auto">
          <Image
            src={logoImage}
            alt="precific-logo-image"
            width={200}
            height={100}
            quality={100}
          />
          <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a
            mollis purus, et luctus nisl. Mauris vel luctus lacus.
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
          © {currentYear} Precific. Uma aplicação do Grupo Viriato. Todos os
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
        title: "Grupo Viriato",
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
        title: "Nova Viriato",
        href: "https://www.viriatocorretoradeseguros.com.br/",
      },
    ],
  },
  {
    title: "Institucional",
    links: [
      {
        title: "Sobre Nós",
        href: "/sobre",
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
