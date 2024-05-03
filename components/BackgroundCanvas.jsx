import { useFrame, extend } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Vector2 } from "three";
import { OrbitControls } from "three-stdlib";
import { WaveMaterial } from "../materials/WaveMaterial.js";
import { useLenis } from "@studio-freight/react-lenis";

extend({ OrbitControls });

export default function BackgroundCanvas() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useLenis(({ progress }) => {
    shaderRef.current.uScroll = progress * 10.0;
  });

  const planRef = useRef(null);
  const shaderRef = useRef(null);

  const handleMouseMove = (e) => {
    setMousePosition({
      x: e.clientX / window.innerWidth,
      y: 1 - e.clientY / window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame(() => {
    if (shaderRef.current) {
      shaderRef.current.uTime += 0.001;
      shaderRef.current.pointer = new Vector2(mousePosition.x, mousePosition.y);
    }
  });

  return (
    <mesh ref={planRef}>
      <planeGeometry args={[12, 12, 300, 300]} />
      <waveMaterial ref={shaderRef} key={WaveMaterial.key} />
    </mesh>
  );
}
