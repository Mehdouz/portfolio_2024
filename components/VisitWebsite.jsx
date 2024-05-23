import { Canvas } from "@react-three/fiber";
import VisitWebsiteCanvas from "./VisitWebsiteCanvas";

export default function VisitWebsite() {
  return (
    <div className="cursor-pointer fixed bottom-5 right-5  w-[150px] h-[150px] z-50">
      <Canvas dpr={1} resize={{ scroll: false }}>
        <VisitWebsiteCanvas />
      </Canvas>
      <h1 className="absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] w-full text-center mix-blend-exclusion text-xs pointer-events-none font-roobert font-light">
        Visit website
      </h1>
    </div>
  );
}
