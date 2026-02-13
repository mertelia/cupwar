import * as THREE from "three";
import { extend } from "@react-three/fiber";

const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const fragmentShader = /* glsl */ `
  precision mediump float;

  varying vec2 vUv;

  uniform float uScale;
  uniform vec3 uColorA;
  uniform vec3 uColorB;

  void main() {

    vec2 grid = vUv * uScale;
    float checker = mod(floor(grid.x) + floor(grid.y), 2.0);

    vec3 finalColor = mix(uColorA, uColorB, checker);

    vec2 center = vec2(0.5, 0.56);

    vec2 uv = vUv - center;
    uv.x *= 1.2;   // yanlara genişler
    uv.y *= 1.3;    // üstten basık

    float dist = length(uv);

    float alpha = 1.0 - smoothstep(0.02, 0.20, dist);

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

class FloorMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      uniforms: {
        uScale: { value: 40.0 },
        uColorInner: { value: new THREE.Color("rgb(236, 243, 252)") },
        uColorOuter: { value: new THREE.Color("#FFFFFF") },
        uColorA: { value: new THREE.Color("#FFFFFF") },
        uColorB: { value: new THREE.Color("#f1f7fc") },
      },
    });
  }
}

extend({ FloorMaterial });
