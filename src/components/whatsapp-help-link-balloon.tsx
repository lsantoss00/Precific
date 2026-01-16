"use client";

import WhatsAppIcon from "@/public/svgs/whatsapp-logo.svg";
import { whatsAppHelpLink } from "@/src/utils/whatsapp-help-link";
import { useState } from "react";
import { Card } from "./core";
import Row from "./core/row";

const WhatsAppHelpLinkBalloon = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Row className="fixed bottom-4 right-5 flex items-center gap-3 z-50">
      <Card
        className={`px-4 py-2 duration-300 whitespace-nowrap pointer-events-none ${
          isHovered ? "block" : "hidden"
        }`}
      >
        <span className="text-sm font-medium">Precisa de ajuda?</span>
      </Card>
      <a
        className="bg-[#25D366] h-12 w-12 flex items-center justify-center rounded-full shadow-lg hover:shadow-xl transition-shadow"
        href={whatsAppHelpLink}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Link para suporte via WhatsApp"
      >
        <WhatsAppIcon className="text-white h-7 w-7" />
      </a>
    </Row>
  );
};

export default WhatsAppHelpLinkBalloon;
