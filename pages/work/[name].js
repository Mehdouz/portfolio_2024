import { Fugaz_One, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Canvas } from "@react-three/fiber";
import { TransitionContext } from "@/components/TransitionContext";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import gsap from "gsap";
import { useContext, useRef } from "react";
import { OrthographicCamera } from "@react-three/drei";
import WorkImageCanvas from "@/components/WorkImageCanvas.jsx";
import ProjectSingleImageCanvas from "@/components/ProjectSingleImageCanvas.jsx";
import { projects } from "../../data/data";
import { WorkContext } from "@/components/WorkContext";
import VisitWebsite from "@/components/VisitWebsite";

const humane = localFont({
  src: "../../public/fonts/humaneBold.woff2",
  variable: "--font-humane",
});

const roobert = localFont({
  src: "../../public/fonts/roobertRegular.woff2",
  variable: "--font-roobert",
});

const fugaz = Fugaz_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-fugaz",
});

const ibm_flex_mono = IBM_Plex_Mono({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-ibm",
  display: "swap",
});

export default function Work() {
  const { timeline } = useContext(TransitionContext);
  const { activeWork } = useContext(WorkContext);
  const coverRef = useRef();
  const rootRef = useRef();
  const titleRef = useRef();
  const worksRef = useRef([]);
  worksRef.current = [];

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Entry animation
    gsap.fromTo(
      ".coco",
      { y: "+=120%", opacity: 0.8 },
      { y: 0, opacity: 1, duration: 1, delay: 0.1, ease: "expo.out" }
    );

    // First scroll animation
    const firstScrolAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: rootRef.current,
        start: "top top",
        end: "bottom-=20% top",
        toggleActions: "play pause resume reverse",
        scrub: true,
        pin: true,
      },
    });

    firstScrolAnimation.fromTo(
      titleRef.current,
      { scale: 1 },
      {
        scale: 0.62,
      }
    );

    firstScrolAnimation.fromTo(
      coverRef.current,
      { scale: 1 },
      {
        scale: 0.9,
      },
      "="
    );

    // Informations projet animations
    const infosAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: worksRef.current,
        start: "top+=100px bottom",
        toggleActions: "play pause resume reverse",
      },
    });

    infosAnimation.from(".clientItem", {
      opacity: 0,
      y: -15,
      stagger: 0.05,
      ease: "power3.out",
    });

    infosAnimation.from(
      ".roleItem",
      {
        opacity: 0,
        y: -15,
        stagger: 0.05,
        ease: "power3.out",
      },
      0.3
    );

    infosAnimation.from(
      ".technoItem",
      {
        opacity: 0,
        y: -15,
        stagger: 0.05,
        ease: "power3.out",
      },
      0
    );

    // Image teh le jetpro animation

    timeline.add(
      gsap.fromTo(
        ".coco",
        { x: 0 },
        {
          x: "+=100%",
          duration: 0.7,
          ease: "expo.in",
        }
      ),
      0
    );
  });

  useGSAP(() => {
    worksRef.current.map((item, index) => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          end: "top+=30% bottom",
          toggleActions: "play pause resume reverse",
          scrub: true,
        },
      });
      tl.set(item.querySelectorAll("div"), { y: 30, scale: 0.9 });
      tl.to(item.querySelectorAll("div"), {
        y: 0,
        scale: 1,
      });
    });
  }, [worksRef]);

  const addToRefs = (item) => {
    if (item) {
      worksRef.current.push(item);
    }
  };

  return (
    <div
      className={`${fugaz.variable} ${ibm_flex_mono.variable} ${humane.variable} ${roobert.variable} relative`}
    >
      <div ref={rootRef} className="relative">
        <h1
          ref={titleRef}
          className="absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] font-humane mix-blend-exclusion text-[24rem] leading-none uppercase truncate z-30"
        >
          {projects[activeWork].title}
        </h1>
        <div
          ref={coverRef}
          className="coco relative h-screen w-screen text-8xl z-10 overflow-hidden"
        >
          <Canvas dpr={1} resize={{ scroll: false }}>
            <WorkImageCanvas
              cover={projects[activeWork].cover}
              imageAspect={1400 / 2100}
            />
            <OrthographicCamera
              manual
              left={-1}
              right={1}
              top={1}
              bottom={-1}
              near={0}
              far={1}
              makeDefault
            />
          </Canvas>
        </div>
      </div>
      <div className="relative flex justify-between px-24 font-ibm uppercase text-grey-50 text-[11px] tracking-widest">
        <div>
          <h2 className="clientItem pb-1 font-semibold antialiased">
            Client :
          </h2>
          <p className="clientItem">{projects[activeWork].title}</p>
        </div>
        <div>
          <h2 className="roleItem pb-1 font-semibold antialiased">Rôle :</h2>
          <ul>
            {projects[activeWork].role.map((role, index) => (
              <li key={index} className="roleItem">
                {role}
              </li>
            ))}
          </ul>
        </div>
        <div className="text-right">
          <h2 className="technoItem pb-1 font-semibold antialiased">
            Technologies :
          </h2>
          <ul>
            {projects[activeWork].technologies.map((technologie, index) => (
              <li key={index} className="technoItem">
                {technologie}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="relative container mx-auto px-52 z-30">
        {projects[activeWork]?.images.map((image, index) => {
          return (
            <div
              key={index}
              ref={addToRefs}
              className="w-full mb-12"
              style={{ height: `${image.containerHeight}px` }}
            >
              <Canvas dpr={1} resize={{ scroll: false }}>
                <ProjectSingleImageCanvas
                  cover={image.url}
                  imageAspect={image.height / image.width}
                />
                <OrthographicCamera
                  manual
                  left={-1}
                  right={1}
                  top={1}
                  bottom={-1}
                  near={0}
                  far={1}
                  makeDefault
                />
              </Canvas>
            </div>
          );
        })}
      </div>
      <VisitWebsite />
    </div>
  );
}
