"use client";

import { useSidebar } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Row from "@/src/components/core/row";
import { useAuth } from "@/src/providers/auth-provider";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "../app/(public)/entrar/services/logout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./core/dropdown-menu";
import Show from "./core/show";

const Menu = () => {
  const { profile } = useAuth();
  const { state } = useSidebar();

  const isCollapsed = state === "collapsed";

  const router = useRouter();

  const { mutate: doLogout, isPending: pendingDoLogout } = useMutation({
    mutationFn: logout,
    onSuccess: () => router.push("/entrar"),
  });

  const firstName = profile?.username?.split(" ")[0] || "";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        asChild
        className="cursor-pointer hover:bg-neutral-100 p-2 h-12 rounded-md"
      >
        <Row className="w-full items-center gap-2">
          <User className="text-[#66289B] border-2 border-[#66289B] rounded-md w-8 h-8 p-1 shrink-0" />
          <Show when={!isCollapsed}>
            <Column className="min-w-0 flex-1">
              <span className="text-sm font-medium text-neutral-900 truncate">
                {firstName}
              </span>
              <span className="text-xs text-neutral-500 truncate">
                {profile?.email}
              </span>
            </Column>
          </Show>
        </Row>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-1" align="start">
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
              fallback={<Loader2Icon className="animate-spin text-red-600" />}
            >
              <LogOut className="text-red-600" />
            </Show>
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
