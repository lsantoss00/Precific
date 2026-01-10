import { AuthProvider } from "@/src/providers/auth-provider";
import { SidebarProvider } from "../components/core";
import { TanstackQueryProvider } from "./tanstack-query-provider";
interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <TanstackQueryProvider>
      <AuthProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </AuthProvider>
    </TanstackQueryProvider>
  );
};

export default Providers;
