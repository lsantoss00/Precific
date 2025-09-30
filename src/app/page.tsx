"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../components/core";
import AuthGuard from "../components/core/auth-guard";
import Column from "../components/core/column";
import { logout } from "./entrar/services";

export default function Home() {
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
    <AuthGuard requireAuth>
      <Column className="w-full justify-center items-center">
        <h1 className="text-2xl font-bold">Precific Private Page</h1>
        <Button
          type="button"
          variant="link"
          className="text-red-500"
          onClick={() => doLogout()}
          disabled={pendingLogout}
        >
          Sair
        </Button>
      </Column>
    </AuthGuard>
  );
}
