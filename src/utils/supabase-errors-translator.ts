const errorMessagesTranslation: Record<string, string> = {
  // LOGIN
  "Invalid login credentials": "E-mail ou senha inválidos.",
  invalid_credentials: "E-mail ou senha inválidos.",
  email_not_confirmed:
    "E-mail não confirmado. Verifique sua caixa de entrada ou reenvie a confirmação.",

  // PASSWORD
  "Password should contain at least one character of each: abcdefghijklmnopqrstuvwxyz, ABCDEFGHIJKLMNOPQRSTUVWXYZ, 0123456789, !@#$%^&*()_+-=[]{};':\"|<>?,./`~.":
    "A senha deve conter ao menos um caractere de cada tipo: letras minúsculas, letras maiúsculas, números e símbolos.",

  // OTP / MAGIC LINK
  otp_expired: "Código expirado. Solicite um novo código.",
  otp_disabled: "Login por código (OTP/magic link) está desativado.",
  provider_email_needs_verification:
    "Finalize a verificação do e-mail enviada após o login pelo provedor.",

  // LIMITS
  over_request_rate_limit:
    "Muitas solicitações. Tente novamente em alguns instantes.",
  over_email_send_rate_limit:
    "Muitos e-mails enviados. Aguarde antes de tentar novamente.",
  over_sms_send_rate_limit:
    "Muitas SMS enviadas. Aguarde antes de tentar novamente.",
  request_timeout: "Tempo de processamento excedido. Tente novamente.",

  // SESSION
  refresh_token_not_found: "Sessão expirada. Faça login novamente.",
  refresh_token_already_used: "Sessão inválida. Faça login novamente.",
  bad_jwt: "Sessão inválida. Faça login novamente.",
  no_authorization: "Autorização ausente. Faça login para continuar.",

  // FIELDS
  bad_json: "Requisição inválida. Verifique os dados enviados.",
  email_address_invalid: "Endereço de e-mail inválido.",

  // ACCOUNT
  "User not found": "Usuário não encontrado.",
  "Email not confirmed": "O e-mail ainda não foi confirmado.",
  "User is banned":
    "Usuário banido. Caso acredite que foi um erro, entre em contato conosco.",

  // OTHERS
  conflict: "Conflito de operação. Aguarde um instante e tente novamente.",

  // COMPANY
  'duplicate key value violates unique constraint "companies_cnpj_unique"':
    "Já existe uma empresa cadastrada com esse CNPJ.",
};

type SupabaseError =
  | { message?: string; code?: string }
  | string
  | null
  | undefined;

export function supabaseErrorsTranslator(error: SupabaseError): string {
  if (!error) return "Ocorreu um erro inesperado.";
  const key =
    typeof error === "string"
      ? error
      : error.code || error.message || "Ocorreu um erro inesperado.";
  return (
    errorMessagesTranslation[key] ||
    errorMessagesTranslation[error as string] ||
    (typeof error === "string"
      ? error
      : error.message || "Ocorreu um erro inesperado.")
  );
}
