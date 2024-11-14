import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { TextureLoader } from "three";
import gsap from "gsap";
import { useLenis } from "@studio-freight/react-lenis";
import { SingleProjectMaterial } from "@/materials/SingleProjectMaterial.js";

export default function ProjectSingleImageCanvas({ cover, imageAspect }) {
  const planRef = useRef(null);
  const shaderRef = useRef(null);

  let velocityPrev = 0;

  const { size } = useThree();

  const cachedTexture = useMemo(() => new TextureLoader().load(cover), [cover]);

  if (shaderRef.current) shaderRef.current.uTexture = cachedTexture;

  useLenis(({ velocity }) => {
    velocityPrev = gsap.utils.interpolate(velocityPrev, velocity * 0.005, 0.2);
    if(velocityPrev) shaderRef.current.uVelocity = velocityPrev;
  });

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
  }, [size, imageAspect]);

  return (
    <>
      <mesh ref={planRef}>
        <planeGeometry args={[1.8, 1.8, 256, 256]} />
        <singleProjectMaterial
          ref={shaderRef}
          key={SingleProjectMaterial.key}
          cover={cover}
        />
      </mesh>
    </>
  );
}
