import Link from "next/link";
import WhatsAppIcon from "../../public/whatsapp-logo.svg";

const WhatsAppHelpLink = () => {
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
    <Link
      className="fixed bottom-3 right-3 flex items-center justify-center opacity-80 hover:opacity-100 z-20"
      href={whatsAppLink}
      target="_blank"
    >
      <WhatsAppIcon />
    </Link>
  );
};

export default WhatsAppHelpLink;
