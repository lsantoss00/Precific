import OpeningHoursSection from "@/src/app/(private)/suporte/components/opening-hours-section";
import { Card, CardContent } from "@/src/components/core/card";
import Column from "@/src/components/core/column";
import Image from "next/image";

const SupportPresentationCard = () => {
  return (
    <Card className="overflow-hidden py-0 rounded-md h-full">
      <Column className="h-full">
        <div className="relative bg-linear-to-b from-primary/20 via-primary/15 to-transparent p-30 flex items-center justify-center">
          <Image
            src="/svgs/undraw_contact-us.svg"
            alt="Imagem ilustrativa de contato"
            fill
            className="object-contain py-2 max-md:-ml-2"
            priority
          />
        </div>
        <CardContent className="py-6 pt-0! flex flex-1 flex-col justify-between">
          <Column className="gap-5">
            <Column className="gap-1">
              <h2 className="text-3xl font-semibold text-foreground">
                Estamos à disposição!
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
