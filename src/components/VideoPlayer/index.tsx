import { FC, useEffect, useRef } from "react";
import classes from "./VideoPlayer.module.scss";
import { appWindow } from "@tauri-apps/api/window";

type VideoPlayerProps = {
  src: string;
};

// Set events
const playerInitializer = (player: any) => {
  // 1: VR
  player.mediainfo = player.mediainfo || {};
  player.mediainfo.projection = "360";

  player.vr({
    projection: "AUTO",
    debug: true,
    forceCardboard: false,
  });

  // 2: Listen for the event: when user clicked the fullscreen button
  player.on("fullscreenchange", () => {
    if (player.isFullscreen()) {
      appWindow.setFullscreen(true);
    } else {
      appWindow.setFullscreen(false);
    }
  });

  // Global Keybindings (assign it to document ONCE)
  const keydownHandler = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowLeft":
        player.currentTime(player.currentTime() - 5);
        break;
      case "ArrowRight":
        player.currentTime(player.currentTime() + 5);
        break;
      case "ArrowUp":
        player.volume(player.volume() + 0.1);
        break;
      case "ArrowDown":
        player.volume(player.volume() - 0.1);
        break;
      case " ":
        if (player.paused()) {
          player.play();
        } else {
          player.pause();
        }
        break;
      case "f":
        if (player.isFullscreen()) {
          player.exitFullscreen();
        } else {
          player.requestFullscreen();
        }
        break;
    }
  };

  document.addEventListener("keydown", keydownHandler);
};

const VideoPlayer: FC<VideoPlayerProps> = ({ src }) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");

      videoElement.classList.add(classes.fullScreen);
      videoRef.current?.appendChild(videoElement);

      const player = (playerRef.current = (window as any).videojs(
        videoElement,
        {
          autoplay: true,
          controls: true,
          sources: [
            {
              src,
              type: "video/mp4",
            },
          ],
        },
        () => {
          console.log("Player is ready.");
        }
      ));

      playerInitializer(player);
    } else {
      const player = playerRef.current;

      player.src({
        src,
        type: "video/mp4",
      });

      playerInitializer(player);
    }
  }, [videoRef]);

  useEffect(() => {
    const player = playerRef.current;
    if (player) {
      console.log(`Player is determined: `, player);
    }

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player={1}>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoPlayer;
