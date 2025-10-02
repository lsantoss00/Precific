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
import { useRouter } from "next/navigation";
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

  if (!user) return null;

  const route = useRouter();

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

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="p-3">
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
      <SidebarFooter>
        <SidebarMenu>
          <Separator />
          <SidebarMenuItem className="p-3">
            <Row className="justify-between items-center">
              <Column>
                <span className="text-xs">Bem vindo,</span>
                <span className="text-sm">{user?.email}</span>
              </Column>
              <Button variant="ghost" onClick={() => doLogout()}>
                <Show
                  when={pendingLogout}
                  fallback={<DoorOpen className="text-destructive !w-5 !h-5" />}
                >
                  <Loader2 />
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
