"use client";
import { Fugaz_One, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import { projects } from "../data/data";
import { useContext, useRef } from "react";
import gsap from "gsap";
import Projects from "@/components/Projects";
import { TransitionContext } from "@/components/TransitionContext";
import { useGSAP } from "@gsap/react";
import AnimatedCursor from "@/hooks/useCursor";

const humane = localFont({
  src: "../public/fonts/humaneBold.woff2",
  variable: "--font-humane",
});

const roobert = localFont({
  src: "../public/fonts/roobertRegular.woff2",
  variable: "--font-roobert",
});

const avenir = localFont({
  src: "../public/fonts/avenirHeavy.woff2",
  variable: "--font-avenir",
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

export default function Home({ works }) {
  const rootRef = useRef();
  const textRef = useRef();

  const { timeline } = useContext(TransitionContext);

  useGSAP(
    () => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "expo.out",
          marker: true
        }
      );
      timeline.add(
        gsap.fromTo(
          textRef.current,
          { opacity: 1 },
          {
            opacity: 0,
          }
        ),
        0
      );
    },
    { scope: rootRef }
  );

  return (
    <main
      ref={rootRef}
      className={`px-20 ${fugaz.variable} ${ibm_flex_mono.variable} ${humane.variable} ${roobert.variable} ${avenir.variable}`}
    >
      <AnimatedCursor
        innerSize={0}
        outerSize={15}
        outerAlpha={1}
        outerScale={8}
        hasBlendMode={true}
        outerStyle={{
          background: "#FFF",
          mixBlendMode: "exclusion",
        }}
        innerStyle={{
          whiteSpace: "nowrap",
        }}
        clickables={[
          ".mouseLink",
        ]}
        trailingSpeed={10}
        mouseText="View Project"
        textClass="font-ibm text-sm"
      />
      <div className="relative">
        <div className="h-screen w-full flex items-center justify-end">
          <h1
            ref={textRef}
            className="uppercase font-humane text-white text-[14rem] mr-[10%] text-right leading-[12rem] mix-blend-exclusion opacity-0 xl:text-[12rem] xl:leading-[10rem]"
          >
            MEHDI M’CIRDI
            <br />
            DEVELOPPEUR FULL-STACK
          </h1>
        </div>
        <div>
          <Projects projects={works} />
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  const works = Object.values(projects);

  return {
    props: {
      works,
    },
  };
}
