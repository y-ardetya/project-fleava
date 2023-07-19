"use client";

import { Canvas } from "@react-three/fiber";
import Scene from "@/components/canvas/Scene";
import Overlay from "@/components/dom/Overlay";
import { ScrollControls, Scroll, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import Carousel from "@/components/canvas/Carousel";

const Experience = () => {
  return (
    <>
      <Canvas gl={{ antialias: false, alpha: false }} dpr={1.5}>
        <Perf position={"top-left"} />
        <Scene />
      </Canvas>
    </>
  );
};

export default function Home() {
  return <Experience />;
}
