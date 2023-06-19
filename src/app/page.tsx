"use client";

import Carousel from "@/components/canvas/Carousel";
import Scene from "@/components/canvas/Scene";
import Overlay from "@/components/dom/Overlay";
import { ScrollControls, Scroll } from "@react-three/drei";
//@ts-ignore
import { Canvas } from "@react-three/fiber";

const Experience = () => {
  return (
    <>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <ScrollControls pages={7}>
          <Scene />
          <Scroll>
            <group position={[0, -7.7, 0]}>
              <Carousel />
            </group>
          </Scroll>
          <Scroll html>
            <Overlay />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </>
  );
};

export default function Home() {
  return <Experience />;
}
