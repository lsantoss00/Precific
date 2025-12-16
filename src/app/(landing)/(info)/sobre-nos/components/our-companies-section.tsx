import CompanyCard from "@/src/app/(landing)/(info)/sobre-nos/components/company-card";
import { companiesInfo } from "@/src/app/(landing)/(info)/sobre-nos/constants/companies-info";
import FadeInOnScroll from "@/src/components/animations/fade-in-on-scroll";
import { Container } from "@/src/components/core";
import Column from "@/src/components/core/column";

const OurCompaniesSection = () => {
  return (
    <Container
      as="section"
      variant="section"
      className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-16 2xl:py-20"
      aria-labelledby="companies-heading"
    >
      <Column className="space-y-6 sm:space-y-8">
        <FadeInOnScroll direction="up" offset={16}>
          <h2
            id="companies-heading"
            className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-5xl leading-tight"
          >
            Nossas Empresas
          </h2>
        </FadeInOnScroll>
        <Column as="ul" className="gap-4 sm:gap-6">
          {companiesInfo.map((company, index) => (
            <FadeInOnScroll
              as="li"
              key={company.name}
              direction="up"
              offset={16}
              delay={index * 0.1}
            >
              <CompanyCard
                company={company}
                isLast={index === companiesInfo.length - 1}
              />
            </FadeInOnScroll>
          ))}
        </Column>
      </Column>
    </Container>
  );
};

export default OurCompaniesSection;
