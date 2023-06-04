"use client";

import { FC, useEffect, useState } from "react";
import NoMedia from "@/components/NoMedia";
import dynamic from "next/dynamic";

const VideoPlayer = dynamic(() => import("@/components/VideoPlayer"), {
  ssr: false,
});

const Player: FC = () => {
  const [videojsReady, setVideojsReady] = useState(false);
  const [src, setSrc] = useState<string | undefined>();

  useEffect(() => {
    // Don't render until window.videojs is defined
    const interval = setInterval(() => {
      if ((window as any).videojs) {
        setVideojsReady(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!videojsReady) return null;

  if (!src)
    return (
      <NoMedia
        handleChange={(file) => {
          console.log(file);
          setSrc(URL.createObjectURL(file));
        }}
      />
    );

  return <VideoPlayer src={src} />;
};

export default Player;
