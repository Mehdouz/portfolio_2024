import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import fragmentShader from "../shaders/backgroundShaders/fragmentShader.glsl";
import vertexShader from "../shaders/backgroundShaders/vertexShader.glsl";

// Tutorial: https://www.youtube.com/watch?v=f4s1h2YETNY
const WaveMaterial = shaderMaterial(
  {
    uTime: 0,
    uWaveFrequency: new THREE.Vector2(2, 0),
    uWaveElevation: 0.35,
    pointer: new THREE.Vector2(),
    uScroll: 0,
  },
  vertexShader,
  fragmentShader
);

extend({ WaveMaterial });

export { WaveMaterial };
