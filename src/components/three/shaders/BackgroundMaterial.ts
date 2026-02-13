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

  uniform vec3 uTopColor;

  uniform float uStart;  
  uniform float uEnd;   
  uniform float uPower;   

  void main() {

    // normalize
    float t = clamp((vUv.y - uStart) / (uEnd - uStart), 0.0, 1.0);

    // easing
    t = pow(t, uPower);

    gl_FragColor = vec4(uTopColor, t);

    #include <colorspace_fragment>
  }
`;

class BackgroundMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
      transparent: true,
      uniforms: {
        uTopColor: { value: new THREE.Color("#007bff") },
        uStart: { value: -0.03 },
        uEnd: { value: 0.96 },
        uPower: { value: 3.9 },
      },
    });
  }
}

extend({ BackgroundMaterial });
