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
      <SidebarInset className="flex flex-col min-h-screen h-full !bg-transparent">
        <main className="flex flex-1 w-full justify-center">{children}</main>
      </SidebarInset>
    </>
  );
}
