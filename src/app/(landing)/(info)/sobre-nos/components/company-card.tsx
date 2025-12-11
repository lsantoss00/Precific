import { CompanyInfoType } from "@/src/app/(landing)/(info)/sobre-nos/types/company-info-type";
import { Card } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Row from "@/src/components/core/row";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

interface CompanyCardProps {
  company: CompanyInfoType;
  isLast?: boolean;
}

const CompanyCard = ({ company, isLast = false }: CompanyCardProps) => {
  return (
    <Row className="gap-4 md:gap-6 lg:gap-8">
      <Column className="items-center pt-2 shrink-0">
        <div className="bg-primary text-primary-foreground px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap z-10">
          {company.foundedYear}
        </div>
        {!isLast && <div className="w-0.5 h-full bg-border mt-2 min-h-20" />}
      </Column>
      <a
        href={company.externalLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group block flex-1"
      >
        <Card className="relative overflow-hidden p-5 md:p-6 lg:p-8 transition-all duration-300 ease-out hover:shadow-lg">
          <Row className="items-center gap-5 md:gap-6 lg:gap-8 flex-col sm:flex-row">
            <div className="absolute top-3 right-3 md:top-4 md:right-4">
              <ExternalLink className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground transition-all duration-300 group-hover:text-primary" />
            </div>
            <Card className="h-20 w-20 md:h-28 md:w-28 shrink-0 items-center justify-center overflow-hidden p-3 md:p-4 transition-all duration-300">
              <Image
                src={company.image}
                alt={`${company.name}-logo`}
                sizes="(max-width: 768px) 128px, 80px"
                loading="lazy"
                className="object-contain grayscale transition-all duration-500 ease-out group-hover:grayscale-0"
              />
            </Card>
            <Column className="gap-2.5 md:gap-3 flex-1 text-center sm:text-left">
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold">
                {company.name}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {company.description}
              </p>
            </Column>
          </Row>
        </Card>
      </a>
    </Row>
  );
};

export default CompanyCard;
