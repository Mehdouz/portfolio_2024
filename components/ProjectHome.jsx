import { Canvas } from "@react-three/fiber";
import ProjectImageCanvas from "./ProjectImageCanvas";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useContext, useRef, useState, useEffect } from "react";
import ProjectNumber from "./ProjectNumber";
import { OrthographicCamera } from "@react-three/drei";
import SplitType from "split-type";
import { TransitionContext } from "./TransitionContext";
import Link from "next/link";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import { WorkContext } from "./WorkContext";

export default function ProjectHome({ project, index }) {
  const [isInView, setIsInView] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const rootRef = useRef(null);
  const imageRef = useRef(null);
  const projectListRef = useRef();
  const categoryRef = useRef(null);
  const titleRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const loadingRef = useRef(null);

  const { setActualWork, setIsLoading, setCameFromHome, isFirstLoad } =
    useContext(WorkContext);

  const { timeline } = useContext(TransitionContext);

  const randomDuration = isFirstLoad
    ? Math.random() * (1.8 - 1.2) + 1.2
    : Math.random() * (0.8 - 0.5) + 0.5;

  const handleProjectClick = () => {
    setCameFromHome(true);
    setIsLoading(true);
    setIsClicked(true);
    setActualWork(project?.title);
  };

  useIsomorphicLayoutEffect(() => {
    const titleText = new SplitType(titleRef.current, { types: "chars" });
    const titleChars = titleText.chars;

    gsap.registerPlugin(ScrollTrigger);

    const textRevealAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: rootRef.current,
        start: "80% bottom",
        toggleActions: "play pause resume reverse",
      },
    });

    const revealAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: rootRef.current,
        start: "200px bottom",
        toggleActions: "play pause resume reverse",
        onEnter: () => setIsInView(true),
        onLeaveBack: () => setIsInView(false),
      },
    });

    let ctx = gsap.context(() => {
      revealAnimation.from(canvasRef.current, {
        y: 400,
        duration: 0.7,
        ease: "power3.out",
      });

      revealAnimation.from(
        ".technoItem",
        {
          opacity: 0,
          y: 30,
          duration: 0.4,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.5"
      );

      textRevealAnimation.fromTo(
        titleChars,
        { y: 300 },
        {
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
        }
      );

      gsap.fromTo(
        titleRef.current,
        { y: 0 },
        {
          y: -300,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "100px bottom",
            toggleActions: "play pause resume reverse",
            scrub: true,
          },
        }
      );
    }, rootRef);

    timeline.add(
      gsap.fromTo(
        overlayRef.current,
        {
          y: "100%",
        },
        {
          y: 0,
          duration: 0.5,
          display: "block",
          ease: "power3.out",
        }
      ),
      0.7
    );

    timeline.add(
      gsap.fromTo(
        loadingRef.current,
        {
          width: 0,
        },
        {
          width: "33%",
          duration: randomDuration,
          ease: "expo.inOut",
        }
      ),
      1.2
    );

    timeline.add(
      gsap.to(canvasRef.current, {
        y: "-100%",
        duration: 0.3,
        ease: "power3.in",
      }),
      0.2
    );

    timeline.add(
      gsap.to(titleChars, {
        y: "-120%",
        stagger: 0.05,
        ease: "power3.in",
      }),
      0.1
    );

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="container mx-auto px-32 mb-44 aspect-video">
      <div
        ref={overlayRef}
        className="overlay none fixed top-0 left-0 w-full h-full pointer-events-none bg-zinc-950 z-[100]"
      >
        <div
          ref={loadingRef}
          className="loading absolute top-1/2 left-1/2 w-[350px] h-[2px] bg-white transform -translate-x-1/2 -translate-y-1/2"
        ></div>
      </div>
      <Link
        href={`work/${project?.title}`}
        className="mouseLink"
        scroll={false}
        onClick={handleProjectClick}
      >
        <div className="relative text-white pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {!isClicked && (
              <ul
                ref={projectListRef}
                className="absolute top-8 left-8 font-roobert text-xs object-fit z-20"
              >
                {project.technologies?.map((techno, index) => (
                  <li key={index} className="technoItem mb-0.5 font-roobert">
                    {techno}
                  </li>
                ))}
              </ul>
            )}
            {!isClicked && (
              <ProjectNumber
                className="absolute top-8 right-8 font-roobert text-5xl z-20"
                index={index + 1}
              />
            )}
            {!isClicked && (
              <p
                ref={categoryRef}
                className="absolute bottom-8 right-8 font-roobert text-5xl z-20"
              >
                {project?.sector}
              </p>
            )}
            <div
              ref={titleRef}
              className="absolute truncate h-[303px] -left-36 xl:-bottom-[10.8rem] 2xl:-bottom-[2rem] mix-blend-exclusion font-humane xl:text-[19rem] 2xl:text-[24rem] leading-none uppercase z-20"
            >
              {project.title}
            </div>
          </div>
          <div
            ref={imageRef}
            className="cover relative text-8xl z-10 aspect-video rounded-lg overflow-hidden w-full h-full"
          >
            <Canvas
              ref={canvasRef}
              className="!absolute top-0 left-0 w-full h-full"
              dpr={1}
              resize={{ scroll: false }}
            >
              <ProjectImageCanvas
                cover={project.cover}
                isInView={isInView}
                isClicked={isClicked}
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
      </Link>
    </div>
  );
}
