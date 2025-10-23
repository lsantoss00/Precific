export type ServiceResponseType<T = undefined> = {
  success: boolean;
  data?: T;
  error?: string | null;
};
