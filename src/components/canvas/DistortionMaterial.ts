import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
//@ts-ignore
import vertex from "./shaders/distortion/vertex.glsl";
//@ts-ignore
import fragment from "./shaders/distortion/fragment.glsl";

const DistortionMaterial = shaderMaterial(
  {
    uTime: 0,
  },
  vertex,
  fragment
);

extend({ DistortionMaterial });

export { DistortionMaterial };
