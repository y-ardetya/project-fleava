import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

const TransitionMaterial = shaderMaterial(
  {
    uTime: 0,
    uProgress: 0,
    uTexture1: null,
    uTexture2: null,
    uScale: 1.0,
    uResolution: [0, 0, 0, 0],
  },
  `
    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
    }
    `,
  `
    uniform sampler2D uTexture1;
    uniform sampler2D uTexture2;
    uniform float uProgress;
    uniform float uScale;
    uniform vec4 uResolution;
 
    varying vec2 vUv;
    
    void main() {

        vec2 uv = (vUv - vec2(0.5)) * uResolution.zw + vec2(0.5);
      
        vec2 p = uv;
        float x = uProgress;
        x = smoothstep(0.0, 1.0, (x * 2.0 + p.y - 1.0));
        vec4 outputColor = mix(
            texture2D(uTexture1, (p - 0.5) * (1.0 - x) + 0.5),
            texture2D(uTexture2,(p - 0.5) * x + 0.5),
            x);

        gl_FragColor = outputColor;
    }
    `
);

extend({ TransitionMaterial });

 