import { Poppins } from "next/font/google";
import "@/styles/globals.scss";

import { ReactNode } from "react";

const poppins = Poppins({
  display: "swap",
  subsets: ["latin-ext"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "VR Interactive Video Player",
  description: "A VR interactive video player built with Next.js and Tauri.",
};

type LayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/video.js@7.10.2/dist/video-js.css"
          rel="stylesheet"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/video.js@7.10.2/dist/video.js"
          defer
        ></script>
        <script>window.HELP_IMPROVE_VIDEOJS = false;</script>
        <script
          src="https://cdn.jsdelivr.net/npm/videojs-vr/dist/videojs-vr.js"
          defer
        ></script>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/videojs-vr/dist/videojs-vr.css"
        />
        <script
          src={
            "https://cdn.jsdelivr.net/npm/videojs-sprite-thumbnails/dist/videojs-sprite-thumbnails.js"
          }
          defer
        ></script>

        {/*  Favicon.ico */}
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </head>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
