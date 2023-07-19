import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
// @ts-ignore
import vertex from "./shaders/fbo/renderVertex.glsl";
// @ts-ignore
import fragment from "./shaders/fbo/renderFragment.glsl";

const RenderMaterial = shaderMaterial(
  {
    uPosition: null,
    uTime : 0,
  },
  vertex,
  fragment
);

extend({ RenderMaterial });

export { RenderMaterial };
