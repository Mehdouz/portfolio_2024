import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import fragmentShader from "../shaders/singleProjectShader/fragmentShader.glsl";
import vertexShader from "../shaders/singleProjectShader/vertexShader.glsl";

const SingleProjectMaterial = shaderMaterial(
  {
    uTexture: null,
    uAspectRatio: new THREE.Vector2(),
    uVelocity: 0.0,
  },
  vertexShader,
  fragmentShader
);

extend({ SingleProjectMaterial });

export { SingleProjectMaterial };
