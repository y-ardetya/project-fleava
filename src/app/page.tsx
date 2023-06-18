"use client";

import Scene from "@/components/canvas/Scene";
import ModalContainer from "@/components/dom/ModalContainer";
import Overlay from "@/components/dom/Overlay";
import { ScrollControls, Scroll } from "@react-three/drei";
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
        </ScrollControls>
      </Canvas>
    </>
  );
}
