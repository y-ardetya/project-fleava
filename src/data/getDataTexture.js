import * as THREE from "three";
// @ts-ignore
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import { extend } from "@react-three/fiber";

extend({ MeshSurfaceSampler });

export function getDataTexture(size) {
  let number = size * size;
  const data = new Float32Array(4 * number);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const index = i * size + j;

      // generate point on a sphere
      let theta = Math.random() * Math.PI * 2;
      let phi = Math.acos(Math.random() * 2 - 1); //
      // let phi = Math.random()*Math.PI; //
      let x = Math.sin(phi) * Math.cos(theta);
      let y = Math.sin(phi) * Math.sin(theta);
      let z = Math.cos(phi);

      data[4 * index] = 6 * (i / size - 0.5);
      data[4 * index + 1] = 6 * (j / size - 0.5);
      data[4 * index + 2] = 0;
      data[4 * index + 3] = 0;
    }
  }

  let dataTexture = new THREE.DataTexture(
    data,
    size,
    size,
    THREE.RGBAFormat,
    THREE.FloatType
  );
  dataTexture.needsUpdate = true;

  return dataTexture;
}

export function getSphereTexture(size) {
  let number = size * size;

  const data = new Float32Array(4 * number);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const index = i * size + j;

      // generate point on a sphere
      let theta = Math.random() * Math.PI * 2;
      let phi = Math.acos(Math.random() * 2 - 1);

      let x = Math.sin(phi) * Math.cos(theta);
      let y = Math.sin(phi) * Math.sin(theta);
      let z = Math.cos(phi);

      data[4 * index] = 2 * x;
      data[4 * index + 1] = 2 * y;
      data[4 * index + 2] = 2 * z;
      data[4 * index + 3] = 0;
    }
  }

  let dataTexture = new THREE.DataTexture(
    data,
    size,
    size,
    THREE.RGBAFormat,
    THREE.FloatType
  );
  dataTexture.needsUpdate = true;

  return dataTexture;
}

export function getVelocityTexture(size) {
  let number = size * size;
  const data = new Float32Array(4 * number);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const index = i * size + j;
      data[4 * index] = 0;
      data[4 * index + 1] = 0;
      data[4 * index + 2] = 0;
      data[4 * index + 3] = 0;
    }
  }

  let dataTexture = new THREE.DataTexture(
    data,
    size,
    size,
    THREE.RGBAFormat,
    THREE.FloatType
  );
  dataTexture.needsUpdate = true;

  return dataTexture;
}

export const getPointOnModel = (size, model) => {
  const number = size * size;
  const data = new Float32Array(4 * number);
  const sampler = new MeshSurfaceSampler(model).build();
  const tempPosition = new THREE.Vector3();
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const index = i * size + j;
      sampler.sample(tempPosition);
      data[4 * index + 0] = tempPosition.x * 5;
      data[4 * index + 1] = tempPosition.y * 5;
      data[4 * index + 2] = tempPosition.z * 5;
      data[4 * index + 3] = Math.random() * 5;
    }
  }
  let dataTexture = new THREE.DataTexture(
    data,
    size,
    size,
    THREE.RGBAFormat,
    THREE.FloatType
  );
  dataTexture.needsUpdate = true;
  return dataTexture;
};
