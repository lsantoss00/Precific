"use client";

import { Button } from "@/src/components/core";
import Row from "@/src/components/core/row";
import { Play } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

type Props = {
  videoId: string;
  title?: string;
  className?: string;
};

const YouTubeEmbed: React.FC<Props> = ({
  videoId,
  title = "Vídeo",
  className = "",
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [thumbIndex, setThumbIndex] = useState(0);

  const embedBase = `https://www.youtube-nocookie.com/embed/${videoId}`;
  const embedParams = "rel=0&modestbranding=1&playsinline=1&controls=1";

  const thumbnailCandidates = [
    `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`,
    `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
    `https://i.ytimg.com/vi/${videoId}/default.jpg`,
  ];

  const thumbnail = thumbnailCandidates[thumbIndex];

  return (
    <div className={`w-full h-full ${className}`}>
      {!isLoading ? (
        <Button
          type="button"
          aria-label={`Carregar vídeo: ${title}`}
          onClick={() => setIsLoading(true)}
          variant="ghost"
          className="group relative w-full h-full p-0 overflow-hidden rounded-md bg-black"
        >
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={thumbnail}
              alt={title}
              fill
              sizes="(max-width: 640px) 95vw, (max-width: 1024px) 90vw, (max-width: 1280px) 50vw, 720px"
              className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
              priority
              loading="eager"
              onError={() => {
                if (thumbIndex < thumbnailCandidates.length - 1) {
                  setThumbIndex((i) => i + 1);
                }
              }}
            />
          </div>
          <Row className="absolute left-0 bottom-0 gap-4 p-4 pointer-events-none bg-background/10 w-full">
            <Row
              className="justify-center bg-primary rounded-full p-3 shadow-lg"
              aria-hidden
            >
              <Play className="w-5 h-5 text-white" />
            </Row>
          </Row>
        </Button>
      ) : (
        <div className="relative w-full h-full rounded-md bg-black">
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-md"
            src={`${embedBase}?${embedParams}&autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};

export default YouTubeEmbed;
