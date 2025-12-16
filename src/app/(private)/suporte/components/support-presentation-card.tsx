import precificLogoImage from "@/public/images/precific-logo-image.webp";
import OpeningHoursSection from "@/src/app/(private)/suporte/components/opening-hours-section";
import { Card, CardContent } from "@/src/components/core/card";
import Column from "@/src/components/core/column";
import Image from "next/image";

const SupportPresentationCard = () => {
  return (
    <Card className="overflow-hidden py-0 h-full flex flex-col">
      <Column>
        <div className="bg-linear-to-b from-primary/10 via-primary/5 to-transparent p-16 flex items-center justify-center">
          <Image
            src={precificLogoImage}
            alt="Logo do Precific"
            width={240}
            height={120}
            className="object-contain"
          />
        </div>
        <CardContent className="py-6 flex flex-col justify-between">
          <Column className="gap-5">
            <Column className="gap-1">
              <h2 className="text-3xl font-semibold text-foreground">
                Estamos à sua disposição!
              </h2>
              <p className="text-muted-foreground text-md">
                Nossa equipe está pronta para ajudar você.
              </p>
            </Column>
            <OpeningHoursSection />
          </Column>
        </CardContent>
      </Column>
    </Card>
  );
};

export default SupportPresentationCard;
