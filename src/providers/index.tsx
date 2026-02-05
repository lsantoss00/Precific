import { AuthProvider } from "@/src/providers/auth-provider";
import { NuqsProvider } from "@/src/providers/nuqs-provider";
import { TanstackQueryProvider } from "@/src/providers/tanstack-query-provider";
import { SidebarProvider } from "../components/core";
interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <TanstackQueryProvider>
      <AuthProvider>
        <NuqsProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </NuqsProvider>
      </AuthProvider>
    </TanstackQueryProvider>
  );
};

export default Providers;
