"use client";
// @ts-ignore
import { TransitionMaterial } from "./TransitionMaterial";
import { useThree } from "@react-three/fiber";
import { useTexture, Html } from "@react-three/drei";
import { motion as m3 } from "framer-motion-3d";
import { useRef, useState } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      transitionMaterial: any;
    }
  }
}

const transition = {
  open: { uProgress: 1 },
  closed: { uProgress: 0 },
};

const Carousel = () => {
  const { viewport } = useThree();
  const [active, setActive] = useState(false);
  const [currentTexture, setCurrentTexture] = useState(0);
  const $shader = useRef<any>(null);
  const textures = useTexture([
    "/images/three.jpg",
    "/images/four.jpg",
    "/images/one.jpg",
    "/images/two.jpg",
  ]);

  const changeTexture = () => {
    setCurrentTexture((prevTexture) => (prevTexture + 1) % textures.length);
  };

  return (
    <>
      <mesh scale={[viewport.width, viewport.height, 1]} position={[0, 0, 0]}>
        <planeGeometry />
        <m3.transitionMaterial
          variants={transition}
          animate={active ? "open" : "closed"}
          transition={{ duration: 1.3, ease: "easeInOut" }}
          ref={$shader}
          key={TransitionMaterial}
          uTexture={textures[currentTexture]}
          uTexture2={textures[(currentTexture + 1) % textures.length]}
        />
      </mesh>
      <Html>
        <div className="w-screen h-screen">
          <button
            onClick={() => {
              changeTexture();
              setActive(!active);
            }}
            className="absolute text-white text-4xl"
          >
            click
          </button>
        </div>
      </Html>
    </>
  );
};

export default Carousel;
