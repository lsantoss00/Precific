import { Button } from "@/src/components/core";
import Column from "@/src/components/core/column";

const StartUsingSection = () => {
  return (
    <Column className="bg-white w-full py-12 md:py-16 xl:py-16 2xl:py-20 xl:min-h-[18rem] 2xl:h-75 items-center justify-center px-4 sm:px-6 md:px-12 lg:px-16 xl:px-16 2xl:px-25">
      <Column className="space-y-4 md:space-y-6 items-center">
        <h3 className="font-bold text-2xl sm:text-3xl md:text-4xl xl:text-4xl 2xl:text-5xl text-center leading-tight">
          Comece a usar a Precific agora!
        </h3>
        <p className="text-center text-sm md:text-base xl:text-base 2xl:text-lg max-w-155 text-muted-foreground">
          Enquanto você pensa, seu concorrente já já vai começar a{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary font-bold">
            PRECIFIC
          </span>
          ar... Vai deixar ele sair na frente? 😏
        </p>
        <Button
          className="h-12 md:h-14 w-full sm:w-fit px-6 md:px-8 text-sm md:text-base"
          type="submit"
        >
          Não quero ficar para trás!
        </Button>
      </Column>
    </Column>
  );
};
export default StartUsingSection;
