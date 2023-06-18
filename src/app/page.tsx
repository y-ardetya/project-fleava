"use client";

import Scene from "@/components/canvas/Scene";
import Overlay from "@/components/dom/Overlay";
import { ScrollControls, Scroll, Image } from "@react-three/drei";
//@ts-ignore
import { Canvas } from "@react-three/fiber";

export default function Home() {
  return (
    <>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <ScrollControls pages={2}>
          <Scene />
          <Scroll html>
            <Overlay />
          </Scroll>
          <Scroll>
            <Image url="/images/one.jpg" scale={5} position={[0, -10, 0]} />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </>
  );
}
