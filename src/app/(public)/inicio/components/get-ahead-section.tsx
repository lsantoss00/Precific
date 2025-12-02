import Column from "@/src/components/core/column";

const GetAheadSection = () => {
  return (
    <Column className="bg-white w-full h-75 items-center justify-center">
      <Column className="max-w-155 space-y-4">
        <h3 className="font-bold text-5xl text-center leading-14">
          Esteja a frente da concorrência!
        </h3>
        <p className="text-center">
          Empresas que não precificarem corretamente, não irão aproveitar os
          créditos de IBS/CBS e estarão com o preço fora do mercado, não
          conseguindo competir com seus concorrentes!
        </p>
      </Column>
    </Column>
  );
};
export default GetAheadSection;
