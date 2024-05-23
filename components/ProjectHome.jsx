import { Canvas } from "@react-three/fiber";
import ProjectImageCanvas from "./ProjectImageCanvas";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useContext, useRef, useState } from "react";
import ProjectNumber from "./ProjectNumber";
import { OrthographicCamera } from "@react-three/drei";
import SplitType from "split-type";
import { TransitionContext } from "./TransitionContext";
import Link from "next/link";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";

export default function ProjectHome({ project, index }) {
  const [isInView, setIsInView] = useState(false);
  const rootRef = useRef(null);
  const imageRef = useRef(null);
  const projectListRef = useRef();
  const categoryRef = useRef(null);
  const titleRef = useRef(null);

  const { timeline } = useContext(TransitionContext);

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

    const scrollScrub = gsap.timeline({
      scrollTrigger: {
        trigger: rootRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    let ctx = gsap.context(() => {
      revealAnimation.from(imageRef.current, {
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
        imageRef.current,
        { x: 0 },
        {
          x: "+=100%",
          duration: 0.7,
          ease: "expo.in",
        }
      ),
      0
    );
    timeline.add(
      gsap.to(titleChars, {
        y: 300,
        duration: 0.7,
        ease: "expo.in",
      }),
      0
    );

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="container mx-auto px-32 mb-44 cursor-pointer aspect-video "
    >
      <Link href={`work/${project?.title}`} scroll={false}>
        <div className="relative text-white pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
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
            <ProjectNumber
              className="absolute top-8 right-8 font-roobert text-5xl z-20"
              index={index + 1}
            />
            <p
              ref={categoryRef}
              className="absolute bottom-8 right-8 font-roobert text-5xl z-20"
            >
              / Insurance
            </p>
            <div
              ref={titleRef}
              className="absolute truncate h-[303px] -left-36 -bottom-[2rem] mix-blend-exclusion font-humane text-[24rem] leading-none uppercase z-20"
            >
              {project.title}
            </div>
          </div>
          <div className="aspect-video">
            <Canvas
              ref={imageRef}
              className="aspect-video rounded-lg"
              dpr={1}
              resize={{ scroll: false }}
            >
              <ProjectImageCanvas cover={project.cover} isInView={isInView} />
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
