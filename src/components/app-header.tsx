"use client";

import { useAuth } from "@/src/providers/auth-provider";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon, LogOut, Menu as MenuIcon, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "../app/(public)/entrar/services/logout";
import { SidebarTrigger } from "./core";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./core/dropdown-menu";
import Row from "./core/row";
import Show from "./core/show";

export function AppHeader() {
  const { profile } = useAuth();
  const router = useRouter();

  const { mutate: doLogout, isPending: pendingDoLogout } = useMutation({
    mutationFn: logout,
    onSuccess: () => router.push("/entrar"),
  });

  return (
    <header className="bg-[#fafafa] sticky top-0 z-50 border-b xl:hidden">
      <div className="h-[env(safe-area-inset-top)]" />
      <Row className="w-full h-20 justify-between items-center px-4">
        <SidebarTrigger className="!p-2 hover:bg-gray-100 rounded-md transition-colors shrink-0">
          <MenuIcon className="!w-6 !h-6 text-gray-700" />
        </SidebarTrigger>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger
            asChild
            className="cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors shrink-0"
          >
            <button>
              <User className="text-primary border-2 border-primary rounded-md w-8 h-8 p-1" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 p-1" align="end">
            <DropdownMenuLabel className="flex flex-col">
              <span className="text-xs sm:text-sm text-neutral-500">
                {profile?.username}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/perfil">
                Perfil
                <DropdownMenuShortcut>
                  <User />
                </DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="!text-red-600 cursor-pointer"
              onClick={() => doLogout()}
            >
              Sair
              <DropdownMenuShortcut>
                <Show
                  when={!pendingDoLogout}
                  fallback={
                    <Loader2Icon className="animate-spin text-red-600" />
                  }
                >
                  <LogOut className="text-red-600" />
                </Show>
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Row>
    </header>
  );
}
