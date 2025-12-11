"use client";

import { useState } from "react";
import WhatsAppIcon from "../../public/whatsapp-logo.svg";
import { Card } from "./core";
import Row from "./core/row";

const WhatsAppHelpLinkBalloon = () => {
  const [isHovered, setIsHovered] = useState(false);

  const whatsAppNumber = "+552122929071";
  const whatsAppMessage =
    "Ol%C3%A1%2C%20preciso%20de%20ajuda%20com%20o%20Precific!";
  const whatsAppLink = `https://wa.me/${whatsAppNumber}?text=${whatsAppMessage}`;

  return (
    <Row className="fixed bottom-4 right-4 md:bottom-6 md:right-6 flex items-center gap-3 z-50">
      <Card
        className={`px-4 py-2 duration-300 whitespace-nowrap pointer-events-none ${
          isHovered ? "block" : "hidden"
        }`}
      >
        <span className="text-sm font-medium">Precisa de ajuda?</span>
      </Card>
      <a
        className="bg-[#25D366] h-12 w-12 flex items-center justify-center rounded-full shadow-lg hover:shadow-xl transition-shadow"
        href={whatsAppLink}
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
