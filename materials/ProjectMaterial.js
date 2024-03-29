import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import fragmentShader from "../shaders/projectShader/fragmentShader.glsl";
import vertexShader from "../shaders/projectShader/vertexShader.glsl";

const ProjectMaterial = shaderMaterial(
  {
    uTexture: null,
    uAspectRatio: new THREE.Vector2(),
    uMouse: new THREE.Vector2(0.5, 0.5),
    uMouseIntro: new THREE.Vector2(0.5, 0),
    uIntro: 0.0,
    uBulge: 1.0,
    uTime: 0.0,
  },
  vertexShader,
  fragmentShader
);

extend({ ProjectMaterial });

export { ProjectMaterial };
