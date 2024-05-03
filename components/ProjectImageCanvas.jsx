import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { TextureLoader } from "three";
import { ProjectMaterial } from "../materials/ProjectMaterial.js";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "@studio-freight/react-lenis";

export default function ProjectImageCanvas({ cover, isInView }) {
  const planRef = useRef(null);
  const shaderRef = useRef(null);

  const { contextSafe } = useGSAP({ scope: planRef });

  let tlHide;
  let tlShow;

  let tlLeave;
  let tlForceIntro;

  let mouseTarget = new THREE.Vector2(0, 0);

  const { size, pointer } = useThree();

  const cachedTexture = useMemo(() => new TextureLoader().load(cover), [cover]);

  if (shaderRef.current) shaderRef.current.uTexture = cachedTexture;

  useLenis(({ progress }) => {
    shaderRef.current.uScroll = progress * 10.0;
  });

  // Make the texture image have "cover" effect
  useEffect(() => {
    const imageAspect = 1400 / 2100;
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

  const showCard = () => {
    tlHide?.kill();
    tlShow = new gsap.timeline();
    if (shaderRef.current) {
      tlShow.to(shaderRef.current.uniforms.uBulge, {
        value: 0,
        duration: 1.2,
        ease: "power3.out",
      });
    }
  };

  const hideCard = () => {
    tlShow?.kill();
    tlHide = new gsap.timeline();
    if (shaderRef.current) {
      tlHide.to(shaderRef.current.uniforms.uBulge, { value: 1, duration: 1.2 });
    }
  };

  useEffect(() => {
    isInView ? showCard() : hideCard();
  }, [isInView]);

  useFrame(() => {
    if (shaderRef.current) {
      // Normalise pointer
      mouseTarget.x = gsap.utils.interpolate(mouseTarget.x, pointer.x, 0.1);
      mouseTarget.y = gsap.utils.interpolate(mouseTarget.y, pointer.y, 0.1);
      shaderRef.current.uMouse.x = mouseTarget.x;
      shaderRef.current.uMouse.y = mouseTarget.y;

      shaderRef.current.uTime += 0.001;
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
      tlForceIntro.to(
        shaderRef.current.uniforms.uBulge,
        {
          value: 1,
          duration: 1,
          ease: "expo.out",
        },
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
      tlLeave.to(
        shaderRef.current.uniforms.uBulge,
        {
          value: 0,
          duration: 1.8,
          ease: "expo.out",
        },
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
        <planeGeometry args={[2, 2, 16, 16]} />
        <projectMaterial
          ref={shaderRef}
          key={ProjectMaterial.key}
          cover={cover}
        />
      </mesh>
    </>
  );
}
