import CompanyCard from "@/src/app/(landing)/(info)/sobre-nos/components/company-card";
import { companiesInfo } from "@/src/app/(landing)/(info)/sobre-nos/constants/companies-info";
import { Container } from "@/src/components/core";
import Column from "@/src/components/core/column";

const OurCompaniesSection = () => {
  return (
    <Container variant="section" className="py-12 md:py-16 xl:py-16 2xl:py-20 max-sm:mx-4 space-y-8 sm:px-6 md:px-12 2xl:px-25">
      <h3 className="font-bold text-2xl sm:text-3xl md:text-4xl xl:text-4xl 2xl:text-5xl leading-tight">
        Nossas Empresas
      </h3>
      <Column className="gap-4">
        {companiesInfo.map((company, index) => (
          <CompanyCard
            key={company.name}
            company={company}
            isLast={index === companiesInfo.length - 1}
          />
        ))}
      </Column>
    </Container>
  );
};

export default OurCompaniesSection;
