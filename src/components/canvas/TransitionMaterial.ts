import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
//@ts-ignore
import vertex from "./shaders/transition/vertex.glsl";
//@ts-ignore
import fragment from "./shaders/transition/fragment.glsl";

const TransitionMaterial = shaderMaterial(
  {
    uTime: 0,
    uProgress: 0,
    uTexture1: null,
    uTexture2: null,
    uImageRes: [0, 0],
    uRes: [1, 1],
    uDisplace: null,
  },
  vertex,
  fragment
);

extend({ TransitionMaterial });

export { TransitionMaterial };
