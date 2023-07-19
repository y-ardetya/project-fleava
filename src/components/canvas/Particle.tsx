import { RenderMaterial } from "./RenderMaterial";
import { useFrame, useThree, extend } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useGLTF, useSurfaceSampler } from "@react-three/drei";
import { GPUComputationRenderer } from "three/examples/jsm/misc/GPUComputationRenderer";
// @ts-ignore
import computeVertexPosition from "./shaders/fbo/computePosition.glsl";
// @ts-ignore
import computeVertexVelocity from "./shaders/fbo/computeVelocity.glsl";

import {
  getVelocityTexture,
  getSphereTexture,
  getPointOnModel,
} from "@/data/getDataTexture";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      renderMaterial: any;
    }
  }
}

const Particle = () => {
  const { viewport, gl } = useThree();
  const renderMat = useRef<any>();
  const count = 512;
  const { nodes }: any = useGLTF("/Cubone-transformed.glb");

  const gpuCompute = new GPUComputationRenderer(count, count, gl);
  const pointsOnASphere = getSphereTexture(count);

  const positionVariable = gpuCompute.addVariable(
    "uCurrentPosition",
    computeVertexPosition,
    pointsOnASphere
  );
  const velocityVariable = gpuCompute.addVariable(
    "uCurrentVelocity",
    computeVertexVelocity,
    getVelocityTexture(count)
  );

  gpuCompute.setVariableDependencies(positionVariable, [
    positionVariable,
    velocityVariable,
  ]);
  gpuCompute.setVariableDependencies(velocityVariable, [
    positionVariable,
    velocityVariable,
  ]);

  const positionUniforms = positionVariable.material.uniforms;
  const velocityUniforms = velocityVariable.material.uniforms;

  velocityUniforms.uMouse = { value: new THREE.Vector3(-10, -10, 0) };
  velocityUniforms.uTime = { value: 0 };
  positionUniforms.uOriginalPosition = { value: pointsOnASphere };
  velocityUniforms.uOriginalPosition = { value: pointsOnASphere };

  gpuCompute.init();

  const particles = new Float32Array(count * count * 3);
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      const k = i * count + j;
      particles[k * 3 + 0] = (5 * i) / count;
      particles[k * 3 + 1] = (5 * j) / count;
      particles[k * 3 + 2] = 0;
    }
  }

  const refs = new Float32Array(count * count * 2);
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      const k = i * count + j;
      refs[k * 2 + 0] = i / (count - 1);
      refs[k * 2 + 1] = j / (count - 1);
    }
  }

  const positions = new Float32Array(count * count * 3);
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      positions[i * count * 3 + j * 3] = (5 * i) / count;
      positions[i * count * 3 + j * 3 + 1] = (5 * j) / count;
      positions[i * count * 3 + j * 3 + 2] = 0;
    }
  }

  const ref = new Float32Array(count * count * 2);
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      ref[i * count * 2 + j * 2] = i / count;
      ref[i * count * 2 + j * 2 + 1] = j / count;
    }
  }

  useFrame((state, delta) => {
    gpuCompute.compute();

    velocityUniforms.uMouse.value.x = (state.pointer.x * viewport.width) / 2;
    velocityUniforms.uMouse.value.y = (state.pointer.y * viewport.height) / 2;
    velocityUniforms.uTime.value = delta;

    renderMat.current.uniforms.uTime.value += delta;

    renderMat.current.uniforms.uPosition.value =
      gpuCompute.getCurrentRenderTarget(positionVariable).texture;
  });

  return (
    <>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-ref"
            count={refs.length / 3}
            array={refs}
            itemSize={2}
          />
        </bufferGeometry>
        <renderMaterial
          key={RenderMaterial.key}
          transparent={true}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          depthTest={false}
          ref={renderMat}
        />
      </points>
    </>
  );
};

export default Particle;

useGLTF.preload("/penrose-transformed.glb");
