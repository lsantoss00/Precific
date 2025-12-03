import { Button } from "@/src/components/core";
import Column from "@/src/components/core/column";

const StartUsingSection = () => {
  return (
    <Column className="bg-white w-full h-75 items-center justify-center">
      <Column className="space-y-4 items-center">
        <h3 className="font-bold text-5xl text-center leading-14">
          Comece a usar a Precific agora!
        </h3>
        <p className="text-center max-w-155">
          Enquanto você pensa, seu concorrente já já vai começar a{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary font-bold">
            PRECIFIC
          </span>
          ar... Vai deixar ele sair na frente? 😏
        </p>
        <Button className="h-12 w-fit" type="submit">
          Não quero ficar para trás!
        </Button>
      </Column>
    </Column>
  );
};
export default StartUsingSection;
