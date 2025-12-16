import precificLogoImage from "@/public/images/precific-logo-image.webp";
import OpeningHoursSection from "@/src/app/(private)/suporte/components/opening-hours-section";
import { Card, CardContent } from "@/src/components/core/card";
import Column from "@/src/components/core/column";
import Image from "next/image";

const SupportPresentationCard = () => {
  return (
    <Card className="overflow-hidden py-0 h-full flex flex-col">
      <Column className="flex-1">
        <div className="bg-linear-to-b from-primary/10 via-primary/5 to-transparent p-16 flex items-center justify-center">
          <Image
            src={precificLogoImage}
            alt="Logo do Precific"
            width={240}
            height={120}
            className="object-contain"
          />
        </div>
        <CardContent className="flex-1 py-6 flex flex-col justify-between">
          <Column className="gap-5">
            <Column className="gap-1">
              <h2 className="text-3xl font-semibold text-primary">
                Estamos à sua disposição!
              </h2>
              <p className="text-muted-foreground text-md">
                Nossa equipe está pronta para ajudar você.
              </p>
            </Column>
            <OpeningHoursSection />
          </Column>
          {/* <Row className="flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t mt-6">
            <Column className="gap-1">
              <span className="text-lg font-medium">Siga o Grupo Viriato</span>
              <span className="text-muted-foreground text-sm">
                Acompanhe novidades e conteúdos sobre gestão empresarial
              </span>
            </Column>
            <Row className="gap-3">
              {socialMediaLinks.map((socialMedia) => (
                <Link
                  key={socialMedia.label}
                  href={socialMedia.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  aria-label={socialMedia.label}
                >
                  {socialMedia.icon}
                </Link>
              ))}
            </Row>
          </Row> */}
        </CardContent>
      </Column>
    </Card>
  );
};

export default SupportPresentationCard;
