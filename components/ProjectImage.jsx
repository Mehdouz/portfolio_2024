import React, { forwardRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import Link from "next/link";
import ProjectSingleImageCanvas from "./ProjectSingleImageCanvas";

export default function ProjectImage({ image, type, projectName, index }) {
  const containerClass =
    type === "mobile" ? "w-full lg:w-[49%]" : "w-full mb-12";
  const heightClass = `h-${projectName}-${type}-${index + 1}`;

  return (
    <Link href="www.google.com" className="mouseLink" target="_blank">
      <Canvas dpr={1} resize={{ scroll: false }}>
        <ProjectSingleImageCanvas
          cover={image.url}
          imageAspect={image.height / image.width}
        />
        <OrthographicCamera
          manual
          left={-1}
          right={1}
          top={1}
          bottom={-1}
          near={0}
          far={1}
          makeDefault
        />
      </Canvas>
    </Link>
  );
}
