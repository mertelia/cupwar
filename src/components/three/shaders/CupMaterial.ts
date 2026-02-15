"use client";

import * as THREE from "three";
import { extend } from "@react-three/fiber";

/* ================= SHADERS ================= */

const vertexShader = /* glsl */ `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewDir;

void main() {
  vUv = uv;

  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vec4 viewPos = viewMatrix * worldPos;

  vViewDir = normalize(-viewPos.xyz);
  vNormal = normalize(normalMatrix * normal);

  gl_Position = projectionMatrix * viewPos;
}
`;

const fragmentShader = /* glsl */ `
precision mediump float;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewDir;

uniform sampler2D uMap;
uniform float uDarkness;
uniform float uPower;
uniform float uStrength;
uniform vec3 uShadowColor;

void main() {

  vec4 tex = texture2D(uMap, vUv);
  tex.rgb *= uDarkness;

  float fresnel = 1.0 - abs(dot(normalize(vNormal), normalize(vViewDir)));

  fresnel = pow(fresnel, uPower);
  fresnel *= uStrength;
  fresnel = clamp(fresnel, 0.0, 1.0);

  tex.rgb = mix(tex.rgb, uShadowColor, fresnel);

  gl_FragColor = tex;

  #include <colorspace_fragment>
}
`;

/* ================= MATERIAL ================= */

export class CupMaterial extends THREE.ShaderMaterial {
  constructor(map: THREE.Texture | null) {
    super({
      vertexShader,
      fragmentShader,
      uniforms: {
        uMap: { value: map },
        uDarkness: { value: 1.05 },
        uPower: { value: 1.5 },
        uStrength: { value: 0.5 },
        uShadowColor: { value: new THREE.Color("#ffffff") },
      },
      side: THREE.DoubleSide,
    });
  }
}

extend({ CupMaterial });
