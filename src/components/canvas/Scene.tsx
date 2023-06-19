"use client";

import { useEffect, useRef, useState } from "react";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { CameraControls, MeshPortalMaterial } from "@react-three/drei";
import { easing, geometry } from "maath";
import { motion as m3 } from "framer-motion-3d";
import { useRouter } from "next/navigation";
import Carousel from "./Carousel";
import  gsap  from "gsap";
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

const Frame = ({ children, position, name }: any) => {
  const { controls, scene } = useThree();
  const $portal = useRef<any>();
  const $camera = useRef<any>();
  const $mesh = useRef<any>();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        router.push("/works");
      }, 1000);
    }
  }, [open]);

  useEffect(() => {
    const mouseMoveX = gsap.quickTo($mesh.current.position, "left", {
      duration: 0.8,
      ease: "power3",
    });
    const mouseMoveY = gsap.quickTo($mesh.current.position, "top", {
      duration: 0.8,
      ease: "power3",
    });


    window.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;
      mouseMoveX(clientX);
      mouseMoveY(clientY);
    });
  }, []);

  return (
    <>
      <m3.mesh
        ref={$mesh}
        name={name}
        animate={open ? { scale: 8.1 } : { scale: 3 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        scale={3}
        position={position}
        onClick={() => setOpen(!open)}
      >
        <roundedPlaneGeometry />
        <MeshPortalMaterial ref={$portal} blending={1} blur={1} blendDstAlpha={1}>
          {children}
        </MeshPortalMaterial>
      </m3.mesh>
    </>
  );
};

const Scene = () => {
  return (
    <>
      {/* <Frame name="carousel">
        <Carousel position={[0, 0, -3.9]} />
      </Frame> */}
      <Particle />
    </>
  );
};

export default Scene;
