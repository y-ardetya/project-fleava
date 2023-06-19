"use client";

import Carousel from "@/components/canvas/Carousel";
import Scene from "@/components/canvas/Scene";
import Overlay from "@/components/dom/Overlay";
import { ScrollControls, Scroll, OrbitControls } from "@react-three/drei";

const Experience = () => {
  return (
    <>
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
    </>
  );
};

export default function Home() {
  return <Experience />;
}
