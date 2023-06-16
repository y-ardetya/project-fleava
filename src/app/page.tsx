"use client";

import Scene from "@/components/canvas/Scene";
import Container from "@/components/dom/ModalContainer";
import { ScrollControls, Scroll } from "@react-three/drei";
//@ts-ignore
import { Canvas } from "@react-three/fiber";

export default function Home() {
  return (
    <>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <ScrollControls pages={3}>
          <Scene />
          <Scroll html>
            <Container />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </>
  );
}
