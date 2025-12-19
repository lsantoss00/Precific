"use client";

import UserImageUpload from "@/src/app/(private)/perfil/components/user-image-upload";
import { Card, Input, Label } from "@/src/components/core";
import Column from "@/src/components/core/column";
import { useAuth } from "@/src/providers/auth-provider";

const UserData = () => {
  const { profile } = useAuth();

  return (
    <Card className="w-full p-6 rounded-md flex space-y-6">
      <h3>Dados do Usuário</h3>
      <div className="space-y-4">
        <Column className="space-y-2">
          <Label htmlFor="profile_picture">Foto de Perfil</Label>
          <UserImageUpload
            onChange={(file, preview) => {
              // form.setValue("avatarFile", file);
              // form.setValue("avatar", preview);
              // form.setValue("hasClearUrlImage", preview === "");
            }}
            // initialPreview={values.avatar}
            // file={values.avatarFile}
          />
        </Column>

        <div className="space-y-4 flex flex-col justify-between">
          <Column className="space-y-2">
            <Label htmlFor="companyName">Nome</Label>
            <Input id="name" value={profile?.username ?? ""} disabled />
          </Column>
          <Column className="space-y-2">
            <Label htmlFor="taxRegime">Email</Label>
            <Input id="email" value={profile?.email ?? ""} disabled />
          </Column>
        </div>
      </div>
    </Card>
  );
};

export default UserData;
