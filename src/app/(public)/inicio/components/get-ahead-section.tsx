import Column from "@/src/components/core/column";

const GetAheadSection = () => {
  return (
    <Column className="bg-white w-full py-12 md:py-16 lg:py-20 lg:h-75 items-center justify-center px-4 sm:px-6 md:px-12 lg:px-20 xl:px-25">
      <Column className="max-w-155 space-y-4 md:space-y-6">
        <h3 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center leading-tight">
          Esteja a frente da concorrência!
        </h3>
        <p className="text-center text-sm md:text-base lg:text-lg text-muted-foreground max-w-3xl">
          Empresas que não precificarem corretamente, não irão aproveitar os
          créditos de IBS/CBS e estarão com o preço fora do mercado, não
          conseguindo competir com seus concorrentes!
        </p>
      </Column>
    </Column>
  );
};
export default GetAheadSection;
