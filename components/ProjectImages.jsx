import React, { useRef } from "react";
import ProjectImage from "./ProjectImage";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const ProjectImages = ({ images, type, projectName }) => {
  const worksRef = useRef([]);

  // GSAP animation logic
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    worksRef.current.forEach((item) => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          end: "top+=30% bottom",
          toggleActions: "play pause resume reverse",
          scrub: true,
          markers: true
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
    if (item && !worksRef.current.includes(item)) {
      worksRef.current.push(item);
    }
  };


  return (
    <>
      {images.map((image, index) => {
        const heightClass = `h-${projectName}-${type}-${index + 1}`;
        const containerClass = type === "mobile" ? "w-full lg:w-[49%]" : "w-full mb-12";

        return (
          <div
            ref={type === "desktop" ? addToRefs : null } // Add ref only for desktop
            key={projectName + index}
            className={`${containerClass} ${heightClass}`}
          >
            <ProjectImage
              image={image}
              index={index}
            />
          </div>
        );
      })}
    </>
  );
};

export default ProjectImages;
