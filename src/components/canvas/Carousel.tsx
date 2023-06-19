//@ts-ignore
import { TransitionMaterial } from "./TransitionMaterial";
import { useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useStore } from "@/store/useStore";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      transitionMaterial: any;
    }
  }
}

const Carousel = ({ position }: any) => {
  const { viewport } = useThree();
  const [dataIndex, setDataIndex]: any = useStore((state) => [
    state.dataIndex,
    state.setDataIndex,
  ]);

  const $shader = useRef<any>(null);
  const textures = useTexture([
    "/images/one.jpg",
    "/images/two.jpg",
    "/images/three.jpg",
    "/images/four.jpg",
    "/images/five.jpg",
  ]);
  const displace = useTexture("/images/disp1.jpg");

  const currentTexture = textures[dataIndex];

  const handleTransition = () => {
    if (dataIndex === 0) return;
    setDataIndex(dataIndex);
    gsap.fromTo(
      $shader.current.uniforms.uProgress,
      { value: 0 },
      { value: 1, duration: 1.0, ease: "power2.easeOut" }
    );
  };

  useEffect(() => {
    handleTransition();
  }, [dataIndex]);

  return (
    <>
      <mesh scale={[viewport.width, viewport.height, 1]} position={position}>
        <planeGeometry />
        <transitionMaterial
          ref={$shader}
          key={TransitionMaterial.key}
          uTexture1={currentTexture}
          uTexture2={textures[(dataIndex + 1) % textures.length]}
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
