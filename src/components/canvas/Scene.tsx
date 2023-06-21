"use client";

import { useRef, useState } from "react";
import { extend, useThree } from "@react-three/fiber";
import {  MeshPortalMaterial } from "@react-three/drei";
import { geometry } from "maath";
import { motion as m3 } from "framer-motion-3d";
import Particle from "./Particle";

extend(geometry);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      distortionMaterial: any;
      roundedPlaneGeometry: any;
    }
  }
}

// const Frame = ({ children, position, name }: any) => {
//   const { controls, scene } = useThree();
//   const $portal = useRef<any>();
//   const $camera = useRef<any>();
//   const $mesh = useRef<any>();
//   const router = useRouter();
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       <m3.mesh
//         ref={$mesh}
//         name={name}
//         animate={open ? { scale: 8.1 } : { scale: 3 }}
//         transition={{ duration: 0.5, ease: "easeInOut" }}
//         scale={3}
//         position={position}
//         onClick={() => setOpen(!open)}
//       >
//         <roundedPlaneGeometry />
//         <MeshPortalMaterial ref={$portal} blending={1} blur={1} blendDstAlpha={1}>
//           {children}
//         </MeshPortalMaterial>
//       </m3.mesh>
//     </>
//   );
// };

const Scene = () => {
  return (
    <>
      <Particle />
    </>
  );
};

export default Scene;
