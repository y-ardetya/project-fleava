"use client";

import { useRef } from "react";
import { DistortionMaterial } from "./DistortionMaterial";
import { useFrame } from "@react-three/fiber";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      distortionMaterial: any;
    }
  }
}

const Scene = () => {
  const $shader = useRef(null);
  useFrame((state, delta) => {
    if ($shader.current) {
      $shader.current.uniforms.uTime.value += delta;
    }
  });
  return (
    <>
      <mesh scale={2} position={[0, 0, -1]}>
        <icosahedronGeometry args={[1, 16]} />
        <distortionMaterial ref={$shader} key={DistortionMaterial.key} />
      </mesh>
    </>
  );
};

export default Scene;
