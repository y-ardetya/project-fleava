"use client";

import { useRef, useState } from "react";
import { DistortionMaterial } from "./DistortionMaterial";
import { extend, useFrame } from "@react-three/fiber";
import { MeshPortalMaterial } from "@react-three/drei";
import { easing, geometry } from "maath";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Carousel from "./Carousel";
import { motion as m3 } from "framer-motion-3d";

extend(geometry);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      distortionMaterial: any;
      roundedPlaneGeometry: any;
    }
  }
}

const Frame = ({ children, position }: any) => {
  const $portal = useRef<any>();
  const [open, setOpen] = useState(false);

  return (
    <m3.mesh
      animate={open ? { scale: 9 } : { scale: 3 }}
      transition={{ duration: 0.5, ease: easing.expoOut }}
      scale={3}
      position={position}
      onClick={() => setOpen(!open)}
    >
      <roundedPlaneGeometry />
      <MeshPortalMaterial ref={$portal} blending={1}>
        <color attach="background" args={["#fff"]} />
        {children}
      </MeshPortalMaterial>
    </m3.mesh>
  );
};

const Scene = () => {
  return (
    <>
      <Frame>
        <Carousel />
      </Frame>
    </>
  );
};

export default Scene;
