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
          marker: true,
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
      className={`px-10 md:px-20 ${fugaz.variable} ${ibm_flex_mono.variable} ${humane.variable} ${roobert.variable} ${avenir.variable}`}
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
        clickables={[".mouseLink"]}
        trailingSpeed={10}
        mouseText="View Project"
        textClass="font-ibm text-sm"
      />
      <div className="relative">
        <div className="h-screen w-full flex items-center justify-center md:justify-end">
          <h1
            ref={textRef}
            className="uppercase font-humane text-[#0f151f] px-10 text-center opacity-0 text-[4rem] leading-[3.5rem] sm:text-[5rem] sm:leading-[4rem] md:text-right md:mr-[10%] md:text-[6rem] md:leading-[5rem] md:px-0 lg:text-white lg:text-[8rem] lg:leading-[7rem] lg:mix-blend-exclusion xl:leading-[8.5rem] xl:text-[10rem] 2xl:leading-[10.5rem] 2xl:text-[12rem]"
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
