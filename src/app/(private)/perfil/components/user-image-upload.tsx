"use client";

import { Card, Input } from "@/src/components/core";
import { UserIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type UserUploadProps = {
  initialPreview?: string | null;
  file?: File | null;
  onChange?: (file: File | null, preview: string | null) => void;
  disabled?: boolean;
};

const UserImageUpload = ({
  file,
  initialPreview,
  onChange,
  disabled,
}: UserUploadProps) => {
  const [preview, setPreview] = useState<string | null>(initialPreview || null);
  const [_, setIsHovering] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreview(initialPreview || null);
  }, [initialPreview, file]);

  return (
    <Card
      className={`p-6 md:h-33 w-full shadow-2xs transition-colors duration-200 border-neutral-100 flex justify-center rounded-sm relative ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "cursor-pointer hover:bg-gray-100"
      }`}
    >
      <div
        className="flex flex-col sm:flex-row lg:!flex-row max-sm:text-center lg:!text-center lg:!text-start justify-start items-center gap-4"
        onClick={() => !disabled && ref.current?.click()}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="w-24 h-24 rounded-full flex justify-center items-center border-2 border-[#66289B] relative">
          {preview ? (
            <div className="relative w-full h-full overflow-hidden rounded-full">
              <Image
                src={preview}
                alt="Preview"
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
          ) : (
            <UserIcon />
          )}
          <Input
            ref={ref}
            className="hidden opacity-0"
            type="file"
            accept="image/*"
            disabled={disabled}
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
        </div>
        <div>
          <p className="text-base font-medium">Selecionar foto</p>
          <span className="text-sm text-neutral-500 mt-1 font-normal">
            Selecione um arquivo com até 100mb
          </span>
        </div>
        {preview && !disabled && (
          <button
            className="flex w-12 h-12 cursor-pointer absolute right-0 top-4"
            onClick={(e) => {
              e.stopPropagation();
              setPreview(null);
              if (onChange) onChange(null, "");
            }}
          >
            <XIcon />
          </button>
        )}
      </div>
    </Card>
  );
};

export default UserImageUpload;
