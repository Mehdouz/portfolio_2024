"use client";
import { Fugaz_One, IBM_Plex_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import localFont from "next/font/local";
import ProjectHome from "@/components/ProjectHome";
import { Canvas } from "@react-three/fiber";
import BackgroundCanvas from "@/components/Background";
import { ACESFilmicToneMapping, SRGBColorSpace } from "three";
import { projects } from "../data/data";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const humane = localFont({
  src: "../public/fonts/humaneBold.woff2",
  variable: "--font-humane",
});
const roobert = localFont({
  src: "../public/fonts/roobertRegular.woff2",
  variable: "--font-roobert",
});

const fugaz = Fugaz_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-fugaz",
});

const ibm_flex_mono = IBM_Plex_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-ibm",
});

export default function Home() {
  let rootRef = useRef();

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".baselineText",
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.5,
          ease: "expo.out",
        }
      );
    }, rootRef); // <-- SCOPE!!!

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <main
      ref={rootRef}
      className={`px-20 ${fugaz.variable} ${ibm_flex_mono.variable} ${humane.variable} ${roobert.variable}`}
    >
      <div className="h-screen w-screen fixed top-0 left-0 z-0">
        <Canvas
          dpr={1}
          gl={{
            toneMapping: ACESFilmicToneMapping,
            outputColorSpace: SRGBColorSpace,
          }}
          camera={{
            fov: 60,
            near: 1,
            far: 8,
            position: [0, -3, 2],
            rotation: [Math.PI * 0.2, 0, 0],
          }}
        >
          <BackgroundCanvas />
        </Canvas>
      </div>
      <div className="relative">
        <div className="h-screen w-full flex items-center justify-end">
          <h1 className="baselineText uppercase font-humane text-white text-[14rem] mr-[10%] text-right leading-[12rem] mix-blend-exclusion">
            MEHDI M’CIRDI
            <br />
            DEVELOPPEUR FULL-STACK
          </h1>
        </div>
        <div>
          {projects.length > 0 &&
            projects.map((project, i) => (
              <ProjectHome key={i} project={project} index={i + 1} />
            ))}
        </div>
      </div>
    </main>
  );
}
