"use client";

import { Inbox, Info, LayoutDashboard, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../hooks/use-auth";
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
  const { user } = useAuth();
  const { state } = useSidebar();
  const pathname = usePathname();

  const isCollapsed = state === "collapsed";

  if (!user) return null;

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="flex">
        <SidebarGroup className="flex items-center">
          <SidebarHeader className="mt-2">
            <SidebarTrigger className="w-full h-full p-0">
              {isCollapsed ? (
                <Image
                  src="/precific-short-logo.png"
                  alt="precific-logo"
                  width={60}
                  height={60}
                  quality={100}
                  className="hover:cursor-pointer"
                />
              ) : (
                <Image
                  src="/precific-logo.png"
                  alt="precific-logo"
                  width={220}
                  height={40}
                  quality={100}
                  className="hover:cursor-pointer"
                />
              )}
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
                          <item.icon className="!w-5 !h-5" />
                          {!isCollapsed && (
                            <span className="font-medium">{item.title}</span>
                          )}
                        </>
                      ) : (
                        <Link href={item.url}>
                          <item.icon className="!w-5 !h-5" />
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
                          <item.icon className="!w-5 !h-5" />
                          {!isCollapsed && (
                            <span className="font-medium">{item.title}</span>
                          )}
                        </>
                      ) : (
                        <Link href={item.url}>
                          <item.icon className="!w-5 !h-5" />
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
      <SidebarFooter className="items-center mb-2">
        <span className="text-[#66289B] text-xs font-medium">Versão MVP</span>
      </SidebarFooter>
    </Sidebar>
  );
}

const mainItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    disabled: true,
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
    disabled: true,
  },
  {
    title: "Suporte",
    url: "/suporte",
    icon: Info,
    disabled: true,
  },
];
