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

  const [currentTextureIndex, setCurrentTextureIndex] = useState(0);
  const currentTexture = textures[currentTextureIndex];

  //Image Aspect Ratio
  const imageAspect = textures[4].image.height / textures[4].image.width;
  let a1;
  let a2;
  if (viewport.width / viewport.height > imageAspect) {
    a1 = (viewport.width / viewport.height) * imageAspect;
    a2 = 1;
  } else {
    a1 = 1;
    a2 = viewport.height / viewport.width / imageAspect;
  }

  const handleClick = () => {
    const nextTextureIndex = (currentTextureIndex + 1) % textures.length;
    setCurrentTextureIndex(nextTextureIndex);

    gsap.fromTo(
      $shader.current.uniforms.uProgress,
      { value: 0 },
      { value: 1, duration: 2, ease: "power4.inOut" }
    );
  };

  return (
    <>
      <mesh scale={[viewport.width, viewport.height, 1]} position={[0, 0, 0]}>
        <planeGeometry args={[1, 1, 2, 2]} />
        <transitionMaterial
          ref={$shader}
          key={TransitionMaterial}
          uResolution={[viewport.width, viewport.height, a1, a2]}
          uTexture1={currentTexture}
          uTexture2={textures[(currentTextureIndex + 1) % textures.length]}
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
