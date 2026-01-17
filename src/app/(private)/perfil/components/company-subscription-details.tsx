"use client";

import { Card } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Flex from "@/src/components/core/flex";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import { dateFormatter } from "@/src/helpers/date-formatter";
import { useAuth } from "@/src/providers/auth-provider";
import { Crown } from "lucide-react";

const CompanySubscriptionDetails = () => {
  const { isPremium, expiresAt } = useAuth();

  return (
    <Card className="w-full p-6 rounded-md flex space-y-4">
      <h3 className="text-lg">Assinatura</h3>
      <Row className="items-center gap-2">
        <Flex
          className={`w-12 h-12 rounded-full  items-center justify-center border-2 shrink-0 ${
            isPremium
              ? "border-secondary bg-secondary/20"
              : "border-muted-foreground bg-zinc-100"
          } shadow-md`}
        >
          <Show
            when={isPremium}
            fallback={<Crown className="text-muted-foreground" />}
          >
            <Crown className="text-secondary" />
          </Show>
        </Flex>
        <Column>
          <p>{isPremium ? "Plano Pago" : "Plano Gratuito"}</p>
          <Show
            when={isPremium && expiresAt}
            fallback={
              <span className="text-sm text-muted-foreground">
                Contate nosso suporte e assine o plano pago!
              </span>
            }
          >
            <span className="text-sm text-muted-foreground">
              Expira em: {dateFormatter(expiresAt!, true)}
            </span>
          </Show>
        </Column>
      </Row>
    </Card>
  );
};

export default CompanySubscriptionDetails;
