import { Fugaz_One, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Canvas } from "@react-three/fiber";
import { TransitionContext } from "@/components/TransitionContext";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import gsap from "gsap";
import { useContext, useEffect, useRef, useState } from "react";
import { OrthographicCamera } from "@react-three/drei";
import WorkImageCanvas from "@/components/WorkImageCanvas.jsx";
import ProjectSingleImageCanvas from "@/components/ProjectSingleImageCanvas.jsx";
import { projects } from "../../data/data";
import { WorkContext } from "@/components/WorkContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import Image from "next/image";
import AnimatedCursor from "@/hooks/useCursor";

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

export async function getStaticPaths() {
  const paths = Object.values(projects).map((project) => ({
    params: { name: project.title },
  }));

  return { paths, fallback: false };
}

export const getStaticProps = async ({ params }) => {
  const activeWork = params.name;
  let nextWork;

  const projectsArray = Object.keys(projects);
  const currentProjectIndex = projectsArray.indexOf(activeWork);
  const projectsLength = projectsArray.length;

  if (currentProjectIndex + 1 >= projectsLength) {
    nextWork = projectsArray[0];
  } else {
    nextWork = projectsArray[currentProjectIndex + 1];
  }

  return { props: { activeWork, nextWork } };
};

export default function Work({ activeWork, nextWork }) {
  const { timeline } = useContext(TransitionContext);
  const {
    actualCover,
    isFirstLoad,
    setIsFirstLoad,
    setActualWork,
    setNextWork,
    setIsLoading,
  } = useContext(WorkContext);
  const coverRef = useRef();
  const rootRef = useRef();
  const titleRef = useRef();
  const worksRef = useRef([]);
  const nextWorkRef = useRef();
  const backHomeRef = useRef();
  const contactRef = useRef();

  const nextWorkImageRef = useRef();

  worksRef.current = [];

  const router = useRouter();

  const title = projects?.[`${activeWork}`]?.title;

  useIsomorphicLayoutEffect(() => {
    isFirstLoad && window.scrollTo(0, 0);
  });

  useEffect(() => {
    setActualWork(activeWork);
    setNextWork(nextWork);
  }, [activeWork, nextWork]);

  function redirectWithoutTimeline() {
    setIsLoading(true);
    router.push(nextWork);
  }

  function loadNextCover() {
    setActualWork(nextWork);
    setIsFirstLoad(false);
    ScrollTrigger.refresh();
  }

  function reloadActualCover() {
    setActualWork(activeWork);
    ScrollTrigger.refresh();
  }

  // Animations
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // Next project animation
      const nextProjectAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: nextWorkRef.current,
          start: "top+=40% top",
          end: "bottom top",
          toggleActions: "play pause resume reverse",
          scrub: true,
          onLeave: redirectWithoutTimeline,
          onEnter: loadNextCover,
          onEnterBack: loadNextCover,
          onLeaveBack: reloadActualCover,
        },
      });

      nextProjectAnimation.fromTo(
        nextWorkImageRef.current,
        { scale: 0.9 },
        {
          scale: 1,
        }
      );

      nextProjectAnimation.to(".bg-testou", { opacity: 0.3 }, "=");

      // First scroll animation
      const firstScrolAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          toggleActions: "play pause resume reverse",
          scrub: 0.2,
          pin: true,
        },
      });

      gsap.set(titleRef.current, { xPercent: -50, yPercent: -50 });

      // Entry animation
      firstScrolAnimation.to(titleRef.current, {
        scale: 0.62,
      });

      firstScrolAnimation.to(
        coverRef.current,
        {
          scale: 0.9,
        },
        "="
      );

      // Entry Animation
      gsap.set(titleRef.current, {
        opacity: 0,
      });
      gsap.to(titleRef.current, {
        opacity: 1,
        duration: 0.7,
        ease: "expo.out",
      });

      // Animation teh menu sides
      const sideMenu = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "bottom+=20px bottom",
          end: "+=300px",
          toggleActions: "play pause resume reverse",
          autoRound: false,
          scrub: true,
        },
      });

      gsap.set(backHomeRef.current, {
        letterSpacing: 5,
        opacity: 0,
        display: "none",
      });
      gsap.set(contactRef.current, {
        letterSpacing: 5,
        opacity: 0,
        display: "none",
      });

      sideMenu.to(
        backHomeRef.current,
        {
          display: "block",
          opacity: 1,
        },
        "="
      );

      sideMenu.to(
        contactRef.current,

        {
          display: "block",
          opacity: 1,
        },
        "="
      );

      sideMenu.to(
        backHomeRef.current,
        {
          letterSpacing: 10,
          autoRound: false,
        },
        "="
      );

      sideMenu.to(
        contactRef.current,
        {
          letterSpacing: 10,
          autoRound: false,
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
    },
    {
      dependencies: [activeWork, title],
      revertOnUpdate: true,
    }
  );

  // Entry animation of project's images pres
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
          "a",
          "button",
          ".link",
        ]}
        trailingSpeed={10}
        mouseText="Visit Website"
        textClass="font-ibm"
      />
      {/* <div className="bg-testou w-full h-full fixed top-0 left-0 bg-pink-700 block opacity-0 z-20"></div> */}
      <div className="w-[100vh] flex justify-center rotate-90 origin-top-left p-6 font-roobert uppercase fixed top-0 left-[80px] z-40">
        {router?.pathname !== "/" && (
          <Link
            ref={backHomeRef}
            href="/"
            scroll={false}
            className="relative text-[12px] tracking-widest text-black group w-max"
          >
            Back to projects
            <span className="absolute top-[9px] left-[48%] w-0 transition-all h-[1px] bg-black group-hover:w-[53%]"></span>
            <span className="absolute top-[9px] right-[52%] w-0 transition-all h-[1px] bg-black group-hover:w-[53%]"></span>
          </Link>
        )}
      </div>
      <div className="w-[100vh] flex justify-center -rotate-90 origin-top-right p-6 font-roobert uppercase fixed top-0 right-[80px] z-40">
        {router?.pathname !== "/" && (
          <a
            ref={contactRef}
            href="mailto:mehdouz@gmail.com"
            className="relative text-[12px] tracking-widest text-black group w-max"
          >
            Contact
            <span className="absolute top-[9px] left-[46%] w-0 transition-all h-[1px] bg-black group-hover:w-[53%]"></span>
            <span className="absolute top-[9px] right-[54%] w-0 transition-all h-[1px] bg-black group-hover:w-[53%]"></span>
          </a>
        )}
      </div>
      <div ref={rootRef} className="relative block">
        <h1
          ref={titleRef}
          className="absolute top-2/4 left-2/4 font-humane mix-blend-exclusion text-[22rem] leading-none uppercase truncate z-30"
        >
          {projects?.[`${activeWork}`]?.title}
        </h1>
        <div
          ref={coverRef}
          className="cover relative h-screen w-screen max-w-full text-8xl z-10 overflow-hidden"
        >
          <div className="w-screen h-screen max-w-full relative z-50 block">
            <div className="w-full h-full overflow-hidden">
              <Image
                className="w-full h-full object-cover"
                width={2100}
                height={1400}
                src={projects[activeWork]?.cover}
                alt={projects[activeWork]?.title}
                priority
              />
            </div>
          </div>
          <Canvas dpr={1} resize={{ scroll: false }}>
            <WorkImageCanvas cover={actualCover} imageAspect={1400 / 2100} />
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
      <div className="relative flex justify-center gap-[15%] px-24 font-ibm uppercase text-grey-50 text-[11px] tracking-widest">
        <div>
          <h2 className="clientItem pb-1 font-semibold antialiased">
            Client :
          </h2>
          <p className="clientItem">{projects?.[`${activeWork}`]?.title}</p>
        </div>
        <div>
          <h2 className="roleItem pb-1 font-semibold antialiased">Rôle :</h2>
          <ul>
            {projects?.[`${activeWork}`]?.role.map((role, index) => (
              <li key={index} className="roleItem">
                {role}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="technoItem pb-1 font-semibold antialiased">
            Technologies :
          </h2>
          <ul>
            {projects?.[`${activeWork}`]?.technologies.map(
              (technologie, index) => (
                <li key={index} className="technoItem">
                  {technologie}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
      <div className="relative container mx-auto px-52 z-30">
        {projects?.[`${activeWork}`]?.images?.desktop.map((image, index) => {
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
      <div className="relative container mx-auto flex justify-between px-52 z-30">
        {projects?.[`${activeWork}`]?.images?.mobile.map((image, index) => {
          return (
            <div
              key={index}
              className="grow"
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
      <div
        ref={nextWorkRef}
        className="w-screen h-screen max-w-full relative z-50 block"
      >
        <div className="w-full h-full overflow-hidden">
          <img
            ref={nextWorkImageRef}
            className="w-full h-full object-cover"
            width={2100}
            height={1400}
            src={projects[nextWork]?.cover}
            alt={projects[nextWork]?.title}
          />
        </div>
      </div>
    </div>
  );
}
