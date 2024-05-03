import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import fragmentShader from "../shaders/workShader/fragmentShader.glsl";
import vertexShader from "../shaders/workShader/vertexShader.glsl";

const WorkMaterial = shaderMaterial(
  {
    uTexture: null,
    uAspectRatio: new THREE.Vector2(),
    uMouse: new THREE.Vector2(0.5, 0.5),
    uMouseIntro: new THREE.Vector2(0.5, 0.5),
    uIntro: 0.0,
  },
  vertexShader,
  fragmentShader
);

extend({ WorkMaterial });

export { WorkMaterial };
