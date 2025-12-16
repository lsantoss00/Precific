import SupportLinkItem from "@/src/app/(private)/suporte/components/support-link-item";
import { SupportLinkItemType } from "@/src/app/(private)/suporte/types/support-link-item-type";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/core/card";
import Column from "@/src/components/core/column";
import Row from "@/src/components/core/row";
import { CircleQuestionMark } from "lucide-react";

interface SupportLinkCardsProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  backgroundIconColor?: string;
  links: SupportLinkItemType[];
}

const SupportLinkCards = ({
  title,
  description,
  icon,
  backgroundIconColor,
  links,
}: SupportLinkCardsProps) => {
  return (
    <Card className="flex-1 flex flex-col gap-4">
      <CardHeader>
        <Row className="items-center gap-3">
          <div
            className={`h-10 w-10 rounded-lg flex items-center justify-center ${
              backgroundIconColor || "bg-zinc-100"
            }`}
          >
            {icon || <CircleQuestionMark className="h-5 w-5 text-zinc-500" />}
          </div>
          <Column className="gap-0.5">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </Column>
        </Row>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 justify-between px-6">
        {links.map((link) => (
          <SupportLinkItem key={link.title} item={link} />
        ))}
      </CardContent>
    </Card>
  );
};

export default SupportLinkCards;
