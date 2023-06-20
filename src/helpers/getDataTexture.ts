import * as THREE from "three";

export const getDataTexture = (size: number) => {
  const number = size * size;
  const data = new Float32Array(4 * number);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const index = i * size + j;

      //sphere texture
      let theta = Math.random() * Math.PI * 2;
      let phi = Math.acos(Math.random() * 2 - 1);

      let x = Math.sin(phi) * Math.cos(theta);
      let y = Math.sin(phi) * Math.sin(theta);
      let z = Math.cos(phi);

      data[4 * index + 0] = 2 * x;
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
};

export const getVelocityTexture = (size: number) => {
  const number = size * size;
  const data = new Float32Array(4 * number);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const index = i * size + j;

      //sphere texture
      let theta = Math.random() * Math.PI * 2;
      let phi = Math.acos(Math.random() * 2 - 1);

      let x = Math.sin(phi) * Math.cos(theta);
      let y = Math.sin(phi) * Math.sin(theta);
      let z = Math.cos(phi);

      data[4 * index + 0] = 0;
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
};

