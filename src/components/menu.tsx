"use client";

import { useMutation } from "@tanstack/react-query";
import { CircleUser, Loader2Icon, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/src/providers/auth-provider";
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
  const { user } = useAuth();

  const router = useRouter();

  const { mutate: doLogout, isPending: pendingDoLogout } = useMutation({
    mutationFn: logout,
    onSuccess: () => router.push("/entrar"),
  });

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <CircleUser className="text-[#66289B] w-10 h-10" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-1" align="end">
        <DropdownMenuLabel className="flex flex-col">
          <span className="text-base">{user?.user_metadata?.display_name}</span>
          <span className="text-xs sm:text-sm text-gray-500">
            {user?.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push("/meu-perfil")}
        >
          Meu Perfil
          <DropdownMenuShortcut>
            <User />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="!text-red-600  cursor-pointer"
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
