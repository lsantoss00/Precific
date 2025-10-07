"use client";

import AuthGuard from "@/src/components/core/auth-guard";
import Column from "@/src/components/core/column";
import NewProductForm from "./components/new-product-form";

export default function ProductFormPage({}: // params,
{
  // params: { id: string };
}) {
  // const { id } = params;
  // const isNewProduct = id === "novo";

  // console.log("Product ID from params:", id);

  // const { data: product, isPending } = useQuery({
  //   queryFn: () => getProductById({ productId: id }),
  //   queryKey: ["product", id],
  // });

  // console.log("@@@product", product);

  return (
    <AuthGuard requireAuth>
      <Column className="w-full h-full pt-28 pb-10 xl:pl-12 xl:pr-20 space-y-3">
        <h2 className="text-3xl text-black font-bold">
          {/* {isNewProduct ? "Novo Produto" : `Editar Produto`} */}' Novo
          Produto
        </h2>
        <NewProductForm />
      </Column>
    </AuthGuard>
  );
}
