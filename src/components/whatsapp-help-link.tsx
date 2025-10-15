"use client";

import Link from "next/link";
import { useState } from "react";
import WhatsAppIcon from "../../public/whatsapp-logo.svg";
import { Card } from "./core";
import Row from "./core/row";

const WhatsAppHelpLink = () => {
  const [isHovered, setIsHovered] = useState(false);

  const whatsAppNumber = "+552122929071";

  // %20 = space
  // %C3%A1 = á
  // %2C = ,
  // %3F = ?
  // %21 = !
  const whatsAppMessage =
    "Ol%C3%A1%2C%20preciso%20de%20ajuda%20com%20o%20Precific!";

  const whatsAppLink = `https://wa.me/${whatsAppNumber}?text=${whatsAppMessage}`;

  return (
    <Row className="fixed bottom-3 right-3 flex items-center gap-3">
      <Card
        className={`px-4 py-2 transition-opacity duration-300 whitespace-nowrap pointer-events-none ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-sm font-medium">Precisa de ajuda?</span>
      </Card>
      <Link
        className="opacity-80 hover:opacity-100 transition-opacity duration-300"
        href={whatsAppLink}
        target="_blank"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <WhatsAppIcon />
      </Link>
    </Row>
  );
};

export default WhatsAppHelpLink;
