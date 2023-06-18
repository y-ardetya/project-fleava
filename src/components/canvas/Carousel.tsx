//@ts-ignore
import { TransitionMaterial } from "./TransitionMaterial";
import { useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
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
  const [nextTextureIndex, setNextTextureIndex] = useState(1);
  const currentTexture = textures[currentTextureIndex];
  const nextTexture = textures[nextTextureIndex];

  // const handlePrev = () => {
  //   if (currentTextureIndex === 0 && nextTextureIndex === 1) {
  //     return;
  //   }

  //   const currentIndex = (currentTextureIndex - 1) % textures.length;
  //   const nextIndex = (nextTextureIndex - 1) % textures.length;

  //   const tl = gsap.timeline({
  //     onComplete: () => {
  //       setCurrentTextureIndex(currentIndex);
  //       setNextTextureIndex(nextIndex);
  //       $shader.current.uniforms.uProgress.value = 1;
  //     },
  //   });
  //   tl.fromTo(
  //     $shader.current.uniforms.uProgress,
  //     { value: 1 },
  //     { value: 0, duration: 1.0, ease: "power2.easeOut" }
  //   );
  // };

  const handleNext = () => {
    if (
      currentTextureIndex === textures.length - 1 &&
      nextTextureIndex === textures.length - 1
    ) {
      setCurrentTextureIndex(0);
      setNextTextureIndex(1);
      $shader.current.uniforms.uProgress.value = 0;

      return;
    }

    const currentIndex = (currentTextureIndex + 1) % textures.length;
    const nextIndex = (nextTextureIndex + 1) % textures.length;

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentTextureIndex(currentIndex);
        setNextTextureIndex(nextIndex);
        $shader.current.uniforms.uProgress.value = 0;
      },
    });
    tl.fromTo(
      $shader.current.uniforms.uProgress,
      { value: 0 },
      { value: 1, duration: 0.5, ease: "power2.easeOut" }
    );
  };

  const [isClickPrev, isClickNext, setIsClickedPrev, setIsClickedNext]: any =
    useStore((state) => [
      state.isClickPrev,
      state.isClickNext,
      state.setIsClickedPrev,
      state.setIsClickedNext,
    ]);

  useEffect(() => {
    // if (isClickPrev === true) {
    //   handlePrev();
    //   setIsClickedPrev();

    //   return;
    // }

    if (isClickNext === true) {
      handleNext();
      setIsClickedNext();

      return;
    }
  }, [isClickPrev, isClickNext]);

  return (
    <>
      <mesh scale={[viewport.width, viewport.height, 1]} position={[0, 0, 0]}>
        <planeGeometry />
        <transitionMaterial
          ref={$shader}
          key={TransitionMaterial}
          uTexture1={currentTexture}
          uTexture2={nextTexture}
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
