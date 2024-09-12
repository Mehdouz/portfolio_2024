import { useState, useContext, useRef } from "react";
import { WorkContext } from "./WorkContext";
import { projects } from "@/data/data";
import { TextureLoader } from "three";
import { useGSAP } from "@gsap/react";

export default function WorkLayout({ children }) {
  const [displayChildren, setDisplayChildren] = useState(children);
  const {
    actualWork,
    nextWork,
    actualCover,
    setActualCover,
    nextCover,
    setNextCover,
    isLoading,
    setIsLoading,
  } = useContext(WorkContext);
  const el = useRef();


  useGSAP(() => {
    if (actualWork) {
      const actualCoverTexture = () =>
        new TextureLoader().load(projects?.[`${actualWork}`]?.cover);

      actualCover && isLoading
        ? setActualCover(nextCover)
        : setActualCover(actualCoverTexture);
    }

    setNextCover(() =>
      new TextureLoader().load(projects?.[`${nextWork}`]?.cover)
    );

    setIsLoading(false);

    setDisplayChildren(children);
  }, [children, actualWork]);

  return <div ref={el}>{displayChildren}</div>;
}
