import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import fragmentShader from "../shaders/visitWebsiteShader/fragmentShader.glsl";
import vertexShader from "../shaders/visitWebsiteShader/vertexShader.glsl";

const VisitWebsiteMaterial = shaderMaterial(
  {
    uMouse: new THREE.Vector2(0.5, 0.5),
    uMouseIntro: new THREE.Vector2(0.5, 0),
    uTime: 0.0,
    uIntro: 0.3,
  },
  vertexShader,
  fragmentShader
);

extend({ VisitWebsiteMaterial });

export { VisitWebsiteMaterial };
