import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

const TransitionMaterial = shaderMaterial(
  {
    uTime: 0,
    uProgress: 0,
    uTexture: null,
    uTexture2: null,
    uScale: 1.0,
  },
  `
    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
    }
    `,
  `
    uniform sampler2D uTexture;
    uniform sampler2D uTexture2;
    uniform float uProgress;
    uniform float uScale;

    varying vec2 vUv;
    
    void main() {
        vec2 uv = (vUv - 0.5) * uScale + 0.5;
        float slideProgress = uProgress;
        float colorProgress = uv.y + slideProgress - uv.x * 0.5 + uv.x * 0.4;
        slideProgress = smoothstep(slideProgress, slideProgress + slideProgress * 2.0, (1.0 - uv.y + uv.x) / 2.0);

        vec4 color1 = texture2D(uTexture, vec2(uv.x, uv.y + slideProgress));
        vec4 color2 = texture2D(uTexture2, vec2(uv.x, uv.y + slideProgress - 1.0));

        vec4 outputColor = mix(color1, color2, slideProgress);

        gl_FragColor = outputColor;
    }
    `
);

extend({ TransitionMaterial });
