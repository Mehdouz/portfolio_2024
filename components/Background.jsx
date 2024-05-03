import BackgroundCanvas from "@/components/BackgroundCanvas";
import { ACESFilmicToneMapping, SRGBColorSpace } from "three";
import { Canvas } from "@react-three/fiber";

export default function Background() {
  return (
    <div className="h-screen w-screen fixed top-0 left-0 z-0">
      <Canvas
        dpr={1}
        gl={{
          toneMapping: ACESFilmicToneMapping,
          outputColorSpace: SRGBColorSpace,
        }}
        camera={{
          fov: 60,
          near: 1,
          far: 8,
          position: [0, -3, 2],
          rotation: [Math.PI * 0.2, 0, 0],
        }}
      >
        <BackgroundCanvas />
      </Canvas>
    </div>
  );
}
