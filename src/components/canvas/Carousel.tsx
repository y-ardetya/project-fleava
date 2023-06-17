//@ts-ignore
import { TransitionMaterial } from "./TransitionMaterial";
import { useThree } from "@react-three/fiber";
import { useTexture, Html } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useStore } from "@/store/useStore";

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
    "/images/one.jpg",
    "/images/two.jpg",
    "/images/three.jpg",
    "/images/four.jpg",
    "/images/five.jpg",
  ]);
  const displace = useTexture("/images/disp1.jpg");

  const [currentTextureIndex, setCurrentTextureIndex] = useState(0);
  const currentTexture = textures[currentTextureIndex];

  const handlePrev = () => {
    const prevTextureIndex = (currentTextureIndex - 1) % textures.length;
    console.log('prevTexture', prevTextureIndex);
    if (currentTextureIndex === 0) {

      return
    }
    
    setCurrentTextureIndex(prevTextureIndex);
    console.log('current', currentTextureIndex);
    gsap.fromTo(
      $shader.current.uniforms.uProgress,
      { value: 1 },
      { value: 0, duration: 1.5, ease: "power2.easeOut" }
    );
  };

  const handleNext = () => {
    const nextTextureIndex = (currentTextureIndex + 1) % textures.length;
    
    console.log('nextTexture', nextTextureIndex);
    
    
    
    setCurrentTextureIndex(nextTextureIndex);
    console.log('current', currentTextureIndex);

    gsap.fromTo(
      $shader.current.uniforms.uProgress,
      { value: 0 },
      { value: 1, duration: 1.5, ease: "power2.easeOut" }
    );
  };

  const [isClickPrev, isClickNext, setIsClickedPrev, setIsClickedNext]: any = useStore(state => [state.isClickPrev, state.isClickNext, state.setIsClickedPrev, state.setIsClickedNext])

  useEffect(() => {
    if (isClickPrev === true) {
      handlePrev()

      console.log('prev');
      
      setIsClickedPrev()
    }
    
    if (isClickNext === true) {
      handleNext()
      
      console.log('next');
      
      setIsClickedNext()
    }
  }, [isClickPrev, isClickNext])

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
            textures[0].source.data.width,
            textures[0].source.data.height,
          ]}
          uDisplace={displace}
        />
      </mesh>
    </>
  );
};

export default Carousel;
