import { ContactType } from "../types/contact-type";

interface PostContactProps {
  contact: ContactType;
}

export async function postContact({ contact }: PostContactProps) {
  const MOCK_API_URL = "https://api.precific.com/v1/contacts";

  const response = await fetch(MOCK_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });

  if (!response.ok) {
    throw new Error("Erro ao enviar formulário de contato");
  }

  return await response.json();
}
