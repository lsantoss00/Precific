"use client";

import { Button, Card } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Show from "@/src/components/core/show";
import { User, XIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type UserUploadProps = {
  initialPreview?: string | null;
  file?: File | null;
  onChange?: (file: File | null, preview: string | null) => void;
};

const UserImageUpload = ({
  file,
  initialPreview,
  onChange,
}: UserUploadProps) => {
  const [preview, setPreview] = useState<string | null>(initialPreview || null);
  const [_, setIsHovering] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreview(initialPreview || null);
  }, [initialPreview, file]);

  return (
    <Card
      className="p-4.5 w-full shadow-2xs transition-colors duration-200 border-neutral-100 flex flex-col md:flex-row md:items-center rounded-sm relative cursor-pointer hover:bg-gray-100 gap-4"
      onClick={() => ref.current?.click()}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="min-h-24 w-24 rounded-md flex border-2 border-primary relative overflow-hidden shrink-0">
        <Show
          when={preview}
          fallback={<User className="w-8 h-8 text-primary m-auto" />}
        >
          <Image
            src={preview!}
            alt="Preview"
            fill
            sizes="96px"
            className="object-cover"
          />
        </Show>
      </div>
      <Column>
        <p className="text-base font-medium">Selecionar foto</p>
        <span className="text-sm text-neutral-500 mt-1 font-normal">
          Selecione um arquivo com até 100mb.
        </span>
      </Column>
      <Show when={preview}>
        <Button
          variant="ghost"
          className="flex w-12 h-12 cursor-pointer absolute right-0 top-0"
          onClick={(e) => {
            e.stopPropagation();
            setPreview(null);
            if (onChange) onChange(null, "");
          }}
          aria-label="Remover imagem"
        >
          <XIcon />
        </Button>
      </Show>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer pointer-events-none"
        onChange={(e) => {
          const fileList = e.target.files || [];
          if (fileList.length > 0) {
            const file = fileList[0];

            if (file && onChange) {
              if (file.size > 100 * 1024 * 1024) return;

              const objectUrl = URL.createObjectURL(file);
              setPreview(objectUrl);
              onChange(file, objectUrl);
            }
          }
        }}
      />
    </Card>
  );
};

export default UserImageUpload;
