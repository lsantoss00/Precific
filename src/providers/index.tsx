import { TanstackQueryProvider } from "./tanstack-query-provider";
interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return <TanstackQueryProvider>{children}</TanstackQueryProvider>;
};

export default Providers;
