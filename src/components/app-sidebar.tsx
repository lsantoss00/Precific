"use client";

import logoImage from "@/public/images/precific-logo-image.webp";
import shortLogoImage from "@/public/images/precific-short-logo-image.webp";
import Menu from "@/src/components/menu";
import { Inbox, Info, LayoutDashboard, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Separator,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "./core";

export function AppSidebar() {
  const { state } = useSidebar();
  const pathname = usePathname();

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="flex overflow-hidden">
        <SidebarGroup className="flex items-center">
          <SidebarHeader className="p-0! h-16 items-center justify-center">
              <SidebarTrigger className="w-full h-full hover:bg-transparent!">
              <Image
                src={shortLogoImage}
                alt="Logo do Precific"
                width={48}
                height={48}
                priority
                className={`hover:cursor-pointer shrink-0 ${
                  !isCollapsed && "hidden"
                }`}
              />
              <Image
                src={logoImage}
                alt="Logo do Precific - Sistema de Precificação e Gestão Tributária"
                width={200}
                height={40}
                priority
                className={`hover:cursor-pointer shrink-0 ${
                  isCollapsed && "hidden"
                }`}
              />
            </SidebarTrigger>
          </SidebarHeader>
          <SidebarGroupContent className="mt-5">
            <SidebarMenu className={`${isCollapsed && "items-center"}`}>
              {mainItems.map((item) => {
                const isActive = pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild={!item.disabled}
                      isActive={isActive}
                      disabled={item.disabled}
                      className="flex"
                    >
                      {item.disabled ? (
                        <>
                          <item.icon className="w-5! h-5!" />
                          {!isCollapsed && (
                            <span className="font-medium">{item.title}</span>
                          )}
                        </>
                      ) : (
                        <Link href={item.url}>
                          <item.icon className="w-5! h-5!" />
                          {!isCollapsed && (
                            <span className="font-medium">{item.title}</span>
                          )}
                        </Link>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Separator />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className={`${isCollapsed && "items-center"}`}>
              {secondaryItems.map((item) => {
                const isActive = pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild={!item.disabled}
                      isActive={isActive}
                      disabled={item.disabled}
                    >
                      {item.disabled ? (
                        <>
                          <item.icon className="w-5! h-5!" />
                          {!isCollapsed && (
                            <span className="font-medium">{item.title}</span>
                          )}
                        </>
                      ) : (
                        <Link href={item.url}>
                          <item.icon className="w-5! h-5!" />
                          {!isCollapsed && (
                            <span className="font-medium">{item.title}</span>
                          )}
                        </Link>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="items-center mb-2 space-y-4">
        <Menu />
        <span className="text-gray-500 text-xs font-medium">v0.1.0</span>
      </SidebarFooter>
    </Sidebar>
  );
}

const mainItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    disabled: false,
  },
  {
    title: "Produtos",
    url: "/produtos",
    icon: Inbox,
    disabled: false,
  },
];

const secondaryItems = [
  {
    title: "Configurações",
    url: "/configuracoes",
    icon: Settings,
    disabled: false,
  },
  {
    title: "Suporte",
    url: "/suporte",
    icon: Info,
    disabled: false,
  },
];
