import { SidebarProvider } from "../components/core";
import { TanstackQueryProvider } from "./tanstack-query-provider";
interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <TanstackQueryProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </TanstackQueryProvider>
  );
};

export default Providers;
