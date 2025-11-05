import CompanyData from "@/src/app/(private)/perfil/components/company-data";
import UserData from "@/src/app/(private)/perfil/components/user-data";
import Column from "@/src/components/core/column";
import Flex from "@/src/components/core/flex";

export default function ProfilePage() {
  return (
    <Column className="w-full py-10 px-6 xl:px-0 space-y-3 max-w-7xl xl:max-w-5xl 2xl:max-w-[1500px]">
      <h2 className="text-3xl text-black font-bold">Perfil</h2>
      <Flex className="flex flex-col lg:flex-row w-full flex-1 gap-4">
        <UserData />
        <CompanyData />
      </Flex>
    </Column>
  );
}
