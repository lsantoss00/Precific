import Column from "@/src/components/core/column";
import NewPasswordCard from "./components/new-password-card";

export default function CreateNewPasswordPage() {
  return (
    <Column className="space-y-4 items-center justify-center w-full mx-2">
      <NewPasswordCard />
    </Column>
  );
}
