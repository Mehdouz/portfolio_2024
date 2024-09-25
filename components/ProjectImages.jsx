import React, { useRef } from "react";
import ProjectImage from "./ProjectImage";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const ProjectImages = ({ images, type, projectName }) => {
  const worksRef = useRef([]);

  const addToRefs = (item) => {
    if (item && !worksRef.current.includes(item)) {
      worksRef.current.push(item);
    }
  };

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
        },
      });
      tl.set(item.querySelectorAll("div"), { y: 30, scale: 0.9 });
      tl.to(item.querySelectorAll("div"), {
        y: 0,
        scale: 1,
      });
    });
  }, [worksRef]);

  return (
    <>
      {images.map((image, index) => (
        <ProjectImage
          ref={type === "desktop" ? addToRefs : null} key={index + projectName}
          image={image}
          type={type}
          projectName={projectName}
          index={index}

          // Attach the ref to each image
        />
      ))}
    </>
  );
};

export default ProjectImages;
