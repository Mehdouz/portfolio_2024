import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRef, useState } from "react";

export default function ProjectNumber({ index, ...props }) {
  const [numberProject, setNumberProject] = useState(`.0${index}`);
  const rootRef = useRef();

  function animateNumber() {
    const numbers = [
      ".",
      "!",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "?",
    ];
    let iterations = 0;
    let number = numberProject;

    const interval = setInterval(() => {
      number = number
        .split("")
        .map((letter, index) => {
          if (index < iterations) {
            return numberProject[index];
          }
          return numbers[Math.floor(Math.random() * 11)];
        })
        .join("");
      setNumberProject(number);
      if (iterations >= 9) {
        clearInterval(interval);
        iterations = 0;
      }

      iterations += 1 / 10;
    }, 40);
  }

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      gsap.fromTo(
        rootRef.current,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "150px bottom",
            toggleActions: "play pause resume reverse",
            onEnter: () => animateNumber(),
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <p ref={rootRef} {...props}>
      {numberProject}
    </p>
  );
}
