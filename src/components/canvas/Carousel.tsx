//@ts-ignore
import { TransitionMaterial } from "./TransitionMaterial";
import { useThree } from "@react-three/fiber";
import { useTexture, Html } from "@react-three/drei";
import { useRef, useState } from "react";
import { gsap } from "gsap";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      transitionMaterial: any;
    }
  }
}

const Carousel = () => {
  const { viewport } = useThree();
  const $shader = useRef<any>(null);
  const textures = useTexture([
    "/images/three.jpg",
    "/images/four.jpg",
    "/images/one.jpg",
    "/images/two.jpg",
    "/images/five.jpg",
  ]);
  const displace = useTexture("/images/disp1.jpg");

  const [currentTextureIndex, setCurrentTextureIndex] = useState(0);
  const currentTexture = textures[currentTextureIndex];

  const handleClick = () => {
    const nextTextureIndex = (currentTextureIndex + 1) % textures.length;
    setCurrentTextureIndex(nextTextureIndex);

    gsap.fromTo(
      $shader.current.uniforms.uProgress,
      { value: 0 },
      { value: 1, duration: 1.5, ease: "power2.easeOut" }
    );
  };

  return (
    <>
      <mesh scale={[viewport.width, viewport.height, 1]} position={[0, 0, 0]}>
        <planeGeometry args={[1, 1, 2, 2]} />
        <transitionMaterial
          ref={$shader}
          key={TransitionMaterial}
          uTexture1={currentTexture}
          uTexture2={textures[(currentTextureIndex + 1) % textures.length]}
          uImageRes={[
            currentTexture.source.data.width,
            currentTexture.source.data.height,
          ]}
          uDisplace={displace}
        />
      </mesh>
      <Html>
        <div className="w-screen h-screen">
          <button
            onClick={handleClick}
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
