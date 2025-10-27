const errorMessagesTranslation: Record<string, string> = {
  // LOGIN
  "Invalid login credentials": "Credenciais inválidas.",
  invalid_credentials: "Credenciais inválidas.",
  email_not_confirmed:
    "E-mail não confirmado. Verifique sua caixa de entrada ou reenvie a confirmação.",
  phone_not_confirmed:
    "Telefone não confirmado. Conclua a verificação para entrar.",

  // SIGN UP
  "User already registered": "Usuário já registrado.",
  email_exists: "Este e-mail já está cadastrado.",
  phone_exists: "Este telefone já está cadastrado.",
  email_provider_disabled: "Cadastros com e-mail/senha estão desativados.",
  phone_provider_disabled: "Cadastros com telefone/senha estão desativados.",
  "Signup disabled for this provider":
    "Cadastro desabilitado para este provedor.",

  // PASSWORD
  "Password should contain at least one character of each: abcdefghijklmnopqrstuvwxyz, ABCDEFGHIJKLMNOPQRSTUVWXYZ, 0123456789, !@#$%^&*()_+-=[]{};':\"|<>?,./`~.":
    "Senha deve conter ao menos um caractere de cada tipo: letras minúsculas, letras maiúsculas, números e símbolos permitidos [!@#$%^&*()_+-=[]{};':\"|<>?,./`~].",
  weak_password:
    "Senha muito fraca. Siga a política: mínimo de 1 minúscula, 1 maiúscula, 1 número e 1 símbolo permitido.",
  password_too_weak:
    "Senha muito fraca. Siga a política: mínimo de 1 minúscula, 1 maiúscula, 1 número e 1 símbolo permitido.",

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
  identity_not_found: "Identidade não encontrada.",
  identity_already_exists: "Esta identidade já está vinculada a um usuário.",
  "Email not confirmed": "O e-mail ainda não foi confirmado.",
  "User is banned":
    "Usuário banido. Caso acredite que foi um erro, entre em contato conosco.",

  // OTHERS
  captcha_failed: "Falha ao verificar o CAPTCHA. Tente novamente.",
  conflict: "Conflito de operação. Aguarde um instante e tente novamente.",
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
