import { AppHeader } from "@/src/components/app-header";
import { AppSidebar } from "@/src/components/app-sidebar";
import CompanyFormDialog from "@/src/components/company-form-dialog";
import { SidebarInset } from "@/src/components/core";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CompanyFormDialog />
      <AppSidebar />
      <SidebarInset className="flex flex-col min-h-screen">
        <AppHeader />
        <div className="flex h-full w-full justify-center pb-24 2xl:pb-0">
          {children}
        </div>
      </SidebarInset>
    </>
  );
}
