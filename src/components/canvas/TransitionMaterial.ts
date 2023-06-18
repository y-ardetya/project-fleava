import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

const TransitionMaterial = shaderMaterial(
  {
    uTime: 0,
    uProgress: 0,
    uTexture1: null,
    uTexture2: null,
    uImageRes: [0, 0],
    uRes: [1, 1],
    uDisplace: null,
  },
  `
    varying vec2 vUv;

    void main() {
        vUv = uv;
        vec3 pos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
    }
    `,
  `
    uniform sampler2D uTexture1;
    uniform sampler2D uTexture2;
    uniform float uProgress;
    uniform vec2 uImageRes;
    uniform vec2 uRes;
    uniform sampler2D uDisplace;
 
    varying vec2 vUv;

    vec2 CoverUV(vec2 u, vec2 s, vec2 i) {
      float rs = s.x / s.y; 
      float ri = i.x / i.y; 
      vec2 st = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x); 
      vec2 o = (rs < ri ? vec2((st.x - s.x) / 2.0, 0.0) : vec2(0.0, (st.y - s.y) / 2.0)) / st;
      return u * s / st + o;
    }

    void main() {
      vec2 uv = CoverUV(vUv, uRes, uImageRes.xy);
      
      float intensity = 2.8;
  
      vec4 colorA = texture2D(uTexture1, uv);
      vec4 colorB = texture2D(uTexture2, uv);
  
      vec4 displacement = texture2D(uDisplace, uv);
      vec2 displacedUV = uv + vec2(0.0, displacement.b * 0.5);
  
      float disp1 = (colorA.r + colorA.g + colorA.b) * .33;
      float disp2 = (colorB.r + colorB.g + colorB.b) * .33;
  
      vec2 displaceUV1 = vec2(displacedUV.x, uv.y + uProgress * disp2 * intensity);
      vec2 displaceUV2 = vec2(displacedUV.x, uv.y + (1.0 - uProgress) * disp1 * intensity);
  
      vec4 displace = texture2D(uTexture1, displaceUV1);
      vec4 displace2 = texture2D(uTexture2, displaceUV2);
  
      vec4 outputColor = mix(displace, displace2, uProgress);
  
      float x = uProgress;
      vec2 p = uv;
      x = smoothstep(0.0, 1.0, (x * 2.0 + p.x - 1.0));
      vec4 outputColor2 = mix(
          texture2D(uTexture1, (p - 0.5) * (1.0 - x) + 0.5),
          texture2D(uTexture2, (p - 0.5) * x + 0.5),
          x);
  
      gl_FragColor = mix(outputColor, outputColor2, uProgress);
  }
    `
);

extend({ TransitionMaterial });
