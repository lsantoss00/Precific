import NewPasswordForm from "@/src/app/(public)/criar-nova-senha/components/new-password-form";
import Column from "@/src/components/core/column";

export default function CreateNewPasswordPage() {
  return (
    <Column className="space-y-4 items-center justify-center w-full mx-2">
      <NewPasswordForm />
    </Column>
  );
}
