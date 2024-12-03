import { Fugaz_One, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Canvas } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import gsap from "gsap";
import { useContext, useEffect, useRef } from "react";
import { OrthographicCamera } from "@react-three/drei";
import WorkImageCanvas from "@/components/WorkImageCanvas.jsx";
import ProjectSingleImageCanvas from "@/components/ProjectSingleImageCanvas";
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
    params: { name: project.title.replace(/\s/g, "") },
  }));

  return { paths, fallback: false };
}

export const getStaticProps = async ({ params }) => {
  const activeWork = params.name.replace(/\s/g, "");
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
  const {
    actualCover,
    isFirstLoad,
    setIsFirstLoad,
    setActualWork,
    setNextWork,
    setIsLoading,
    cameFromHome,
    setCameFromHome,
  } = useContext(WorkContext);

  const coverRef = useRef();
  const rootRef = useRef();
  const titleRef = useRef();
  const nextWorkRef = useRef();
  const backHomeRef = useRef();
  const contactRef = useRef();
  const overlayRef = useRef();
  const nextWorkImageRef = useRef();
  const worksRef = useRef([]);

  const router = useRouter();

  const title = projects?.[`${activeWork}`]?.title;

  useIsomorphicLayoutEffect(() => {
    isFirstLoad && window.scrollTo(0, 0);
    setIsFirstLoad(false);
  });

  useEffect(() => {
    setActualWork(activeWork);
    setNextWork(nextWork);
  }, [activeWork, nextWork, setActualWork, setNextWork]);

  function redirectWithoutTimeline() {
    setIsLoading(true);
    setCameFromHome(false);
    router.push(nextWork);
  }

  function loadNextCover() {
    setActualWork(nextWork);
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

      cameFromHome &&
        gsap.fromTo(
          overlayRef.current,
          { y: 0 },
          {
            display: "block",
            y: "-100%",
            delay: 0.2,
            duration: 0.3,
            ease: "expo.inOut",
          }
        );

      // Entry Animation
      gsap.set(titleRef.current, {
        opacity: 0,
      });

      gsap.to(titleRef.current, {
        opacity: 1,
        delay: cameFromHome ? 0.5 : 0,
        duration: 0.7,
        ease: "expo.out",
      });

      // Next project animation
      const nextProjectAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: nextWorkRef.current,
          start: "top-=40% top",
          end: "top top",
          toggleActions: "play pause resume reverse",
          scrub: true,
          onLeave: redirectWithoutTimeline,
          onEnter: loadNextCover,
          onEnterBack: loadNextCover,
          onLeaveBack: reloadActualCover,
        },
      });

      gsap.set(nextWorkImageRef.current, { scale: 0.9 });

      nextProjectAnimation.to(nextWorkImageRef.current, {
        scale: 1,
      });

      // First scroll animation
      const firstScrolAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          toggleActions: "play pause resume reverse",
          scrub: 0.2,
          invalidateOnRefresh: true,
        },
      });

      gsap.set(titleRef.current, { xPercent: -50, yPercent: -50 });

      // Entry animation
      firstScrolAnimation.to(titleRef.current, {
        scale: 0.62,
      });

      // Animation teh menu sides
      const sideMenu = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "bottom top+=25%",
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

      const sideMenuClearing = gsap.timeline({
        scrollTrigger: {
          trigger: nextWorkRef.current,
          start: "top-=70% top",
          end: "+=200px",
          toggleActions: "play pause resume reverse",
          autoRound: false,
          scrub: true,
        },
      });

      sideMenuClearing.to(
        backHomeRef.current,
        {
          opacity: 0,
        },
        "="
      );

      sideMenuClearing.to(
        contactRef.current,
        {
          opacity: 0,
        },
        "="
      );

      sideMenuClearing.to(
        backHomeRef.current,
        {
          letterSpacing: 5,
          autoRound: false,
        },
        "="
      );

      sideMenuClearing.to(
        contactRef.current,
        {
          letterSpacing: 5,
          autoRound: false,
        },
        "="
      );

      // Informations projet animations
      const infosAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "bottom top+=70%",
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

      worksRef.current.map((item) => {
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
    },
    {
      dependencies: [activeWork, title, worksRef],
      revertOnUpdate: true,
    }
  );

  const addToRefs = (item) => {
    if (item && !worksRef.current.includes(item)) {
      worksRef.current.push(item);
    }
  };

  return (
    <div
      className={`${fugaz.variable} ${ibm_flex_mono.variable} ${humane.variable} ${roobert.variable} relative`}
    >
      {cameFromHome && (
        <div
          ref={overlayRef}
          className="none fixed top-0 left-0 w-full h-full pointer-events-none bg-zinc-950 z-[100]"
        />
      )}
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
        mouseText={`Visit Website`}
        textClass="font-ibm text-[13px]"
        showSystemCursor={false}
      />
      <div className="w-[100vh] flex justify-center rotate-90 origin-top-left p-4 md:p-6 font-roobert uppercase fixed top-0 left-[50px] sm:left-[70px] md:left-[80px] z-40">
        {router?.pathname !== "/" && (
          <Link
            ref={backHomeRef}
            href="/"
            scroll={false}
            className="relative text-[12px] tracking-widest text-black group w-max cursor-none"
          >
            Back to projects
            <span className="absolute top-[9px] left-[48%] w-0 transition-all h-[1px] bg-black group-hover:w-[53%]"></span>
            <span className="absolute top-[9px] right-[52%] w-0 transition-all h-[1px] bg-black group-hover:w-[53%]"></span>
          </Link>
        )}
      </div>
      <div className="w-[100vh] flex justify-center -rotate-90 origin-top-right p-6 font-roobert uppercase fixed top-0 right-[60px] md:right-[80px] z-40">
        {router?.pathname !== "/" && (
          <a
            ref={contactRef}
            href="mailto:mehdouz@gmail.com"
            className="relative text-[12px] tracking-widest text-black group w-max cursor-none"
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
          className="absolute top-2/4 left-2/4 font-humane text-white md:mix-blend-exclusion text-[9rem] sm:text-[12rem] md:text-[14rem] lg:text-[18rem] leading-none uppercase truncate z-30"
        >
          {projects?.[`${activeWork}`]?.client}
        </h1>
        <div

          className="absolute w-full h-full left-0 top-0 bg-slate-900 opacity-30 md:hidden z-20"
        ></div>
        <div
          ref={coverRef}
          className="cover relative h-screen w-screen max-w-full text-8xl z-10 overflow-hidden aspect-[1400/2100]"
        >
          <Canvas
            dpr={1}
            resize={{ scroll: false }}
            style={{ width: "100%", height: "100%" }}
          >
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
      <div className="relative flex justify-center gap-[10%] px-12 md:gap-[20%] md:px-24 mt-12 mb-12 lg:mb-0 font-ibm uppercase text-grey-50 text-[10px] md:text-[11px] tracking-widest">
        <div>
          <h2 className="clientItem pb-1 font-semibold antialiased">
            Client :
          </h2>
          <p className="clientItem">{projects?.[`${activeWork}`]?.client}</p>
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
      {projects?.[`${activeWork}`]?.link && <Link className="flex text-[14px] tracking-wider uppercase items-center justify-center p-2 px-6 max-w-[300px] text-[#0f151f] mx-auto mb-6 mt-3 rounded-md border border-[#0f151f] md:hidden" href={projects?.[`${activeWork}`]?.link} target="_blank">Visit Website</Link>}
      <div className="relative max-w-[420px] min-w-[420px] mx-auto md:container md:mx-auto px-12 md:px-24 lg:px-40 xl:px-52 xl:mt-12 z-30">
        {projects?.[`${activeWork}`]?.images?.desktop.map((image, index) => {
          const heightClass = `h-${activeWork}-desktop-${index + 1}`;
          return (
            <div
              ref={addToRefs} // Add ref only for desktop
              key={activeWork + index}
              className={`w-full mb-12 ${heightClass}`}
            >
              {projects?.[`${activeWork}`]?.link ? (
                <Link
                  href={projects[`${activeWork}`].link}
                  className="mouseLink"
                  target="_blank"
                >
                  <Canvas dpr={1} resize={{ scroll: false }}>
                    <ProjectSingleImageCanvas
                      cover={image.url}
                      imageAspect={image.width / image.height}
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
                </Link>
              ) : (
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
              )}
            </div>
          );
        })}
      </div>
      <div className="relative max-w-[420px] min-w-[420px] mx-auto md:container flex w-full gap-2 flex-col lg:flex-row justify-between px-12 md:px-24 lg:px-40 xl:px-56 z-30">
        {projects?.[`${activeWork}`]?.images?.mobile.map((image, index) => {
          const heightClass = `h-${activeWork}-mobile-${index + 1}`;
          return (
            <div
              ref={addToRefs} // Add ref only for desktop
              key={activeWork + index}
              className={`w-full lg:w-[49%] ${heightClass}`}
            >
              {projects?.[`${activeWork}`]?.link ? (
                <Link
                  href={projects?.[`${activeWork}`]?.link}
                  className="mouseLink"
                  target="_blank"
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
                </Link>
              ) : (
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
              )}
            </div>
          );
        })}
      </div>
      <Link className="flex text-[14px] tracking-wider items-center justify-center p-2 max-w-[300px] text-[#0f151f] mx-auto mb-10 mt-3 rounded-md border border-[#0f151f] uppercase font-roobert md:hidden" href={nextWork}>Next project</Link>
      <div
        ref={nextWorkRef}
        className="hidden w-screen h-screen max-w-full relative mt-12 z-50 sm:block"
      >
        <div className="w-full h-full overflow-hidden">
          <Image
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
