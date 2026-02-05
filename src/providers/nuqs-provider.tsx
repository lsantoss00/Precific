import { NuqsAdapter } from "nuqs/adapters/next/app";

interface NuqsProviderProps {
  children: React.ReactNode;
}

export const NuqsProvider = ({ children }: NuqsProviderProps) => {
  return <NuqsAdapter>{children}</NuqsAdapter>;
};
