import { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import gsap from "gsap";

export default function Navbar() {
  const router = useRouter();
  const headerRef = useRef();
  const linkRef = useRef();

  // Animations
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
  });

  return "hey";
}
