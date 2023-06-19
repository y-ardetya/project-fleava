import { RenderMaterial } from "./RenderMaterial";
import { getDataTexture, getVelocityTexture } from "@/helpers/getDataTexture";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { GPUComputationRenderer } from "three/examples/jsm/misc/GPUComputationRenderer";
// @ts-ignore
import computeVertexPosition from "./shaders/fbo/computePosition.glsl";
// @ts-ignore
import computeVertexVelocity from "./shaders/fbo/computeVelocity.glsl";
import { MeshPhysicalMaterial, MeshMatcapMaterial } from "three";
// @ts-ignore
import CustomShaderMaterial from "three-custom-shader-material";
// @ts-ignore
import { patchShaders } from "gl-noise/build/glNoise.m";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      renderMaterial: any;
    }
  }
}

const shader = {
  vertex: `
    uniform float uTime;
    uniform sampler2D uPosition;
    uniform sampler2D uVelocity;

    attribute vec2 ref;

    vec3 rotate3D (vec3 v, vec3 vel) {
        vec3 newpos = v;
        vec3 up = vec3(0., 1., 0.);
        vec3 axis = normalize(cross(up, vel));
        float angle = acos(dot(up, normalize(vel)));

        newpos = newpos * cos(angle) + cross(axis, newpos) * sin(angle) + axis * dot(axis, newpos) * (1.0 - cos(angle));
        return newpos;
    }

    vec3 displace(vec3 point, vec3 vel) {
        vec3 pos = texture2D(uPosition, ref).xyz;
        vec3 copyPoint = rotate3D(point, vel);
        vec3 instancePosition = (instanceMatrix * vec4(copyPoint, 1.)).xyz;
        return instancePosition + pos;
    } 

    void main() {
        vec3 vel = texture2D(uVelocity, ref).xyz;
        vec3 p = displace(position, vel);
        csm_PositionRaw = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(p, 1.);
        csm_Normal = rotate3D(normal, vel);
    }
      `,
  fragment: `
      void main() {
        csm_DiffuseColor = vec4(1.);
      }
      `,
};

const Particle = () => {
  const { viewport, gl } = useThree();
  const $render = useRef<any>();
  const $mouse = useRef<any>();
  const $instance = useRef<any>();
  const count = 256;
  const matcap = useTexture("/matcap1.png");

  const gpuCompute = new GPUComputationRenderer(count, count, gl);
  const pointOnSphere = getDataTexture(count);
  const positionVariable = gpuCompute.addVariable(
    "uCurrentPosition",
    computeVertexPosition,
    pointOnSphere
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

  velocityUniforms.uMouse = { value: new THREE.Vector3(0, 0, 0) };
  positionUniforms.uOriginalPosition = { value: pointOnSphere };
  velocityUniforms.uOriginalPosition = { value: pointOnSphere };

  gpuCompute.init();

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

  const uniforms = useMemo(
    () => ({
      uPosition: {
        value: null,
      },
      uVelocity: {
        value: null,
      },
    }),
    []
  );

  useEffect(() => {
    const ref = new Float32Array(count * count * 2);
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const k = i * count + j;
        ref[k * 2] = i / (count - 1);
        ref[k * 2 + 1] = j / (count - 1);
      }
    }
    $instance.current.geometry.setAttribute(
      "ref",
      new THREE.InstancedBufferAttribute(ref, 2)
    );
  }, []);

  useFrame(({ mouse }) => {
    gpuCompute.compute();
    // $render.current.uniforms.uPosition.value =
    //   gpuCompute.getCurrentRenderTarget(positionVariable).texture;

    $mouse.current.position.x = (mouse.x * viewport.width) / 2;
    $mouse.current.position.y = (mouse.y * viewport.height) / 2;

    velocityUniforms.uMouse.value.x = (mouse.x * viewport.width) / 2;
    velocityUniforms.uMouse.value.y = (mouse.y * viewport.height) / 2;

    $instance.current.material.uniforms.uPosition.value =
      gpuCompute.getCurrentRenderTarget(positionVariable).texture;

    $instance.current.material.uniforms.uVelocity.value =
      gpuCompute.getCurrentRenderTarget(velocityVariable).texture;
  });

  return (
    <>
      <mesh ref={$mouse}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshBasicMaterial color="red" />
      </mesh>
      {/* <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-ref"
            count={ref.length / 2}
            array={ref}
            itemSize={2}
          />
        </bufferGeometry>
        <renderMaterial
          transparent={true}
          depthWrite={false}
          depthTest={false}
          ref={$render}
          key={RenderMaterial}
        />
      </points> */}
      <instancedMesh
        ref={$instance}
        // @ts-ignore
        args={[null, null, count * count]}
      >
        <boxGeometry args={[0.01, 0.03, 0.01]} />
        <CustomShaderMaterial
          baseMaterial={MeshMatcapMaterial}
          // @ts-ignore
          size={0.01}
          vertexShader={patchShaders(shader.vertex)}
          fragmentShader={patchShaders(shader.fragment)}
          uniforms={uniforms}
          transparent
          matcap={matcap}
        />
      </instancedMesh>
    </>
  );
};

export default Particle;
