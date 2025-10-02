"use client";

import { useMutation } from "@tanstack/react-query";
import {
  DoorOpen,
  Inbox,
  Info,
  LayoutDashboard,
  Loader2,
  Settings,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { logout } from "../app/entrar/services";
import { useAuth } from "../hooks/use-auth";
import {
  Button,
  Separator,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./core";
import Column from "./core/column";
import Row from "./core/row";
import Show from "./core/show";

export function AppSidebar() {
  const { user } = useAuth();
  const route = useRouter();
  const pathname = usePathname();

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

  if (!user) return null;

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="p-2">
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
              {mainItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.url}>
                        <item.icon className="!w-5 !h-5" />
                        <span className="font-medium">{item.title}</span>
                      </Link>
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
            <SidebarMenu>
              {secondaryItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.url}>
                        <item.icon className="!w-5 !h-5" />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <Separator />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="px-2">
            <Row className="justify-between items-center">
              <Column>
                <span className="text-xs">Bem vindo,</span>
                <span className="text-xs">{user?.email}</span>
              </Column>
              <Button variant="ghost" onClick={() => doLogout()}>
                <Show
                  when={pendingLogout}
                  fallback={<DoorOpen className="text-destructive !w-5 !h-5" />}
                >
                  <Loader2 className="animate-spin text-destructive !w-5 !h-5" />
                </Show>
              </Button>
            </Row>
          </SidebarMenuItem>
        </SidebarMenu>
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
