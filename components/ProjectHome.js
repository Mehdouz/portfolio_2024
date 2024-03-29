import { Canvas } from "@react-three/fiber";
import { Project } from "../data/data";
import ProjectImageCanvas from "./ProjectImageCanvas";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Flip from "gsap/dist/Flip";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import ProjectNumber from "./ProjectNumber";
import { OrthographicCamera } from "@react-three/drei";
import ProjectList from "./ProjectList";
import SplitType from "split-type";

export default function ProjectHome({ project, index }) {
  const [isInView, setIsInView] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  let rootRef = useRef();
  let imageRef = useRef();
  let titleRef = useRef();

  function handleClick(e) {
    e.preventDefault();

    setIsClicked(!isClicked);

    if (isClicked) {
      gsap.to(imageRef.current, {
        x: "2000px",
        duration: 1,
        ease: "power3.in",
      });
    }
  }

  useLayoutEffect(() => {
    const titleText = new SplitType(titleRef.current, { types: "chars" });
    const titleChars = titleText.chars;

    gsap.registerPlugin(ScrollTrigger);

    const revealAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: rootRef.current,
        start: "80% bottom",
        toggleActions: "play pause resume reverse",
      },
    });

    let ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { y: 400 },
        {
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "200px bottom",
            toggleActions: "play pause resume reverse",
            onEnter: () => setIsInView(true),
            onLeaveBack: () => setIsInView(false),
          },
        }
      );
      revealAnimation.fromTo(
        titleChars,
        { y: 400 },
        {
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.05,
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
            start: "200px bottom",
            toggleActions: "play pause resume reverse",
            scrub: true,
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="container mx-auto relative px-32 mb-44 cursor-pointer aspect-video"
    >
      <div className="relative text-white pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <ProjectList
            className="absolute top-8 left-8 font-roobert text-sm object-fit z-20"
            technologies={project.technologies}
          />
          <ProjectNumber
            className="absolute top-8 right-8 font-roobert text-5xl z-20"
            index={index}
          />
          <p className="absolute bottom-8 right-8 font-roobert text-5xl z-20">
            / Insurance
          </p>
          <div
            ref={titleRef}
            className="absolute truncate h-[303px] origin-bottom -left-36 -bottom-[2rem] mix-blend-exclusion font-humane text-[24rem] leading-none  uppercase z-20"
          >
            {project.title}
          </div>
        </div>
        <div className="aspect-video">
          <Canvas
            ref={imageRef}
            className="aspect-video"
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
    </div>
  );
}
