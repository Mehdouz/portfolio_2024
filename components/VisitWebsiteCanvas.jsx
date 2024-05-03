import * as THREE from "three";
import { useFrame, useThree, extend } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { VisitWebsiteMaterial } from "@/materials/VisitWebsiteMaterial.js";

export default function VisitWebsiteCanvas() {
  const planRef = useRef(null);
  const shaderRef = useRef(null);

  const { contextSafe } = useGSAP({ scope: planRef });

  const { pointer } = useThree();

  let tlLeave;
  let tlForceIntro;
  let mouseTarget = new THREE.Vector2(0, 0);

  useFrame(() => {
    if (shaderRef.current) {
      // Normalise pointer
      mouseTarget.x = gsap.utils.interpolate(mouseTarget.x, pointer.x, 0.4);
      mouseTarget.y = gsap.utils.interpolate(mouseTarget.y, pointer.y, 0.4);

      shaderRef.current.uMouse.x = mouseTarget.x;
      shaderRef.current.uMouse.y = mouseTarget.y;
      shaderRef.current.uTime += 0.006;
    }
  });

  const handlePointerEnter = contextSafe(() => {
    tlLeave?.kill();
    tlForceIntro = new gsap.timeline();
    if (shaderRef.current) {
      tlForceIntro.to(
        shaderRef.current.uniforms.uIntro,
        { value: 1.0, duration: 0.4, ease: "expo.out" },
        0
      );
    }
  });

  const handlePointerLeave = contextSafe(() => {
    tlForceIntro?.kill();
    tlLeave = new gsap.timeline();
    if (shaderRef.current) {
      tlLeave.to(
        shaderRef.current.uniforms.uIntro,
        { value: 0.3, duration: 0.4, ease: "expo.out" },
        0
      );
    }
  });

  return (
    <>
      <mesh
        ref={planRef}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <sphereGeometry args={[2.5, 128, 128]} />
        <visitWebsiteMaterial ref={shaderRef} key={VisitWebsiteMaterial.key} />
      </mesh>
    </>
  );
}
