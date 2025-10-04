"use client";

import { Button } from "@/src/components/core";
import Row from "@/src/components/core/row";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import AcquisitionCostForm from "./acquisition-cost-form";
import PrecificationForm from "./precification-form";

const NewProductForm = () => {
  const router = useRouter();

  return (
    <Row className="w-full h-full space-x-2">
      <AcquisitionCostForm />
      <div className="w-20 h-1 bg-[#66289B] rounded-full self-center" />
      <PrecificationForm />
      <Button
        className="h-full w-20"
        onClick={() => router.push("/produtos/novo/resultado")}
      >
        <ChevronRight className="!w-12 !h-12" />
      </Button>
    </Row>
  );
};

export default NewProductForm;
