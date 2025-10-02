import { Inbox, Info, LayoutDashboard, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Separator,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./core";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="p-6">
        <SidebarGroup>
          <SidebarGroupLabel>
            <Image
              src="/precific-logo.png"
              alt="precific-logo"
              width={220}
              height={40}
            />
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-10">
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon className="text-[#66289B] !w-5 !h-5" />
                      <span className="text-[#66289B] font-medium">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Separator />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon className="text-[#66289B] !w-5 !h-5" />
                      <span className="text-[#66289B] font-medium">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

const mainItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Produtos",
    url: "/produtos",
    icon: Inbox,
  },
];

const secondaryItems = [
  {
    title: "Configurações",
    url: "/configuracoes",
    icon: Settings,
  },
  {
    title: "Suporte",
    url: "/suporte",
    icon: Info,
  },
];
