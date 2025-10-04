"use client";

import { Button, Card } from "@/src/components/core";
import Row from "@/src/components/core/row";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const NewProductFormResult = () => {
  const router = useRouter();

  return (
    <Row className="w-full h-full space-x-2">
      <Button
        className="h-full w-20"
        onClick={() => router.push("/produtos/novo")}
      >
        <ChevronLeft className="!w-12 !h-12" />
      </Button>
      <Card className="h-full w-full p-6 rounded-md">
        <h3>Pré reforma tributária...</h3>
      </Card>
    </Row>
  );
};

export default NewProductFormResult;
