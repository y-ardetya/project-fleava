"use client";

import { Canvas } from "@react-three/fiber";
import Scene from "@/components/canvas/Scene";
import Overlay from "@/components/dom/Overlay";
import { ScrollControls, Scroll, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";

const Experience = () => {
  return (
    <>
      <Canvas gl={{ antialias: false, alpha: false }} dpr={1.5}>
        <Perf />
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 0, 5]} intensity={1} />
        <ScrollControls pages={7}>
          <Scene />
          <Scroll></Scroll>
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
