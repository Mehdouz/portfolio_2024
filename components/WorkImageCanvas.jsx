import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { TextureLoader } from "three";
import { ProjectMaterial } from "../materials/ProjectMaterial.js";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "@studio-freight/react-lenis";
import { WorkMaterial } from "@/materials/WorkMaterial.js";

export default function WorkImageCanvas({ cover, imageAspect }) {
  const planRef = useRef(null);
  const shaderRef = useRef(null);

  const { contextSafe } = useGSAP({ scope: planRef });

  let tlLeave;
  let tlForceIntro;

  let mouseTarget = new THREE.Vector2(0, 0);

  const { size, pointer } = useThree();

  if (shaderRef.current) shaderRef.current.uTexture = cover;

  // Make the texture image have "cover" effect
  useEffect(() => {
    if (shaderRef.current) {
      if (size.height / size.width > imageAspect) {
        shaderRef.current.uAspectRatio.x =
          (size.width / size.height) * imageAspect;
        shaderRef.current.uAspectRatio.y = 1;
      } else {
        shaderRef.current.uAspectRatio.x = 1;
        shaderRef.current.uAspectRatio.y =
          size.height / size.width / imageAspect;
      }
    }
  }, [size]);

  useFrame(() => {
    if (shaderRef.current) {
      mouseTarget.x = gsap.utils.interpolate(mouseTarget.x, pointer.x, 0.4);
      mouseTarget.y = gsap.utils.interpolate(mouseTarget.y, pointer.y, 0.4);

      shaderRef.current.uMouse.x = mouseTarget.x;
      shaderRef.current.uMouse.y = mouseTarget.y;
    }
  });

  const handlePointerEnter = contextSafe(() => {
    tlLeave?.kill();
    tlForceIntro = new gsap.timeline();
    if (shaderRef.current) {
      tlForceIntro.to(
        shaderRef.current.uniforms.uIntro,
        { value: 1, duration: 1, ease: "expo.out" },
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
        { value: 0, duration: 1.8, ease: "expo.out" },
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
        <planeGeometry args={[2, 2]} />
        <workMaterial
          ref={shaderRef}
          key={WorkMaterial.key}
          cover={cover}
          toneMapped={false}
        />
      </mesh>
    </>
  );
}
