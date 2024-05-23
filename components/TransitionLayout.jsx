import { TransitionContext } from "@/components/TransitionContext";
import { useState, useContext, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useLenis } from "@studio-freight/react-lenis";

export default function TransitionLayout({ children }) {
  const [displayChildren, setDisplayChildren] = useState(children);
  const { timeline } = useContext(TransitionContext);
  const el = useRef();
  const lenis = useLenis();

  useGSAP(() => {
    if (children.props.activeWork !== displayChildren.props.activeWork) {
      if (timeline.duration() === 0) {
        // there are no outro animations, so immediately transition
        setDisplayChildren(children);
        lenis.scrollTo(0, { immediate: true });
      } else {
        timeline.play().then(() => {
          // outro complete so reset to an empty paused timeline
          setDisplayChildren(children);
          lenis.scrollTo(0, { immediate: true });
          timeline.pause().clear();
        });
      }
    }
  }, [children]);

  return <div ref={el}>{displayChildren}</div>;
}
