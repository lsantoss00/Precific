"use client";

import { useMutation } from "@tanstack/react-query";
import { Inbox, Info, LayoutDashboard, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { logout } from "../app/entrar/services";
import { useAuth } from "../hooks/use-auth";
import {
  Separator,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./core";

export function AppSidebar() {
  const { user } = useAuth();
  const route = useRouter();
  const pathname = usePathname();
  const { state } = useSidebar();

  const { mutate: doLogout, isPending: pendingLogout } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      route.push("/entrar");
    },
    onError: (error) => {
      toast.error(error.message, {
        className: "!bg-red-600/80 !text-white",
      });
    },
  });

  const isCollapsed = state === "collapsed";

  if (!user) return null;

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="flex">
        <SidebarGroup className="flex items-center">
          <SidebarHeader className="mt-2">
            {isCollapsed ? (
              <Image
                src="/precific-short-logo.png"
                alt="precific-logo"
                width={60}
                height={60}
                quality={100}
              />
            ) : (
              <Image
                src="/precific-logo.png"
                alt="precific-logo"
                width={220}
                height={40}
                quality={100}
              />
            )}
          </SidebarHeader>
          <SidebarGroupContent className="mt-5">
            <SidebarMenu className={`${isCollapsed && "items-center"}`}>
              {mainItems.map((item) => {
                const isActive = pathname === item.url;
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
                const isActive = pathname === item.url;
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
