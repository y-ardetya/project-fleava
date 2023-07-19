"use client";

import { useRef, useState } from "react";
import { extend, useThree } from "@react-three/fiber";
import {  MeshPortalMaterial } from "@react-three/drei";
import { geometry } from "maath";
import { motion as m3 } from "framer-motion-3d";
import Particle from "./Particle";

extend(geometry);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      distortionMaterial: any;
      roundedPlaneGeometry: any;
    }
  }
}

const Scene = () => {
  return (
    <>
      <Particle />
    </>
  );
};

export default Scene;
